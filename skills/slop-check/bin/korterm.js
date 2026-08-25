#!/usr/bin/env node
'use strict';

/*
 * korterm: look up standardized Korean terms/definitions from 국립국어원 open APIs.
 *   search -> 온용어    https://kli.korean.go.kr/term/api/search.do   key: KLI_API_KEY
 *   define -> 우리말샘  https://opendict.korean.go.kr/api/search      key: KLI_OPENDICT_KEY (separate)
 * Keys are read from env (or --key/--odkey). Zero deps; Node global fetch (18+).
 */

// 온용어 term search (kli). The user's standard key works here.
const SEARCH_URL = 'https://kli.korean.go.kr/term/api/search.do';
// 우리말샘 dictionary (opendict). NOTE: the 온용어 doc page lists
// terms.korean.go.kr, which does not resolve; opendict.korean.go.kr is the real
// public host, and it needs a SEPARATE key registered at opendict.korean.go.kr.
const OPENDICT_URL = 'https://opendict.korean.go.kr/api/search';

const SORTS = new Set(['wt', 'ka', 'cnt', 'new']); // 정확도/가나다/인기/최신

function parseArgs(argv) {
  const o = {
    _: [], num: 10, start: 1, sort: 'wt', json: false, dryRun: false,
    key: process.env.KLI_API_KEY || null,
    odkey: process.env.KLI_OPENDICT_KEY || null,
    timeout: 10000,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--json') o.json = true;
    else if (a === '--dry-run') o.dryRun = true;
    else if (a === '--key') o.key = argv[++i];
    else if (a === '--odkey') o.odkey = argv[++i];
    else if (a === '--num') o.num = Number(argv[++i]);
    else if (a === '--start') o.start = Number(argv[++i]);
    else if (a === '--sort') o.sort = argv[++i];
    else if (a === '--timeout') o.timeout = Number(argv[++i]);
    else o._.push(a);
  }
  return o;
}

function buildSearchUrl(word, o) {
  const p = new URLSearchParams({
    key: o.key || 'MISSING_KEY',
    apiSearchWord: word,
    start: String(Math.max(1, Math.min(1000, o.start))),
    num: String(Math.max(10, Math.min(100, o.num))),
    sort: SORTS.has(o.sort) ? o.sort : 'wt',
  });
  return `${SEARCH_URL}?${p.toString()}`;
}

function buildOpendictUrl(word, o) {
  const p = new URLSearchParams({
    key: o.odkey || 'MISSING_KEY',
    q: word,
    req_type: 'json',
    sort: 'dict', // 사전순
  });
  return `${OPENDICT_URL}?${p.toString()}`;
}

// Decode the HTML entities the APIs leave in text (&#44; -> comma, &amp; ...).
function decodeEntities(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

// "학술^용어" -> "학술 용어"; strip tags whether literal or entity-encoded.
function clean(s) {
  if (typeof s !== 'string') return s;
  let t = s.replace(/\^/g, ' ');
  t = t.replace(/<\/?[^>]+>/g, ''); // literal tags (<strong>)
  t = decodeEntities(t); // &lt;strong&gt; -> <strong>, &#44; -> ,
  t = t.replace(/<\/?[^>]+>/g, ''); // tags revealed by decoding
  return t.replace(/\s+/g, ' ').trim();
}

async function getJson(url, timeout) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { Accept: 'application/json' } });
    const text = await res.text();
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
    try {
      return JSON.parse(text);
    } catch {
      throw new Error(`non-JSON response (is req_type=json? is the key valid?): ${text.slice(0, 200)}`);
    }
  } finally {
    clearTimeout(t);
  }
}

// ---- search.do (온용어) ----
function normalizeSearch(data) {
  const ch = data.channel || {};
  const ret = (ch.return_object || [])[0] || {};
  if (ret.returnCode !== undefined && Number(ret.returnCode) !== 1) {
    return { error: { code: ret.returnCode, message: ret.message || 'error' } };
  }
  const list = ret.resultlist || [];
  const terms = list.map((r) => ({
    word: clean(r.word),
    category: [clean(r.category_main), clean(r.category_sub)].filter(Boolean).join(' > ') || null,
    origin: clean(r.origin) || null,
    definition: clean(r.definition) || null,
    source: clean(r.source) || null,
    glossary: clean(r.glossary) || null,
    translation: clean(r.translation) || null,
    related: clean(r.relate_word) || null,
    example: clean(r.use_ex) || null,
  }));
  return { total: ch.total ?? terms.length, terms };
}

// ---- opendict /api/search (우리말샘) ----
// Each item carries one word + one sense; the same word repeats across items
// for multiple senses, so group by word.
function normalizeOpendict(data) {
  if (data.error) return { error: { code: data.error.error_code, message: data.error.message } };
  const ch = data.channel || {};
  const items = Array.isArray(ch.item) ? ch.item : ch.item ? [ch.item] : [];
  const byWord = new Map();
  for (const it of items) {
    const word = clean(it.word);
    const s = it.sense && (Array.isArray(it.sense) ? it.sense[0] : it.sense);
    const sense = s
      ? { pos: clean(it.pos) || null, type: clean(s.type) || null, cat: clean(s.cat) || null, definition: clean(s.definition) || null, link: s.link || null }
      : null;
    if (!byWord.has(word)) byWord.set(word, { word, origin: clean(it.origin) || null, senses: [] });
    if (sense) byWord.get(word).senses.push(sense);
  }
  return { total: ch.total ?? byWord.size, entries: [...byWord.values()] };
}

