# Code slop

The prose catalog does not apply to code, but AI leaves its own tells in source and repo text. Run this on a diff, a file, or a whole branch. Behavior stays unchanged unless you are fixing a clear bug; match the surrounding file, not an ideal style.

## Comments

- **Restating the code.** `// increment i by 1` above `i++`, `// loop over users` above the loop. Delete. A comment earns its place by explaining *why*, a non-obvious constraint, or a link to a decision, not by narrating *what*.
- **Diff-narrating comments.** "// changed from the old approach", "// now uses async", "// previously this was O(n^2)". The code describes current behavior; the history lives in git. Delete unless the file is a changelog or migration guide.
- **Banner and section comments.** `// ===== HELPERS =====`, ASCII-art dividers, emoji in comments. Remove; let structure and naming carry it.
- **Redundant docstrings.** A docstring that repeats the signature ("getUser(id): gets the user by id") adds nothing. Keep docstrings that state contracts, units, error behavior, or edge cases.
- **Keep:** comments that explain a workaround, a non-obvious invariant, a gotcha, a reference to an issue or spec, or why a slower path was chosen.

## Structure and types

- **Defensive checks on trusted paths.** try/catch, null guards, and `if (!x) return` scattered where the surrounding code does not do this and the input is internal and trusted. Match the file's actual error model.
- **`any` casts and ignore-pragmas to dodge types.** `as any`, `// @ts-ignore`, `# type: ignore`, `eslint-disable` added only to silence a checker rather than fix the type. Flag; the real type is usually cheap.
- **Deep nesting where an early return works.** Three-plus levels of `if` that an early return or guard clause flattens.
- **Single-use abstractions.** A helper, wrapper, interface, or config option introduced for exactly one caller. Inline it.
- **Speculative generality.** Parameters, hooks, or extension points nothing uses yet ("in case we need it").

## Dead weight

- Commented-out code. Delete; git remembers.
- Unused imports, variables, exports, and parameters the change left behind.
- Console logging and decorative log lines added for the demo and never removed. Keep real, leveled logging that matches the codebase.
- Tests that assert nothing, snapshot everything, or restate the implementation instead of pinning behavior. A test that passes no matter what the code does is worse than none.

## Repo text

- **README and docs in adjectives.** "blazing-fast", "robust", "seamless", "powerful", "comprehensive" describing your own project. Say what it does and a number. Apply the prose catalog here.
- **Commit messages and PR bodies.** Emoji prefixes, "This PR introduces...", bold-first bullets, a "Summary / Changes / Testing" template padded with filler, marketing adjectives. State what changed and why in plain sentences. Diff-anchored is correct here (a commit *is* about the change); inflation is not.
- **Generated-config drift.** Settings, dependencies, or scaffolding a generator added that the project does not use.

## Guardrails

- Keep behavior unchanged unless fixing a clear bug.
- Prefer minimal, focused edits over broad rewrites.
- Consistency with the local file and codebase beats any rule here. If the file already uses banner comments everywhere, one more is not the battle.
- Keep the final summary to one to three sentences.
