# Codex reports

## Task 7 — ACT Mathematics rebuild audit failure (2026-08-25)

The required `--rebuild` kept 5 legacy items, generated 570 items, and produced
575 total ACT Mathematics questions. `npm run build:content` validated and
built all 4,025 questions, and `npm run check` passed all 58 tests.

The ACT Mathematics audit did not reach PASS:

| Metric | Result | Target |
| --- | ---: | ---: |
| Near-duplicate rate | 4.5% (26 items) | Under 2% |
| Distinct shapes | 549 | Report only |
| Largest family share | 0.7% (4 items) | At most 10% |
| Answerable without reading | 47.1% | Under 40% |
| Worst answer position in any tier | 25.3% | At most 30% |

`npm run check:difficulty` passed ACT Mathematics. The per-tier answer-position
check also passed, with Easy at 44/44/43/44, Medium at 62/62/63/63, and Hard at
38/38/37/37.

Task 7 stopped at the failed audit. No audit threshold was changed and no
content rewrite was attempted to force a pass. The deterministic rebuild left
the committed ACT Mathematics bank and generated browser bank unchanged.
