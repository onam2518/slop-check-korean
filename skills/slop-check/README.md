# slop-check

One skill that detects and removes AI-writing slop from everything this project produces: prose, docs, READMEs, commit and PR text, code comments, code, and the agent's own replies. It keeps every fact and the author's voice intact.

It merges ten open anti-slop skills into a single catalog of about 75 patterns, a register table, density tests, Korean-language coverage, and a zero-dependency linter.

## What it does

- **audit** — report the patterns in a draft with quoted spans and fixes, no rewrite, no "this is AI" verdict.
- **edit / rewrite** — minimum effective edit (or a heavier pass when asked), plus a What-changed and a preservation check.
- **file / dir** — edit a file in place, or scan a folder and rank the worst offenders.
- **code** — strip code slop (comments that restate code, diff-narrating comments, defensive noise, `any` casts) without changing behavior.
- **reply** — shape the agent's own status messages: honest about what actually ran, action-first, plain.
- **embedded** — run silently on any prose the project is about to hand over.

Works in English and Korean.

## Layout

```
slop-check/
├── SKILL.md                     # entry: principles (consensus core + hard rules), modes, catalog, routing
├── rules/slop-rules.json        # machine-readable lexicon the linter reads (EN + KO)
├── bin/sloplint.js              # zero-dependency scanner (Node), EN + KO aware
├── bin/korterm.js               # 국립국어원 term/dictionary API client (needs KLI_API_KEY)
├── bin/spellcheck.js            # Korean spell/grammar check via 부산대 speller-api (external service)
└── references/
    ├── persona.md               # the standard voice to produce when no author voice exists (default)
    ├── patterns.md              # the full English catalog (A–H) + quick-swap tables
    ├── preservation.md          # voice contract, evidence-bound mode (the other mode)
    ├── writing-system.md        # Orwell six rules, soul, burstiness
    ├── examples.md              # real input→output runs with measured scores
    ├── code.md                  # code and repo-text slop
    ├── agent-replies.md         # the agent's own status messages
    ├── korean.md                # 통합 교정 order + Korean tells and principles
    ├── korean-correction.md     # 어문 규범 correction + automated spell check
    ├── korean-terminology.md    # 국립국어원 term-lookup API spec and usage
    ├── korean-baseline.md       # empirical calibration from a human Korean corpus
    └── always-on.md             # paste-in blocks for CLAUDE.md
tests/smoke.sh + fixtures/      # regression: slop scores high, human text low, code preserved
CREDITS.md · LICENSE            # sources (MIT) and license
```

## Linter

```bash
node bin/sloplint.js score   <file>      # 0-100, higher is more machine-shaped (target < 25)
node bin/sloplint.js analyze <file>      # every finding with line numbers
node bin/sloplint.js stats   <file>      # burstiness, type-token ratio, trigram repetition
node bin/sloplint.js fix     <file> -w   # safe mechanical fixes (dashes, quotes, filler)
node bin/sloplint.js scan    <dir>       # rank files; --fail-above 50 for CI
```

Reads stdin when no file is given. Rules live in `rules/slop-rules.json`; edit that file to change what fires. The score is a signal, not a verdict.

## Use in this project

The skill is wired into `.claude/skills/slop-check`, so a new Claude Code session in this repo lists it. Invoke it with `/slop-check`, or just ask to "check this for AI slop", "deslop this", "검수해줘". For always-clean generation, paste a block from `references/always-on.md` into the repo's `CLAUDE.md`.

## Skill vs agent

- **Skill** (`/slop-check`) — loads inline into the current conversation. Best for a single doc in the flow of other work.
- **Agent** (`IM-KOREAN`, `.claude/agents/IM-KOREAN.md`) — a thin delegate that runs this skill in its own isolated context. Best for a whole document, a folder audit fanned out file by file, or any pass that would otherwise flood the main context. It uses the skill; it does not duplicate it.

## Sources

Merged from ten MIT-licensed skills. See `CREDITS.md`.