function printSearch(r, o) {
  if (o.json) return console.log(JSON.stringify(r, null, 2));
  if (r.error) return console.log(`error ${r.error.code}: ${r.error.message}`);
  if (!r.terms.length) return console.log('결과 없음');
  for (const t of r.terms) {
    console.log(`\n■ ${t.word}${t.origin ? ` (${t.origin})` : ''}${t.category ? `  [${t.category}]` : ''}`);
    if (t.definition) console.log(`  뜻: ${t.definition}`);
    if (t.translation) console.log(`  대역어: ${t.translation}`);
    if (t.related) console.log(`  관련: ${t.related}`);
    if (t.source || t.glossary) console.log(`  출처: ${[t.glossary, t.source].filter(Boolean).join(' / ')}`);
    if (t.example) console.log(`  예: ${t.example}`);
  }
}

function printOpendict(r, o) {
  if (o.json) return console.log(JSON.stringify(r, null, 2));
  if (r.error) return console.log(`error ${r.error.code}: ${r.error.message}`);
  if (!r.entries.length) return console.log('결과 없음');
  for (const e of r.entries) {
    console.log(`\n■ ${e.word}${e.origin ? ` (${e.origin})` : ''}`);
    e.senses.forEach((s, i) => {
      const tag = [s.pos, s.cat, s.type].filter(Boolean).join(', ');
      console.log(`  ${i + 1}. ${tag ? `[${tag}] ` : ''}${s.definition || ''}`);
    });
  }
}

const HELP = `korterm: look up standardized Korean terms (국립국어원 open API)

Usage:
  korterm search <말>   Term search (온용어). Fields: word, category, origin, definition, source, example.
  korterm define <말>   Dictionary lookup (우리말샘/opendict). Fields: word, pos, category, definition per sense.

Options:
  --json            Machine-readable output
  --num <10-100>    search: result count (default 10)
  --start <1-1000>  search: start index (default 1)
  --sort <wt|ka|cnt|new>  search: 정확도/가나다/인기/최신 (default wt)
  --key <hex32>     온용어 key for search (else read from KLI_API_KEY)
  --odkey <key>     우리말샘 key for define (else read from KLI_OPENDICT_KEY)
  --dry-run         Print the request URL (key masked) and exit; no network call
  --timeout <ms>    Request timeout (default 10000)

Auth (two separate keys):
  search (온용어):   https://kli.korean.go.kr  (회원가입 -> 인증키 신청)  -> KLI_API_KEY
  define (우리말샘): https://opendict.korean.go.kr  (오픈 API -> 인증키 신청) -> KLI_OPENDICT_KEY
License note: term data includes an [AI유형] 인공지능 학습 가능 tier; check each result's source/glossary for its 공공누리 license before redistributing.`;

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const o = parseArgs(rest);
  if (!cmd || cmd === '-h' || cmd === '--help') return console.log(HELP);
  const word = o._.join(' ').trim();
  if (cmd !== 'search' && cmd !== 'define') {
    console.error(`unknown command: ${cmd}`);
    console.log(HELP);
    process.exit(1);
  }
  if (!word) {
    console.error('검색어가 필요합니다.');
    process.exit(1);
  }
  const url = cmd === 'search' ? buildSearchUrl(word, o) : buildOpendictUrl(word, o);

  if (o.dryRun) {
    console.log(url.replace(/key=[^&]*/, 'key=***'));
    return;
  }
  const activeKey = cmd === 'search' ? o.key : o.odkey;
  if (!activeKey) {
    if (cmd === 'search') {
      console.error('온용어 인증키가 없습니다. KLI_API_KEY 를 설정하거나 --key 로 전달하세요.');
      console.error('발급: https://kli.korean.go.kr (회원가입 -> 인증키 신청)');
    } else {
      console.error('우리말샘 인증키가 없습니다. KLI_OPENDICT_KEY 를 설정하거나 --odkey 로 전달하세요.');
      console.error('발급: https://opendict.korean.go.kr (오픈 API -> 인증키 신청). 온용어 키와는 별개입니다.');
    }
    process.exit(2);
  }
  try {
    const data = await getJson(url, o.timeout);
    if (cmd === 'search') printSearch(normalizeSearch(data), o);
    else printOpendict(normalizeOpendict(data), o);
  } catch (e) {
    console.error(`요청 실패: ${e.message}`);
    process.exit(1);
  }
}

if (require.main === module) main();

module.exports = { buildSearchUrl, buildOpendictUrl, normalizeSearch, normalizeOpendict, clean, decodeEntities };
