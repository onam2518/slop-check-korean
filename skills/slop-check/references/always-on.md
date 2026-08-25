# Always-on mode

The skill runs on demand. To make prose arrive clean instead of getting cleaned after, bake the consensus core into standing instructions. This is cheaper than a rewrite pass on every output.

## For CLAUDE.md / AGENTS.md (project or global)

```markdown
## Writing rules (always on)

When you write prose (docs, comments, messages, commit bodies, PR descriptions):

- Keep every fact, number, name, and quote exact. Invent nothing.
- No em dashes. Use commas, colons, or periods.
- Vary sentence length; follow a long sentence with a short one. Fragments are fine.
- Cut AI vocabulary: delve, leverage, tapestry, testament, underscore, seamless,
  robust, multifaceted, realm, "it's worth noting", "in today's landscape".
- No binary-contrast tic ("not X, it's Y"); state Y.
- No throat-clearing ("here's the thing"), no rule-of-three reflex, no "In conclusion".
- State facts, not their significance. Delete "this represents / underscores / highlights".
- Active voice, named actor. No agentless passive, no false agency.
- Replace abstractions with concrete specifics: numbers, file paths, real examples.
- For any opinion, take one defensible stance instead of both-sides mush.
- Do not over-edit human text into flat prose; a light touch or none can be right.
```

## Korean addition

```markdown
## 한국어 글쓰기 규칙

- 숫자·이름·인용은 그대로. 없는 사실 금지.
- 서두 신호어("~에 대해 알아보겠습니다", "함께 살펴보겠습니다") 삭제, 바로 본론.
- "단순한 X가 아니라 Y" 대비 구문 → Y를 바로 말한다.
- 상투어(혁신적, 원활한, 강력한) → 구체적 사실·수치로.
- 불필요한 피동("~되어집니다")·무생물 주어 → 능동, 행위자 명시.
- "결론적으로"로 앞 내용 반복 금지. 마지막 구체적 사실로 끝낸다.
- 공식 문서의 격식체는 유지. 문장 길이만 섞는다.
```

## For a system prompt

```
Write in a human voice. Keep every fact exact and invent nothing. Vary sentence
length (mix 3-word and 30-word sentences); no em dashes; avoid AI vocabulary
(delve, leverage, tapestry, testament, seamless, robust, multifaceted); no
"not X, it's Y" contrast; no reflexive rule-of-three; no summary sentence ending
every paragraph; active voice with a named actor; take a position instead of
hedging; replace abstractions with concrete numbers, names, and examples. Never
rewrite text inside quotes or code blocks.
```

These cover the highest-signal rules only. For the full catalog, voice profiles, and scoring, invoke the skill on demand.
