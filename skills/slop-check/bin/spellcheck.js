#!/usr/bin/env node
'use strict';

/*
 * spellcheck: Korean 맞춤법·띄어쓰기·문법 check via the 부산대 검사기 (jhaemin/speller-api).
 *   POST {"text":"..."} -> {"suggestions":[{description,start,end,text,candidates}]}
 * PRIVACY: text is sent to an external service (default https://speller.town). No secrets.
 *   Keep it in-house by self-hosting speller-api and setting KO_SPELLER_ENDPOINT.
 * Zero deps; Node global fetch (18+).
 */

const DEFAULT_ENDPOINT = 'https://speller.town';

function parseArgs(argv) {
  const o = { _: [], json: false, dryRun: false, file: null, timeout: 20000, endpoint: process.env.KO_SPELLER_ENDPOINT || DEFAULT_ENDPOINT };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--json') o.json = true;
    else if (a === '--dry-run') o.dryRun = true;
    else if (a === '--file') o.file = argv[++i];
    else if (a === '--endpoint') o.endpoint = argv[++i];
    else if (a === '--timeout') o.timeout = Number(argv[++i]);
    else o._.push(a);
  }
  return o;
}

// Parse the {suggestions:[...]} response into a normalized list.
function normalize(data) {
  const s = (data && Array.isArray(data.suggestions)) ? data.suggestions : [];
  return s.map((x) => ({
    wrong: x.text,
    candidates: Array.isArray(x.candidates) ? x.candidates : [],
    description: (x.description || '').trim(),
    start: x.start,
    end: x.end,
  }));
}

async function check(text, o) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), o.timeout);
  try {
    const res = await fetch(o.endpoint, {
      method: 'POST',
      signal: ctrl.signal,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ text }),
    });
    const body = await res.text();
    if (res.status === 429) throw new Error('rate limited (호스팅 인스턴스는 분당 10회). 잠시 후 다시 시도하거나 자체 호스팅하세요.');
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${body.slice(0, 160)}`);
    let data;
    try { data = JSON.parse(body); } catch { throw new Error(`non-JSON response: ${body.slice(0, 160)}`); }
    return normalize(data);
  } finally {
    clearTimeout(t);
  }
}

function print(list, o) {
  if (o.json) return console.log(JSON.stringify({ count: list.length, suggestions: list }, null, 2));
  if (!list.length) return console.log('맞춤법·문법 문제를 찾지 못했습니다.');
  console.log(`${list.length}건:\n`);
  for (const s of list) {
    const cand = s.candidates.length ? s.candidates.join(', ') : '(대안 없음)';
    console.log(`■ ${s.wrong}  →  ${cand}`);
    if (s.description) console.log(`  ${s.description}`);
  }
  console.log('\n제안은 후보입니다. 문맥·고유명사·의도된 표기는 사람이 확인하세요.');
}

const HELP = `spellcheck: 한국어 맞춤법·문법 검사 (부산대 검사기 / jhaemin/speller-api)

Usage:
  spellcheck "검사할 문장"
  spellcheck --file path/to/text.txt
  echo "문장" | spellcheck

Options:
  --json               기계 판독용 출력 (offset 포함)
  --file <path>        파일 내용을 검사
  --endpoint <url>     검사 엔드포인트 (기본 https://speller.town, 또는 KO_SPELLER_ENDPOINT)
  --dry-run            요청만 확인하고 호출하지 않음
  --timeout <ms>       요청 제한 시간 (기본 20000)

PRIVACY: 검사할 텍스트가 외부 서비스로 전송됩니다. 비밀·개인정보 금지.
사내 처리는 jhaemin/speller-api 자체 호스팅 후 KO_SPELLER_ENDPOINT 설정.
공개 업스트림(nara-speller.co.kr)은 Cloudflare 봇 차단이 있어, 문제 시 자체 호스팅을 권장합니다.`;

function readStdin() {
  try { return require('fs').readFileSync(0, 'utf8'); } catch { return ''; }
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv[0] === '-h' || argv[0] === '--help') return console.log(HELP);
  const o = parseArgs(argv);
  let text = o.file ? require('fs').readFileSync(o.file, 'utf8') : o._.join(' ');
  if (!text.trim()) text = readStdin();
  text = text.trim();
  if (!text) { console.error('검사할 텍스트가 없습니다. 인자·--file·stdin 중 하나로 전달하세요.'); process.exit(1); }

  if (o.dryRun) {
    console.log(`POST ${o.endpoint}`);
    console.log(`body: ${JSON.stringify({ text: text.slice(0, 60) + (text.length > 60 ? '…' : '') })}`);
    return;
  }
  try {
    print(await check(text, o), o);
  } catch (e) {
    console.error(`검사 실패: ${e.message}`);
    console.error(`엔드포인트: ${o.endpoint} (KO_SPELLER_ENDPOINT 로 변경 가능)`);
    process.exit(1);
  }
}

if (require.main === module) main();

module.exports = { normalize, check };
