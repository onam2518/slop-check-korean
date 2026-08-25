# Pattern catalog: triggers, fixes, before/after

The compact list lives in `SKILL.md`. This file is the depth: full triggers, a before/after pair, and the false-positive note for each pattern. Ids match. Load it for a thorough audit or a contested edit. Merged from Wikipedia's "Signs of AI writing", tropes.fyi, HC3 corpus work, and the ten source skills.

Judge clusters, not single tokens. One marker is how people write; several in the same passage is evidence.

## A. Content and claims

**A1 Significance inflation.** Triggers: stands/serves as, is a testament/reminder to, a vital/crucial/pivotal role or moment, underscores/highlights its importance, reflects broader, symbolizing its enduring, setting the stage for, marking a shift, key turning point, evolving landscape, focal point, indelible mark, deeply rooted.
- AI: "established in 1989, marking a pivotal moment in the evolution of regional statistics"
- Human: "established in 1989 to collect regional statistics"
- Keep: a real turning point the source documents with a date and a consequence.

**A2 Promotional language.** Triggers: nestled, in the heart of, vibrant, breathtaking, must-visit, world-class, state-of-the-art, cutting-edge, seamless, robust, renowned, rich (figurative), boasts, stunning, commitment to.
- AI: "Nestled within the breathtaking region of Gonder, a vibrant town with rich cultural heritage"
- Human: "A town in the Gonder region, known for its weekly market and an 18th-century church"
- Keep: brand terms present in the source; a superlative a cited source actually made.

**A3 Superficial -ing tails.** Triggers: a sentence-ending clause led by highlighting, underscoring, emphasizing, ensuring, reflecting, symbolizing, fostering, showcasing, contributing to, cultivating.
- AI: "The palette resonates with the region's beauty, symbolizing bluebonnets, reflecting the community's deep connection to the land"
- Human: "The architect chose blue and gold to reference local bluebonnets"
- Keep: an -ing clause that carries a real, sourced claim.

**A4 Vague attribution.** Triggers: experts argue/believe, studies show, research suggests, industry reports, observers have cited, some critics argue, widely regarded, it is believed that.
- AI: "Experts believe it plays a crucial role in the regional ecosystem"
- Human: "A 2019 Chinese Academy of Sciences survey found 12 endemic fish species"
- Keep: the claim when the source names a real authority; never invent one to replace the weasel phrase.

**A5 Name-dropping / overattribution.** Triggers: featured in, profiled in, cited in [list], independent coverage, active social media presence, written by a leading expert.
- AI: "cited in NYT, BBC, FT, and The Hindu"
- Human: "In a 2024 NYT interview, she argued regulation should focus on outcomes"
- Keep: a citation the source gives real context for.

**A6 Formulaic challenges / outlook.** Triggers: Despite its ... faces several challenges, Despite these challenges, Challenges and Legacy, Future Outlook, Looking ahead, the road ahead.
- AI: "Despite these challenges, Korattur continues to thrive as an integral part of Chennai's growth"
- Human: "Traffic worsened after 2015 when three IT parks opened. A stormwater project started in 2022"
- Keep: a challenges section that analyzes specific problems with data.

**A7 Symbolic gloss.** Triggers: represents, symbolizes, speaks to, embodies, reflects broader, applied to a mundane fact.
- AI: "The closed factory represents the decline of American manufacturing"
- Human: "The factory closed in 2009. Three hundred jobs. The town's high school dropped football the next year"
- Keep: interpretation the author owns as an argument, backed by evidence.

**A8 Grandiose stakes.** Triggers: will define the next decade/era, changes everything, reshape how we think about everything, something entirely new, fundamentally reshape.
- AI: "This will fundamentally reshape how we think about everything"
- Human: "This cuts the onboarding step from four screens to one"
- Keep: a large claim the piece actually supports.

**A9 Hallucination markers.** Triggers: suspiciously precise unsourced numbers, citations to sources that do not exist, confident claims about obscure facts with no citation, overly specific dates that feel fabricated.
- Fix: verify against the source or cut. Never keep a number you cannot trace.

