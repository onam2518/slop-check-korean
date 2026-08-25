# Credits

`slop-check` merges and reorganizes work from ten open-source anti-slop skills. All ten are MIT-licensed; this merged skill is MIT (see `LICENSE`). Thanks to their authors.

| Skill | Author | What it contributed |
|-------|--------|---------------------|
| [no-ai-slop](https://github.com/petergyang/no-ai-slop) | Peter Yang | Two-job split (edit vs detect), minimum-effective-edit and voice-preservation principles, the eval loop |
| [stop-slop](https://github.com/hardikpandya/stop-slop) | Hardik Pandya | Structural catalog (contrasts, false agency, narrator-from-a-distance), quick checks, scoring rubric |
| [unslop](https://github.com/cursor/plugins) (pstack) | Cursor | "Add soul" pass, self-audit, plain-speech and jargon rules; the `deslop` code-slop focus areas |
| [humanizer](https://github.com/blader/humanizer) | Siqi Chen | Wikipedia "Signs of AI writing" patterns, false-positive guardrails, human-details-to-keep |
| [humanizer-skill](https://github.com/aboudjem/humanizer-skill) | Adam Boudjemaa | 53-pattern catalog (P1-P53), tiered vocabulary, burstiness/perplexity, always-on templates |
| [anti-ai-slop-writing](https://github.com/jalaalrd/anti-ai-slop-writing) | jalaalrd | Punctuation budgets, parataxis rule, banned-word list, voice calibration, self-check |
| [soundshuman](https://github.com/aashaexo/soundshuman) | aasha | The `sloplint` linter and `slop-rules.json`, statistical tells, merged reference structure |
| [slopkit / slopbeth + slopgent](https://github.com/ehmo/slopkit) | ehmo | Preservation contract, evidence-bound mode, density and unsummarizability tests, Orwell writing system, agent-reply shaping |
| [deslop](https://github.com/stephenturner/skills) | Stephen Turner | Scientific-writing register, the tropes.fyi catalog, listicle-in-a-trench-coat, one-point dilution |
| [anti-slop](https://github.com/elithrar/dotfiles) | Matt Silverlock | Slop-vs-voice validation questions, the "keep these" list, calibration by register |

The Korean-language reference (`references/korean.md`) and the merged/deduplicated catalog, consensus core, register table, and code-slop reference are original to this skill.

Additional Korean sources:
- The Korean positive writing principles (짧게/고쳐/담백하게/P-R-E-P, 12어절 기준) adapt naradesign's 「글쓰기 기본」 (https://naradesign.github.io/writing.html).
- `references/korean-terminology.md` and `bin/korterm.js` wrap the 국립국어원 open APIs: 온용어 (https://kli.korean.go.kr) and 우리말샘/opendict (https://opendict.korean.go.kr). Term data is public-sector (공공누리); check each result's license before redistribution.
- `references/persona.md` and `references/korean-baseline.md` derive the standard-voice defaults (종결·목적 연결어미·문장 길이·표기) from the 국립국어원 신문 말뭉치 2025 (NIKL_NEWSPAPER_2025_v1.0) — the standard register for 문어 style. Measured on an ~860k-paragraph sample; the full corpus (3.5GB) is not redistributed here.
- `references/korean-baseline.md` also calibrates the Korean rules against the 국립국어원 2025 「문장 간 논리 관계 판별」 corpus (NIKLUGE-2025). Only a 30-sentence sample is committed (`tests/fixtures/human-ko.txt`) as a false-positive regression; the full corpus is not redistributed here.
- `references/korean-correction.md` derives its 어문 규범 error taxonomy and frequency ranking from the 국립국어원 2024 「글쓰기 첨삭 지원 지시문 기반 생성 말뭉치」 (GWIG2402606300, 1,500 docs). Only the error-type taxonomy and norm structure (public 어문 규범) are encoded; the corpus's student text and gpt-4o-generated feedback are not copied.
- `bin/spellcheck.js` calls the Korean spell/grammar checker built by 부산대학교 인공지능연구실 and 나라인포테크, via jhaemin/speller-api (https://github.com/jhaemin/speller-api, default endpoint https://speller.town). Text is sent to that external service; self-host the speller-api and set `KO_SPELLER_ENDPOINT` to keep it in-house.
