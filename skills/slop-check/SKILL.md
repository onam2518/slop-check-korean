---
name: slop-check
description: Remove AI-writing slop from any output (prose, docs, READMEs, commits, code comments, agent replies) while keeping every fact and the author's voice. For Korean, a holistic correction: translationese plus 어문 규범 (맞춤법·띄어쓰기·호응·높임·조사) and standard terminology, aimed at naturally human-written output. Ten anti-slop skills merged; ~75 patterns, register table, Korean support, zero-dependency linter. Use for check/audit/review/edit/humanize/deslop/correct-grammar, 검수·교정·슬롭 제거·자연스럽게·사람이 쓴 것처럼·AI 티, or any prose that must not read as machine-written.
argument-hint: '[text | --file path | --dir path] [--mode audit|edit|rewrite|code|reply] [--register blog|technical|scientific|marketing|legal|support|social|email] [--voice sample.md] [--lang ko|en]'
---

# slop-check

Make any output read as if a careful person wrote it, without changing what it says or whose voice it is. The job is the whole output, not a marker hunt: remove the patterns that read as machine-written, and for Korean also fix 어문 규범 (맞춤법·띄어쓰기·호응·높임·조사) and flow, so the result is natural end to end. The target is dense, specific writing where every sentence carries load, not text that fools a detector.

North star: LLMs regress to the statistical mean. Humans are specific, uneven, and have a stake in what they say. Slop is any phrasing a pattern put there instead of a person.

The whole skill rests on two commitments that outrank every fix below: **keep every fact and the author's voice**, and **treat tools and scores as evidence, never verdicts**. The Hard rules make these precise.