**A10 Vague declaratives.** Triggers: the implications are significant, the stakes are high, the reasons are structural, the consequences are real, this is the deepest problem.
- AI: "The implications for the team are significant"
- Human: "Two engineers now own a service that used to have six"

**A11 Lazy extremes.** Triggers: every, always, never, everyone, nobody, everybody doing vague work.
- AI: "Everyone struggles with alignment. Nobody admits confusion"
- Human: "Most teams I've worked with struggle with alignment, and few people admit it"
- Keep: an extreme that is literally true.

**A12 Invented concept labels.** Triggers: an abstract problem-noun (paradox, trap, creep, divide, vacuum, inversion) bolted to a domain word and used as if established: "the supervision paradox", "workload creep", "the acceleration trap".
- Fix: define it if it needs a name, or describe it in plain language. Multiple such labels in one piece is a strong signal.

**A13 Historical analogy stacking.** Triggers: rapid-fire company or revolution lists: "Apple didn't build Uber. Facebook didn't build Spotify."
- AI: "Apple didn't build Uber. Facebook didn't build Spotify. Stripe didn't build Shopify."
- Human: "AWS sold infrastructure. Airbnb built a business on top of it. That split repeats across the industry"

## B. Vocabulary

Full tiered lists with replacements are in the Quick-swap tables at the end of this file; the machine-readable lexicon (with weights and regexes) is `rules/slop-rules.json`. Rule: a lone tier-3 word is not evidence; clusters across tiers are a confession.

**B1 Tier-1 (always flag).** delve, tapestry, testament, underscore, leverage, multifaceted, realm, interplay, pivotal, meticulous, seamless, groundbreaking, transformative, paramount, myriad, cornerstone, empower, catalyst, nestled, unpack, deep dive, actionable, impactful, learnings, embark, garner, foster, showcase, vibrant, crucial, robust, intricate, enduring, synergy.

**B2 Tier-2 (two or more).** additionally, furthermore, moreover, notably, comprehensive, paradigm, holistic, utilize, facilitate, nuanced, elucidate, encompass, streamline, spearhead, bolster, poised, cutting-edge, harness.

**B3 Tier-3 (context only).** key, important, significant, various, effective, valuable, powerful, essential.

**B4 Business jargon and dead metaphors.** navigate (figurative), lean into, double down, move the needle, low-hanging fruit, north star, flywheel, circle back, deep dive, pain points, table stakes, paving the way, boil the ocean; abstract metaphor nouns: substrate, wedge, vector, primitive, scaffolding, bedrock, endgame, ecosystem.

**B5 Copula avoidance.** serves as, stands as, boasts, features, offers, marks, represents where is/are/has works.
- AI: "Gallery 825 serves as the exhibition space and boasts 3,000 square feet"
- Human: "Gallery 825 is the exhibition space. It has four rooms totaling 3,000 square feet"

**B6 Weak verb phrases.** made a decision → decided; has the ability to → can; in order to → to; is able to → can.

**B7 Magic adverbs.** quietly, genuinely, truly, actually, deeply, fundamentally, really, just, literally, simply, remarkably, arguably, incredibly, honestly.
- Fix: cut. If the claim needs the adverb to be true, the claim is weak. Keep one that carries real uncertainty or the writer's spoken rhythm.

**B8 Hyphenated pairs after the noun.** "the report is high-quality" → "the report is high quality". Hyphenate a compound modifier before a noun only.

## C. Sentence structure and rhetoric

**C1 Binary contrast / negative parallelism.** The single most-cited AI tell. Triggers: not X but Y; it's not just X, it's Y; the question isn't X, it's Y; not because X, because Y; it feels like X, it's actually Y; stops being X and starts being Y; doesn't mean X but actually Y.
- AI: "It's not just a song, it's a statement"
- Human: "The heavy beat adds to the aggressive tone"
- Keep: one load-bearing contrast per piece. Five is a template.

