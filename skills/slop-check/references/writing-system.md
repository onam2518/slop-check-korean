# Writing system: generate clean instead of cleaning after

Deslopping removes tells after the fact. This is the other half: a positive system to write from, so prose does not arrive in the generic AI voice that later needs stripping. Banning words one at a time treats symptoms; a system treats the cause.

## Orwell's six rules

From "Politics and the English Language" (1946). Use them at generation time, not only as a lint.

1. Never use a metaphor, simile, or figure of speech you are used to seeing in print. Dead metaphors ("move the needle", "low-hanging fruit", "navigate the landscape") carry no image. Cut them or use a live one the sentence earns.
2. Never use a long word where a short one will do. utilize → use, facilitate → help, methodology → method, approximately → about.
3. If it is possible to cut a word out, cut it out. "in order to" → "to", "due to the fact that" → "because". Windups like "it is important to note that" delete cleanly.
4. Never use the passive where you can use the active. Name the actor. This is the rule AI rewrites miss most, so check it hardest.
5. Never use a foreign phrase, a scientific word, or a jargon word if an everyday equivalent exists. synergy, operationalize, leverage almost always have a plainer, more honest word.
6. Break any of these rules sooner than say anything outright barbarous.

Rule six is why this does not become new slop. The first five, followed mechanically, produce their own tell: clipped, uniform, aggressively plain prose. Keep a long or Latinate word when it is the precise term (latency, plaintiff, idempotent). Keep passive when the actor is unknown or the register demands it. Keep a live metaphor. Keep rhythm. If applying a rule makes the sentence less true, less specific, or harder to read, break the rule.

Facts, numbers, qualifiers, and the author's voice outrank all six.

## Add soul (only where voice belongs)

Removing patterns is half the job. Sterile, voiceless writing is just as obvious. This applies to blog posts, essays, opinion, and personal writing, not to reference, technical, legal, or scientific text where neutral plain prose is the human voice.

- Have an opinion and a named target. An opinion no one could argue against is not an opinion.
- Calibrate certainty on a spectrum. High conviction: "clearly", "no question". Medium: "I think", "in my experience". Real doubt: "I'm not sure, but". A real mind moves across this range; AI parks in flat medium confidence. Never stack hedges.
- Use hard-to-fabricate specifics that come from the source: real dates, dollar amounts, file paths, measured numbers.
- Acknowledge complexity: "impressive but kind of unsettling" beats "impressive".
- Allow one tangent, one self-correction, one callback. A brief digression signals a thinking mind.
- Vary paragraph length hard. Four sentences, then one line.
- End without wrapping up. Not every piece needs a neat conclusion. Sometimes just stop.

Never invent a fact to create personality. That trades one slop for a worse one.

## Burstiness

Detectors measure sentence-length variance. Human writing is high-variance, AI is metronomic. Mix short (3-8 words), medium (12-20), and long (25-40) in every paragraph. Never three consecutive sentences of similar length. Use a fragment when it works. Let one sentence run long when the thought needs room.

## Perplexity

Detectors also measure how predictable each word is; human text is less predictable. Reach past the first word that comes to mind. Use domain-specific terms the audience knows. Make analogies from real experience. This is a natural side effect of specificity, not a trick to run on its own; a specific, opinionated draft is already high-perplexity.

## Voice profiles (when a register is chosen)

- **casual:** contractions always; first person where it fits; informal transitions; fragments for emphasis; "And"/"But" starters allowed.
- **professional:** selective contractions; third person by default, first person for opinions; dry wit; short paragraphs.
- **technical:** the exact term over a simpler one; one point per sentence; concrete numbers; no metaphor unless it clarifies; repeat identifiers verbatim.
- **warm:** contractions; "we"/"our"; acknowledge difficulty; encouragement without sycophancy; more whitespace.
- **blunt:** shortest sentences; no hedging; strong opinions as facts; active voice only.

## Portable block for CLAUDE.md / AGENTS.md

```
Writing rules (Orwell, 1946), for any prose you generate:
1. No printed-cliche metaphors; use a live image or none.
2. No long word where a short one works (use, not utilize).
3. Cut every word that can be cut (to, not in order to).
4. Active over passive; name the actor unless it is unknown or the register needs agentless.
5. No jargon or foreign phrase with a plain equivalent.
6. Break any rule sooner than write something unclear, untrue, or graceless.
Facts, numbers, qualifiers, and the author's voice outrank all six.
```

Paste rule six with the other five. The five-rule version travels the internet as a "humanizer" and produces the uniform plain voice it was meant to prevent.
