<p align="center">
  <img src="assets/cover.svg?v=2" alt="slop-check-korean, remove AI tells and correct Korean prose" width="880">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Claude_Code-plugin-1e2024">
  <img src="https://img.shields.io/badge/EN%20%2B%20KO-bilingual-cf3b2c">
  <img src="https://img.shields.io/badge/deps-zero-71757c">
  <img src="https://img.shields.io/badge/license-MIT-555">
</p>

# slop-check-korean

> **한국어**: [`README.md`](README.md)

A skill that removes **AI-writing slop** from everything a project produces (docs, READMEs, commits, code comments, agent replies). For Korean it goes further: it also fixes **어문 규범** (spelling, spacing, honorifics, particles, agreement), standard terminology, and standard style, in one pass.

Two commitments outrank every fix. **Facts and voice never change.** And **scores, checkers, and API results are evidence, never verdicts.** Generated output with no author voice is not left generic; it is rewritten into a standard style calibrated on a newspaper corpus.

Ten open-source anti-slop skills, merged into one, with rules calibrated against 국립국어원 (National Institute of Korean Language) corpora.

## Install

**Claude Code plugin marketplace (recommended)**

```
/plugin marketplace add onam2518/slop-check-korean
/plugin install slop-check@slop-check-korean
```

In a new session use `/slop-check`, or plain language ("check this", "deslop this"). Delegate large jobs to the `IM-KOREAN` agent.

**Clone and symlink globally (use in every project)**

```bash
git clone https://github.com/onam2518/slop-check-korean.git
ln -sfn "$(pwd)/slop-check-korean/skills/slop-check" ~/.claude/skills/slop-check
ln -sfn "$(pwd)/slop-check-korean/agents/IM-KOREAN.md" ~/.claude/agents/IM-KOREAN.md
```

The core (slop removal, the catalog, the linter) runs without any key. External tools are optional; see [Tools](#tools).

## Why this one

English humanizers are weak on Korean, and most tools strip slop and leave the text flat. Three differences here.

- **Bilingual.** An English slop catalog (~75 patterns) alongside Korean translationese and 어문 규범.
- **Whole-output correction.** Grammar fixed but the flow still awkward, or slop gone but particles wrong, is a miss. Korean runs six steps in one pass.
- **Measured calibration.** Rules are not guesses. Sentence length, connective and ending distribution, and false-positive rate were measured on 국립국어원 corpora and folded into the rules.

## The four principles

1. **Facts are fixed.** Numbers, names, dates, sources, and direct quotes stay verbatim. Nothing is fabricated.
2. **Evidence, not tokens.** Slop is judged in clusters; already-human prose is left alone.
3. **Preserve voice, or supply the standard one.** Keep a real author voice; for voiceless generated text, apply the standard style. A user instruction always wins.
4. **Tools are evidence.** Linter score, spell candidates, and term lookups are inputs, never auto-applied.

## How it works

<p align="center">
  <img src="assets/pipeline.svg?v=2" alt="one-pass correction pipeline" width="960">
</p>

Slop removal and fact/voice preservation are the **always-on base**. On top, two modes split on whether the source has a real author voice: **preserve** it, or supply the newspaper-calibrated **standard persona**. Korean runs six steps: preserve, 어문 규범, slop and translationese, standard terminology, structure, naturalness.

## Layout

| Part | What |
|---|---|
| `skills/slop-check/SKILL.md` | Entry: principles, modes, catalog, routing |
| `references/` (12) | English catalog, Korean (patterns, norms, terminology, measured baseline), standard persona, preservation |
| `rules/slop-rules.json` | The lexicon and rules the linter reads (EN, KO) |
| `bin/` (3) | Zero-dependency linter + standard-term API + spell-check client |
| `agents/IM-KOREAN.md` | Delegation agent that runs the skill in its own context |

## Tools

```bash
node bin/sloplint.js score   <file>     # 0-100, lower is more human (target < 25)
node bin/sloplint.js analyze <file>     # findings with line numbers
node bin/sloplint.js scan    <dir>      # rank files (--fail-above 50 as a CI gate)
node bin/korterm.js   search "<term>"   # standard Korean terminology (KLI_API_KEY)
node bin/spellcheck.js "<sentence>"     # Korean spell check (sends text to an external service)
```

## Credits

Ten MIT anti-slop skills, merged and calibrated on 국립국어원 corpora. Full sources in [`skills/slop-check/CREDITS.md`](skills/slop-check/CREDITS.md).

## License

MIT. All merged skills are MIT; corpus data follows each distributor's license and is not redistributed here.