**C2 Negative listing.** Triggers: Not a X. Not a Y. A Z. / It wasn't X. It wasn't Y. It was Z. / Not ten. Not fifty. Five hundred.
- Fix: state Z. The reader does not need the runway.

**C3 Dramatic fragmentation / staccato.** Triggers: "[Noun]. That's it. That's the thing." / "X. And Y. And Z." / "He published this. Openly. In a book."
- AI: "It had no preference for symmetry. No aesthetic prior. No nostalgia. The old rules were gone."
- Human: "It did not favor symmetry or human-looking designs, which made some older assumptions less useful"
- Keep: one short sentence for emphasis. Flag a run of them.

**C4 Self-posed question.** Triggers: "The result? Devastating." / "The worst part?" / "What if I told you" / "The kicker?".
- AI: "What if I told you the best teams don't optimize for productivity? Here's what I mean:"
- Human: "The best teams optimize for learning, not productivity"

**C5 Throat-clearing.** Triggers: Here's the thing, Here's what/why/how, Let me be clear, The truth is, It turns out, The real X is, I'll be honest, Can we talk about.
- Fix: cut and state the point.

**C6 Faux-insight setups.** Triggers: what most people get wrong, here's what nobody tells you, the part everyone misses, this is the part most people skip.
- AI: "The part everyone misses: distribution is the real moat"
- Human: "Distribution is the moat"

**C7 Colon reveal / colon connectors.** Triggers: a noun phrase, colon, lowercase dramatic reveal ("The best part: it learns"); a colon used as a mid-sentence connector.
- Fix: plain sentence. Colons for lists, labels, quotes.

**C8 Emphasis crutches.** Triggers: Full stop. Period. Let that sink in. Make no mistake. This matters because. Here's why that matters.
- Fix: delete.

**C9 Fake-candid / infomercial hooks.** Triggers: Honestly?, Look,, Real talk, Here's the thing, The catch?, The kicker?, Sound familiar?, Here's where it gets interesting.
- AI: "Is it worth the price? Honestly? It depends on how often you'll use it"
- Human: "Whether it's worth the price depends on how often you'll use it"
- Keep: "honestly" or "look" mid-sentence in casual writing. The tell is the standalone theatrical opener.

**C10 Pedagogical hand-holding.** Triggers: Let's break this down, Let's unpack, Let's explore, Think of it as, Think of it like, Imagine a world where.
- AI: "Imagine a world where every meeting had a clear agenda. Think of it like a recipe."
- Human: "Meetings without agendas waste time. Writing the agenda forces the organizer to decide whether the meeting is necessary at all"

**C11 Aphorism formulas / mic-drop kickers.** Triggers: X is the new Y, the currency of, the architecture of, X is not a tool but a mirror; a final "deep" one-liner.
- AI: "Symmetry is the language of trust"
- Human: "Symmetric layouts often feel more predictable to users"
- Fix: delete the kicker; end on the clearest concrete sentence already in the draft. Do not rewrite it into a better metaphor.

**C12 Depth-pretending tropes.** Triggers: the real question is, at its core, in reality, what really matters, the deeper issue, the heart of the matter, "the reality is simpler", "history is clear".
- AI: "At its core, what really matters is organizational readiness"
- Human: "That mostly depends on whether the organization is ready to change its habits"

**C13 Answering objections nobody raised.** Triggers: This isn't (mainly/really) about, I'm not saying/arguing, To be clear, Don't get me wrong, This is not to say.
- AI: "This isn't mainly about prompt length, and I'm not arguing documentation doesn't matter."
- Human: "The issue is whether the agent can use the instruction when it acts"
- Keep: an objection the text names its source for or answers in full. A direct claim ("the API is not thread-safe") is not this pattern.

**C14 Rejecting fake alternatives.** Triggers: A tempting approach would be, One might be tempted to, An obvious approach would be, It would be easy to just.
- AI: "A tempting approach would be to rotate tokens by restarting the auth service on a cron job, but that would drop every session."
- Human: "Session tokens rotate in place every 24 hours; clients refresh transparently"
- Keep: one genuinely considered alternative in a design doc. Several short unrelated rejections is the tell.

