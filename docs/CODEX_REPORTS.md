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

## Task 10 — SAT Math choice-set treatment blocked (2026-08-25)

The ACT Science choice-set freshness treatment could not be exercised because
`node scripts/generate-sat-math.js --rebuild` stopped before writing a bank:

```text
Error: No SAT Math Medium shapes for Ratios, rates, and units/unit conversion
```

That missing tier is part of the Task 4 generator rewrite, which Task 10
explicitly excludes. The SAT Math bank and generated browser bank remain
unchanged, the partial generator edit was removed, and no threshold changed.

The unchanged bank's audit measurements are:

| Metric | Result | Target |
| --- | ---: | ---: |
| Near-duplicate rate | 75.0% (431 items) | Under 2% |
| Distinct shapes | 144 | Report only |
| Largest family share | 3.1% (18 items) | At most 10% |
| Answerable without reading | 56.5% | Under 40% |
| Worst answer position in any tier | 25.6% | At most 30% |

Among the 458 multiple-choice items, 210 still use a repeated choice set with
the same key. The audit's near-duplicate result is not a literal stem-pair
count: `shapeSignature` strips scene preambles, numbers, and proper nouns, then
prefixes the subskill. It therefore collapses SAT Math's 575 items into 144
structural signatures, while the independent stem-level measurement found one
near-duplicate pair.

Task 10 stopped at this blocker without starting Task 4 or changing an audit
gate to force a pass.

## Task 13 — ACT English assembly blocked on missing authored sets (2026-08-25)

After merging `main` at `4c1a01e`, the authored passage gate is clean but finds
34 passages and 492 questions, not the 40 passages and 575 questions stated in
Task 13:

```text
34 passages, 492 questions (150 Easy / 214 Medium / 128 Hard): clean.
Production of Writing 150/175
Knowledge of Language 79/92
Conventions of Standard English 263/308
```

The missing 83 questions are exactly 25 Production, 13 Knowledge, and 45
Conventions. The local `main` worktree is clean and contains authored files only
through `034-not-soaked-in.js`; passages 035–040 are not committed there.

The assembler and its passage-aware duplicate and answer-position rules are
implemented and `npm run check` passes 66 tests. The assembler counts authored
questions before either canonical write and currently stops with
`Authored sets produce 492 questions; the catalog target is 575`. No ACT English
bank, passage JSON, generated browser bank, or catalog target has changed. The
final catalog flip and shared outputs must wait until passages 035–040 land on
`main`.

Resolved 2026-08-26: `origin/main` at `e00ce1f` supplied passages 035–040. The
passage gate then reached 40 passages and 575 questions with every domain and
difficulty gap at zero, allowing the canonical and browser banks to be built.