**Stance.** Slop removal plus fact/voice preservation is the always-on core (every mode, the bulk of the work). On top of it, two modes by whether the source has a real author voice: preserve it, or (voiceless generated output, this project's main case) supply the standard voice in `references/persona.md`. A user instruction overrides the persona; it never changes facts.

## Consensus core

These are the elements all ten source skills agree on. They carry the most weight, catch most slop, and apply in every mode and register. Run them first; reach for the full catalog only when a thorough pass needs it.

1. **Preserve facts and voice; never fabricate.** Lock every number, name, date, source, and qualifier. Keep what the author would defend. Add nothing not in the source.
2. **Cut throat-clearing and filler.** "Here's the thing", "it's worth noting", "in order to", "at the end of the day", magic adverbs. State the point.
3. **Kill the binary-contrast tic.** "Not X, it's Y", "the question isn't X, it's Y". State Y. This is the single most-cited AI tell.
4. **Drop tier-1 AI vocabulary.** delve, tapestry, testament, underscore, leverage, seamless, robust, pivotal, showcase, foster, realm, "in today's landscape". Plain words.
5. **Active voice, named actor.** No agentless passive, no false agency ("the decision emerges", "the data tells us"). Name who did it, or use "you".
6. **Be specific, not inflated.** No significance puffery, no promotional adjectives, no vague declaratives. Name the mechanism, number, or consequence, or cut.
7. **Vary rhythm.** Mix sentence lengths; two items beat a reflexive three; do not end every paragraph punchy; no stacked fragments.
8. **No em dashes** (unless a writing sample uses them), no bold-first bullets, no Title Case headings, no decorative emoji, straight quotes.
9. **End on substance.** No "In conclusion", no generic upbeat send-off, no restating the piece. Stop on the last concrete point.
10. **Flag clusters, not tokens; over-editing is a failure.** One tell is how people write. Preserve already-human prose; a light edit or none can be the right answer.

Everything below refines these. When time or budget is short, the consensus core is the deliverable.

## Modes

Pick the mode from the request. When unsure between audit and edit, audit; a report is reversible, a rewrite is not.

| Mode | Trigger | Output |
|------|---------|--------|
| `audit` | "check", "review", "does this sound AI", "검수", "AI 티" | Findings report: pattern id, quoted span, one-line fix. No rewrite, no authorship verdict. |
| `edit` | "fix", "clean up", "deslop", "humanize", "고쳐줘" | Minimum effective edit + a short **What changed** list. Default when a draft is handed over to fix. |
| `rewrite` | "rewrite", "heavier", "--aggressive" | Full pass with voice work. Only when asked; over-editing is a failure mode. |
| `file` | a path is given | Edit in place with the Edit tool. Prose only; code blocks, frontmatter, data, link targets untouched. Report a diff summary. |
| `dir` | a directory is given, "audit our docs" | Run `node bin/sloplint.js scan <dir>`, rank files, report worst offenders. Fix only files the user picks. |
| `code` | a diff, a source file, "deslop this code" | Code-slop pass. See `references/code.md`. Behavior unchanged. |
| `reply` | "check your last message", "stop reporting like a chatbot" | Apply `references/agent-replies.md` to the agent's own turns. Never to the user's artifact. |
| `embedded` | another task is producing prose (PR body, commit, doc, README) | Run the loop silently. Output only the final text. |

`embedded` is the mode that matters most for "everything the project generates": run it on any prose you are about to hand over, whether or not the user asked.

## Hard rules

These outrank every pattern below.

1. **Lock the facts.** Named entities, numbers, dates, units, prices, versions, URLs, citations, quotations, commands, identifiers, causal claims, scope limits, and explicit uncertainty survive the edit unchanged. A wrong number is worse than ten surviving tells.
2. **Never fabricate.** Do not add a fact, name, number, date, quote, source, example, or outcome that is not in the source or supplied by the user. Vague copy gets narrower, not more specific. If concreteness needs missing material, ask or leave a bracketed `[placeholder]`. Fiction is the only exemption.
3. **Evidence boundary.** Label any detail you are tempted to add as `source`, `inference`, `placeholder`, or `unsafe`. Only `source` and narrow `inference` go into final text. Do not launder "better alignment" into "faster decisions"; name the missing mechanism, owner, metric, or evidence instead.
4. **Preserve voice, or supply the standard one.** If the source has a real author voice, preserve it: keep earned fragments, deliberate parallelism, a strong closing line, first-person conviction, humor, profanity, mixed feelings, tangents, and rough edges; when unsure, leave it. If it has no voice to protect (generated output, boilerplate), apply the standard persona (`references/persona.md`) instead of leaving it generic. A user instruction overrides the persona; never flatten a real voice into it.
5. **Flag clusters, not tokens.** One em dash, one "crucial", one triad, one short sentence is how people write. A tell counts when it co-occurs with others or repeats. Under about 40 words there is not enough signal; say so.
6. **Secondhand text is off limits.** Never rewrite watched phrases inside quotations, titles, proper names, code, or examples where the phrase is being discussed rather than used.
7. **Do not replace one formula with another.** Clipped aphorisms, tidy triads, forced contrast, dramatic fragments, folksy contractions, and generic consultant voice are all slop with a different accent. Plain is not folksy.
8. **The brief is not the artifact.** Sentences that address you ("keep this casual", "do not turn this into a lesson") are instructions. Follow them; never print them.
9. **Register decides.** Neutral and plain is the correct human voice for reference, technical, legal, policy, incident, and scientific prose. Do not inject opinions, first person, or personality there. Domain terminology is precision, not jargon.
10. **Minimal edit wins.** Phrasing changes, not restructuring or re-arguing, unless asked. A light edit or "leave this alone" is a valid output. Changing more than a fifth of already-good text is a warning sign.
11. **Tools and scores are evidence, not verdicts.** The linter score, spell-check candidates, terminology lookups, and norm citations are inputs the context judges, never blind auto-replacement; read every flagged span before acting. The external helpers (`korterm`, `spellcheck`) are optional: skip them gracefully when a key or the network is missing, and never send secret or private text to them (a spell check leaves the machine). The core correction pass never depends on them.
12. **Correct the whole output, naturally.** Grammar fixed but flow still awkward, or slop removed but 조사·호응 wrong, is a failure. For Korean, run the one holistic pass in `references/korean.md` (보존 → 어문 규범 → 슬롭/번역투 → 표준 용어 → 구성 → 자연스러움). The deliverable is text that reads natural end to end, not a lower score.

## Workflow

1. **Read the whole piece.** Emit one line before touching anything: `Reading as: <kind> for <audience>, register <formal/neutral/casual>, voice <3-5 traits to keep>`. Skip only in `embedded` mode.
2. **Separate brief from artifact.** Pull out instructions aimed at you. Lock the fact list (rule 1).
3. **Collect candidates without editing.** Scan the catalog below and, for a thorough pass, `references/patterns.md`. Note the id, the exact span, and the cluster it belongs to.
4. **Validate each candidate.** Ask in order: Does cutting it lose meaning? Is it formula or choice? Does it announce rather than deliver? Does it add heat or light? Would a skeptical reader trust the sentence more without it? A phrase that survives all five stays.
5. **Edit surviving candidates one at a time.** Each is a minimal phrasing change. Preserve claims and constraints first, cut scaffolding second, then make each sentence carry a claim, example, number, constraint, mechanism, consequence, or decision.
6. **Run the density tests** (below) on the result. Fix bland-clean prose.
7. **Self-audit with two questions:** "What still reads as AI?" and "Did the edit add or remove any fact, name, number, date, quote, citation, qualifier, or claim?" Answer in two or three lines, then do one corrective pass on exactly those.
8. **Lint when a file or repo is available:** `node <skill-dir>/bin/sloplint.js analyze <file>`. Scores under 25 are the target; the score is a signal, not a verdict. Read every flagged span before acting on it.
9. **Deliver in the mode's format** (see Output).

## Pattern catalog (compact)

Eight families, ~75 patterns. Terse index; the consensus core already covers the top-signal members, and **`references/patterns.md` has the full per-id list (A1–H9)** with triggers, before/after, and false-positive notes — load it for a thorough audit or a contested call.

- **A. Content/claims** — significance inflation, promo adjectives, superficial `-ing` tails, vague attribution (experts argue), formulaic "despite challenges", grandiose stakes, vague declaratives, lazy extremes (every/always), invented labels ("the X paradox"). → name the fact/mechanism/number/source, or cut.
- **B. Vocabulary** — tier-1 (always flag): delve, tapestry, testament, underscore, leverage, seamless, robust, pivotal, showcase, foster, realm, multifaceted, myriad, empower, nestled, unpack, actionable, impactful, crucial, intricate, enduring, synergy, "it's worth noting", "in today's landscape". tier-2 (2+): additionally, furthermore, utilize, facilitate, streamline, harness. tier-3 (never alone): key, important, significant. Plus jargon (move the needle), copula (serves as/boasts → is/has), weak verbs (has the ability to → can), magic adverbs (quietly, just, actually).
- **C. Structure/rhetoric** — binary contrast (not X but Y) [top tell]; negative listing; staccato fragments; self-posed Q ("The result? Devastating."); throat-clearing; faux-insight; colon reveals; hooks (Honestly?, The kicker?); pedagogical (think of it as, imagine a world); mic-drop kickers; depth-pretending (at its core); answering unraised objections; false ranges (X to Y); signposting (let's dive in); Wh-cleft / "So," / "Look," starters; hedging seesaw. → state the point.
- **D. Voice/agency** — agentless passive; false agency (the data tells us); narrator-distance (people tend to); synonym cycling; anaphora. → name the actor or "you". Keep purposeful passive (unknown actor, register obligation).
- **E. Rhythm/stats** — uniform sentence length (top measurable tell); rule-of-three; parataxis / punchy paragraph ends; uniform paragraphs; listicle-in-a-trench-coat; low vocab diversity. → mix lengths, natural number, repeat the clear word.
- **F. Composition** — signposted conclusions (In conclusion); generic upbeat endings (the future looks bright); one-point dilution; dead metaphor; reshuffle-immune paragraphs; heading echoed in first sentence; diff-anchored docs. → end on substance; each paragraph depends on the last.
- **G. Formatting** — em/en dashes (a writing sample overrides); bold-first bullets; overused bold; Title Case headings; emoji; unicode arrows (→); excessive structure; markdown in plain-text; hashtag stacks. → sentence case, structure follows content. Straight quotes in EN; Korean prose uses 굽은따옴표.
- **H. Chatbot/tool** — chatbot phrases (I hope this helps); sycophancy (Great question!); cutoff disclaimers; reasoning-chain (Step 1:); placeholders ([Your Name]); citation leaks (utm_source=chatgpt.com); the brief reprinted as artifact. → delete.

## Register calibration

| Register | Voice / keep | Extra watch |
|----------|--------------|-------------|
| Blog, essay, opinion | Person in the room, "you" over "people"; keep humor, digressions, first person | C hooks, F1-F3 endings, E rhythm |
| Technical, README, API | Neutral, precise, numbers over adjectives; keep exact identifiers (`useEffect` stays) | A2 promo, B1 words, F8 diff-anchoring, G2/G5 |
| Scientific | Formal, "we" for own work, cite named authors; keep domain terms, real hedges | A3 -ing tails, A6 "despite challenges", A10 |
| Marketing | Concrete benefits, one CTA, evidence-bound; keep source brand terms | A1/A2/A8 inflation; invent no features/metrics/outcomes |
| Legal, policy, incident, support | Neutral, obligations exact, agentless passive OK on purpose; keep scope/qualifiers | never add "we will review/resolve" or "auditable/secure" not in source |
| Social, LinkedIn | No headers/bold, 0-2 hashtags, ≤1 emoji; keep era-bound voice | G8/G9, "Excited to announce", C22 |
| Email, DM | Greeting/sign-off OK, no markdown | "I hope this finds you well", "As per my last email", H1 |
| Korean | Holistic correction, `references/korean.md`; 격식체 `~습니다` uniformity is correct | 어문 규범 via `korean-correction.md`, 번역투/서두/챗봇 마무리, 표준 용어 via `korean-terminology.md` |

A user-supplied writing sample outranks every rule here (including G1): match its length, vocabulary, punctuation, and quirks; add no slang/typos/jokes it does not support.

## Positive writing system

Removing tells is half the job; generate from a system so they do not arrive. Orwell's six rules as defaults (short word over long, cut deletable words, active with a named actor, no printed-cliche metaphor, no jargon with a plain equivalent, and break any rule sooner than write something graceless). Where voice belongs, add a stake, spectrum certainty, source-grounded specifics, and varied paragraph length; never invent a fact for personality. Measured craft targets and full guidance: `references/writing-system.md`.

## Density tests

Run after editing; catch bland-clean prose that passes phrase lint yet says nothing.

- **Sentence-load:** each sentence must add a claim, number, example, mechanism, consequence, or stance-shift, not just rhythm or transition.
- **Portability:** a sentence that could move unchanged to another company/product/field is filler; add the mechanism or cut.
- **Summary-loss:** compress by half; strong prose loses ideas fast, scaffolding shrinks without loss.
- **Reshuffle:** if paragraphs reorder without damage, the argument is not unfolding.
- **Read aloud:** press release, encyclopedia, or a person? Rewrite until a specific person could have said it.

## What not to flag

Perfect grammar; consistent style; mixed casual and formal registers; dry or bland prose without specific tells; formal words that are not on the lists; a single transition word; a single em dash, curly quote, triad, or short emphatic sentence; a deliberate repeated opening; "honestly" or "look" mid-sentence; useful limits, disclaimers, named objections, FAQ answers, and real alternatives; unsourced claims (most of the web is unsourced); clean formatting from a template; anything written before November 30, 2022.

Preserve on sight: real addresses, odd quotes, measured numbers ("900ms to 40ms"), mixed feelings, era-bound slang, genuine asides and self-corrections, first-person choices the writer can defend, and variety that is already there. If a passage already has a pulse, the correct edit is no edit.

## Code, commits, and agent replies

- **Code** (`references/code.md`): comments restating the code, diff-narrating comments, defensive try/catch on trusted paths, `any`/ignore-pragmas to dodge types, deep nesting, single-use abstractions, dead code, banner/emoji comments, decorative logging, README/commit bodies in adjectives. Behavior unchanged unless fixing a clear bug; match the file; keep comments that explain why.
- **Agent replies** (`references/agent-replies.md`): honesty > structure > plain language. Separate what changed from what was verified ("Edited `auth.ts:42`. Tests not run."). Cut invented confidence and apology theater; keep the load-bearing caveat. Action first; no preamble/closer/sycophancy; estimate in turns and tool calls, not calendar time.

## Output

**audit**
```
Reading as: <kind> for <audience>, register <r>, voice <traits>
Findings: <n>  Clusters: <which categories co-occur>

| id | span (quoted) | fix |
|----|---------------|-----|

Preserved on purpose: <spans that looked like tells but are voice, and why>
Statistical: burstiness <x>, mean sentence length <y> (from sloplint when available)
Score: Directness _/10, Rhythm _/10, Trust _/10, Authenticity _/10, Density _/10, Fidelity _/10 (total _/60; below 42 revise)
```
No authorship verdict. Named patterns are evidence the user can check; detectors guess.

**edit / rewrite**: the full edited text, then **What changed** (pattern ids, counts, anything reorganized and why), then **Preservation check** (facts locked: yes/no; qualifiers kept: yes/no; anything flagged for the user, such as a claim with no source).

**file**: apply edits, then a diff summary. **dir**: ranked table of files with score and top three patterns. **code**: the diff plus one to three sentences. **reply**: the restated message only. **embedded**: final text only.

## Tooling

```
node <skill-dir>/bin/sloplint.js score   <file>      # 0-100, higher is more machine-shaped
node <skill-dir>/bin/sloplint.js analyze <file>      # every finding with line numbers
node <skill-dir>/bin/sloplint.js stats   <file>      # burstiness, type-token ratio, trigram repetition
node <skill-dir>/bin/sloplint.js fix     <file> -w   # safe mechanical fixes only (dashes, quotes, filler swaps)
node <skill-dir>/bin/sloplint.js scan    <dir>       # rank files; --fail-above 50 for CI
```
Reads stdin when no file is given. Detects Korean text and reduces the weight of English-calibrated statistics. Rules live in `rules/slop-rules.json`; edit that file to change what fires.

Korean helpers (need network / a key; skip gracefully when unavailable):
```
node <skill-dir>/bin/korterm.js    search "<말>"      # 온용어 표준 용어·정의·대역어 (KLI_API_KEY)
node <skill-dir>/bin/korterm.js    define "<말>"      # 우리말샘 뜻풀이 (KLI_OPENDICT_KEY, 온용어와 별개 키)
node <skill-dir>/bin/spellcheck.js "<문장>"           # 맞춤법·띄어쓰기·문법 후보 (부산대 검사기; sends text to an external service)
```

## Reference routing

Load only what the task needs.

Stance & method:
- `references/persona.md`: the standard voice to produce when there is no author voice to preserve (product default). Register-calibrated defaults (종결·연결어미·rhythm·용어·표기), overridable by user instruction.
- `references/preservation.md`: the other mode — voice contract, evidence-bound mode, the slop-vs-voice validation questions, calibration by source type.

English:
- `references/patterns.md`: the full catalog (A–H) with triggers, before/after, false-positive notes, and quick-swap tables. The one English reference; the machine-readable lexicon is `rules/slop-rules.json`.
- `references/writing-system.md`: Orwell's six rules, soul techniques, voice profiles, burstiness and perplexity.
- `references/examples.md`: real input→output runs with measured scores (reproducible).

Korean (the holistic pass):
- `references/korean.md`: the 통합 교정 order and Korean-specific tells (번역투, `~적` compression, 서두 군더더기, chatbot endings) plus the positive writing principles.
- `references/korean-correction.md`: 어문 규범 correction (맞춤법·띄어쓰기·높임·조사·호응·시제·피동, plus 내용/조직), frequency-ranked from a 1,500-doc 국립국어원 corpus; includes the automated spell check.
- `references/korean-terminology.md`: standard-term lookup via the 국립국어원 open API (`bin/korterm.js`).
- `references/korean-baseline.md`: why sentence length is not a Korean slop signal, from a 5,386-sentence human corpus.

Other surfaces:
- `references/code.md`: code and repo-text slop.
- `references/agent-replies.md`: the agent's own status messages.
- `references/always-on.md`: paste-in blocks for CLAUDE.md so prose is generated clean.