**C15 False vulnerability.** Triggers: And yes, since we're being honest; this is not a rant, it's a diagnosis; And yes, I'm openly.
- Fix: real admission is specific and uncomfortable. Replace or cut.

**C16 Correlative bloat.** Triggers: not only ... but also, whether ... or, both ... and inflating a simple sentence.
- Fix: split or simplify.

**C17 False ranges.** Triggers: "from X to Y" where X and Y are not on a real scale.
- AI: "From the singularity of the Big Bang to the enigmatic dance of dark matter"
- Human: "The book covers the Big Bang, star formation, and current theories about dark matter"

**C18 Inclusiveness padding.** Triggers: whether you're a founder, marketer, or creator; from beginners to experts.
- Fix: name the actual audience or cut.

**C19 Interpretive metadiscourse.** Triggers: that last part matters more than it sounds, the key point is, as you can see, this distinction matters, redundant "in other words".
- Fix: delete if the point is clear; otherwise replace with support.

**C20 Signposting / announcing.** Triggers: in this article we'll, let's dive in, without further ado, the rest of this essay, as we'll see, let me walk you through, now let's look at.
- AI: "Let's dive into how caching works in Next.js. Here's what you need to know."
- Human: "Next.js caches data at multiple layers: request memoization, the data cache, and the router cache"

**C21 Hedged-enumeration openers.** Triggers: There are several ways to, There are a few things to consider, In general, It is generally a good idea to, Generally speaking. (Grounded in the HC3 corpus.)
- AI: "There are several ways to speed up a slow query. In general, consider indexing."
- Human: "Add an index on user_id. That took the query from 900ms to 12ms"

**C22 Credential openers.** Triggers: "As a [role], I ...".
- Fix: say the thing. Real people don't announce credentials first.

**C23 Crutch starters.** Triggers: Wh-cleft sentences ("What makes this hard is"), paragraphs starting with "So," a sentence starting "Look,".
- AI: "What makes this hard is the coordination cost"
- Human: "The coordination cost is the hard part. You notice it the first time two teams ship the same fix"

**C24 Hedging seesaw / stacked qualifiers.** Triggers: could potentially possibly; on one hand / on the other when the author has a view; a tidy both-sides wrap on a question the piece already answered.
- AI: "It could potentially possibly be argued that the policy might have some effect"
- Human: "The policy may affect outcomes"
- Fix: one qualifier per claim; take the position.

## D. Voice and agency

**D1 Agentless passive.** Triggers: it is recommended that, changes were made, no configuration is needed, the results are preserved automatically, mistakes were made.
- AI: "No configuration file needed. The results are preserved automatically."
- Human: "You don't need a config file. The system preserves the results automatically"
- Keep: passive when the actor is unknown, irrelevant, or the register uses agentless obligation ("logs must be retained for seven years").

**D2 False agency.** Triggers: the data tells us, the market rewards, the decision emerges, the culture shifts, the conversation moves toward, "this ensures/allows/enables" with no actor.
- AI: "The market rewards companies that listen"
- Human: "Customers spend more with companies that answer tickets within an hour"

**D3 Narrator-from-a-distance.** Triggers: Nobody designed this, people tend to, one might say, there is a sense that, this happens because.
- AI: "People tend to underestimate how much testing matters"
- Human: "You'll underestimate how much testing matters, right up until a Friday deploy pages you at 2am"

**D4 Synonym cycling / elegant variation.** Triggers: the same subject renamed each sentence (protagonist / main character / central figure / hero; the artist / the visionary creator / the non-conformist painter).
- Fix: pick the clearest term and repeat it. Humans repeat words without anxiety.

**D5 Anaphora abuse / repeated openings.** Triggers: "They assume ... They assume ... They assume"; several sentences opening with the same subject.
- Fix: merge, vary the subject, or start with the action. One deliberate repetition ("She came. She saw. She conquered.") is voice.

