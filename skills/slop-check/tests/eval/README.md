# Eval

Reproducible measurement of the linter. Run:

```
python3 run-eval.py                                   # recall on the AI-slop sets
python3 run-eval.py --human <corpus.json|.zip|.txt>   # + false-positive rate on human text
```

- `slop-samples-ko.md`, `slop-samples-en.md` — constructed AI-slop; target: score high (>=50).
- `slop-hard-ko.md` — KNOWN-HARD marker-light cases (metronomic + synonym cycling, short).
  The lexical linter does not flag these; realistic slop carries markers, and the skill's
  E-series rhythm patterns plus the model's judgment catch structural repetition. Kept as a
  documented limit, not a passing target.

Human text should score low (<25). Baseline (2026-08-27): KO slop 8/8 >=50, EN 4/4;
human FP >=50 ~1-2% on newspaper and 문어 nonfiction, 0% on the committed human fixture.