## E. Rhythm and statistics

**E1 Uniform sentence length (low burstiness).** Three or more consecutive sentences within a few words of each other. The single most measurable detection signal. Mix 4-word and 30-word sentences.

**E2 Rule-of-three reflex / tricolon stacking.** Forced triads for rhythm; back-to-back parallel triads. Use the natural number; two and four are underrated.

**E3 Parataxis / every-sentence-a-closer.** Short declaratives chained with no connective tissue; every paragraph ending punchy. Reconnect with subordination, conjunctions, semicolons; vary endings.

**E4 Uniform paragraphs / identical template.** Every paragraph the same size, or the same topic → explanation → example → transition shape. Let some be one sentence; let some end without a transition.

**E5 Parallel sections / listicle in a trench coat.** "The first wall ... The second wall ... The third wall ..." A list is a list; prose weaves points together without numbering.

**E6 Low vocabulary diversity / trigram repetition / duplication.** The same three-word phrases reused; whole sections repeated. Repeat the clear word, not the phrase.

## F. Composition

**F1 Fractal summaries / signposted conclusions.** In conclusion, To sum up, Overall, a final paragraph restating the piece; a summary at every level. End on the last concrete point or next action.

**F2 Section-closing recaps / "Whether you ..." enders.** SEO-style local recaps ending paragraphs. Cut; end on the strongest specific point.

**F3 Generic positive endings.** the future looks bright, exciting times ahead, poised for growth, a step in the right direction, only time will tell. End on a fact, a question, or nothing.

**F4 One-point dilution / treadmill.** in other words, put simply, essentially; the same thesis restated with new metaphors across thousands of words. Say it once, support it, move on.

**F5 Dead metaphor beaten to death.** One metaphor reused in every paragraph (walls and doors 30 times). Use it twice at most, then drop it.

**F6 Paragraph-reshuffling immunity.** Paragraphs 2 and 4 swap without breaking the piece. Make each depend on the last; merge or cut interchangeable blocks.

**F7 Heading echoed in first sentence.** "## Performance" then "Speed matters." then the real content; "This section covers X". Cut the echo.

**F8 Diff-anchored writing.** In docs and comments: was added to replace, previously, now uses, has been updated to. Describe current behavior. Changelogs and migration guides are exempt.

**F9 Register shift / perfect-error alternation.** Graduate-thesis prose beside casual notes; spelling that switches mid-piece; polished prose alternating with basic errors (a partial human edit of AI output). Hold one register.

## G. Formatting

**G1 Em and en dashes.** None by default in short copy; at most one or two in a long draft when they clearly beat a comma, period, colon, or parentheses. Spaced hyphens and ` -- ` count. A writing sample that uses them overrides this at the sample's rate. Em dashes alone prove nothing; they are evidence paired with formulaic rhythm.

**G2 Bold-first bullets / inline-header lists.** `- **Performance:** Performance improved ...` where the label restates the line. Convert to prose or a plain list. A bold lead-in followed by genuinely new detail ("**Schema in TypeScript.** Tables live in one file.") is fine.

**G3 Erratic inline bold / bold overuse.** Patternless 1-4 word bold spans; bold on every proper noun or acronym. Strip except glossary terms and UI labels.

**G4 Title Case Headings.** Use sentence case.

**G5 Decorative emoji.** In headings, bullets, commit messages, logs. Remove. One or two emoji in a social post is fine.

**G6 Curly quotes / unicode arrows / decoration.** Straight quotes, `->`. Curly quotes alone prove nothing; most editors auto-curl. Count them only with other tells.

**G7 Excessive structure.** Headers over two-sentence sections, tables where prose reads better, bullets where argument flows, a horizontal rule before every heading. Structure follows content.

**G8 Markdown bleeding into plain text.** `**bold**` in email, DM, social, Word. Strip.

**G9 Question-format section titles / hashtag stacks / thread openers.** "What makes X unique?" as a heading; "🧵 Thread:"; walls of hashtags. Statement headings; zero to two hashtags.

**G10 Exclamation / ellipsis overuse.** At most one exclamation per ~1,000 words; ellipsis only when genuinely trailing off.

## H. Chatbot and tool artifacts

**H1 Chatbot phrases.** I hope this helps, Certainly!, Of course!, Let me know if, Would you like me to, Here is a. Delete.

**H2 Sycophancy.** Great question!, You're absolutely right!, Excellent point!, That's a great point. Answer directly.

**H3 Cutoff disclaimers / speculative gap-fill.** as of my last update, while specific details are limited, maintains a low profile, keeps personal details private, likely grew up, it is believed that. State what the source lacks, or cut. Do not present a guess as fact.

**H4 Reasoning-chain artifacts.** Let me think, Step 1:, Breaking this down, First, I'll. Keep the conclusion in the author's voice.

**H5 Acknowledgment loops.** "You're asking about X ...". Answer; the reader knows what they asked.

**H6 Placeholders.** [Your Name], [INSERT SOURCE], 2025-XX-XX, square-bracketed instructions. Fill or delete.

**H7 Citation markup leaks.** citeturn0search0, oaicite, contentReference, oai_citation, utm_source=chatgpt.com. Strip.

**H8 Unicode obfuscation.** Zero-width spaces/joiners, soft hyphens, Cyrillic or Greek homoglyphs for Latin letters. Normalize to plain NFC text.

**H9 Brief reprinted as artifact.** An instruction about the writing ("keep that texture", "do not turn this into a lesson") left in the writing. Follow it; do not print it.

## Human details to keep

These carry voice and are hard for a model to fake. Preserve unless they hurt meaning: real dates, dollar amounts, file paths, proper names, measured numbers; mixed or unresolved feelings; lived first-person detail (the 2am debugging session); era-bound slang and in-jokes; deliberate fragments, tangents, self-corrections, and endings that just stop; anything written before November 30, 2022.

## Quick-swap tables

Condensed from the merged sources; the machine-readable version with weights is `rules/slop-rules.json`. Swap when the plain word is clearer, keep when the precise term is right (rule 6 of the writing system).

**Tier-1 vocabulary → plain word.** delve → look at; tapestry → say what you mean; testament ("a testament to") → state the fact; pivotal/crucial → important, or cut; landscape/realm (abstract) → field, or be specific; intricate → complex; showcase → show; foster → build, encourage; garner → get; interplay → relationship; enduring → lasting; vibrant → what makes it lively; meticulous → careful; seamless → smooth; groundbreaking → new, first; leverage → use; synergy → cooperation; transformative → describe the change; paramount → most important; multifaceted → varied; myriad → many; cornerstone → foundation; empower → enable; catalyst → trigger; nestled → is in; unpack → explain; deep dive → analysis; actionable → useful; impactful → name the effect; learnings → lessons; robust → strong, solid; embark → start; underscore → show; renowned → well known; invaluable → valuable; quietly → cut; supercharge → speed up; ever-evolving → changing; game-changer → the concrete change.

**Filler → replacement.** in order to → to; due to the fact that → because; at this point in time → now; in the event that → if; has the ability to / is able to → can; it is important/worth noting that → (remove); at the end of the day → (remove); when it comes to → for; the fact that → that; in terms of → for, about; for the purpose of → to; in the realm of → in; at its core → (remove); first and foremost → first; last but not least → finally; a large number of → many; on a daily basis → daily; the majority of → most.

**Copula / weak verbs → plain.** serves as / stands as / marks / represents → is; boasts / features / offers → has; utilize → use; facilitate → help; made a decision → decided.

**Structures** (full detail in section C above): binary contrast, negative listing, dramatic fragmentation, self-posed questions, anaphora, tricolon stacking, false ranges, listicle-in-a-trench-coat. Fix: state the point directly, use the natural list length, name the actor, vary rhythm.
