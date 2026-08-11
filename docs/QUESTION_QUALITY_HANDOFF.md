# Question quality — handoff

Status note for whoever picks this up next (human or agent). Written
2026-08-10. Read this before touching the generators or the banks.

## The problem in one paragraph

The banks look large (7 sections × 575 = 4,025 items) but are far smaller than
they appear, and much easier than the real tests. Three defects are structural,
not cosmetic. **(1) Difficulty was never a property of the question**:
`assignDifficulties` in `scripts/lib/generation.js` filled the catalog's
175/250/150 quota buckets by rotating an index, and no generator ever read
`task.difficulty` — so `solve 2x + 6 = 14` and `greatest common factor of 40
and 48` are labelled Hard. **(2) Answer position was predictable from
difficulty**: position and difficulty were two separate index-driven rotations
walking the same task list, so they aliased. The tell is that the skew is
byte-identical across all four ACT sections (Hard `[101,7,7,35]`). Guessing
"Easy→C, Medium→B, Hard→A" scored 50.3% of the ACT math bank. **(3) The
duplicate gate is toothless**: `structuralSignature` keeps numbers for math and
keeps the scene preamble everywhere, so items differing only by town name or
coefficient pass it. Stripping the preamble, numbers, and proper nouns reveals
ACT Mathematics has **72 distinct question shapes across 575 items**.

## Already fixed (committed, tests green)

- `scripts/lib/generation.js` — difficulty now fills targets in **hash order**,
  decorrelated from the taxonomy walk. Answer positions balance **within each
  difficulty tier**, ties broken by an item hash. Generators are now expected to
  branch on `task.difficulty`; the label only means something if content follows.
- `scripts/audit-questions.js` — the measurement. `npm run audit:questions`,
  `--json`, or `--strict` (non-zero exit on threshold breach). Measures near
  duplicates by question *shape*, template-family dominance, answer position per
  difficulty tier, longest-choice-is-the-key rate, and a simulated score for a
  student who never reads the question.
- `core.js` `buildSession` — sessions avoid a persisted history of served
  questions and round-robin across template families. History lives in
  `progress.servedIds` (last 400, written at session build so quitting still
  rotates items out). Review modes opt out. Covered by tests in
  `tests/booklet.test.js`.
- Printable booklets (`booklet.js`, `print.html`, `scripts/build-booklet.js`)
  and full-length blueprints in `core.js`. Unrelated to content quality but
  they consume the banks, so don't break the record shape.

## Baseline to beat

`npm run audit:questions` on the pre-fix banks. Thresholds live in
`THRESHOLDS` at the top of `scripts/audit-questions.js`.

| Section | distinct shapes / 575 | near-dup | longest = key | blind score |
| --- | --- | --- | --- | --- |
| act-mathematics | 72 | 87.5% | 1.2% | 73.9% |
| sat-math | 144 | 75.0% | 5.2% | 72.7% |
| act-english | 344 | 40.2% | 26.3% | 78.4% |
| sat-reading-writing | 410 | 28.7% | 50.3% | 84.9% |
| act-reading | 575 | 0% | **83.3%** | **97.4%** |
| act-science | 575 | 0% | 39.8% | 87.7% |
| act-writing | 575 | 0% | n/a | n/a (essay) |

1 of 7 sections passes. Targets: near-dup < 2%, no family over 10% of a
section, no tier's top answer position over 40%, longest-is-key < 40%, blind
score < 40%.

## What remains

1. **SAT Math and ACT Mathematics generators** — in progress at time of
   writing; check `git diff scripts/generate-sat-math.js
   scripts/generate-act-mathematics.js`. Goal: three genuinely different
   variants per subskill keyed off `task.difficulty`, several structurally
   distinct shapes per tier, and real Hard content. **None of these topics
   exist anywhere in the bank today**: logarithms, trig identities beyond
   SOHCAHTOA, complex numbers, matrices, sequences and series, conics, vectors,
   function composition and inverses, discriminant reasoning, extraneous
   solutions.
2. **ACT Reading** — the worst section. 97.4% answerable without reading
   because the key is always the hedged, nuanced, longest option and the
   distractors are short absolutes. Fix by length-matching and equally
   qualifying the distractors. Also: median passage is 52 words against a real
   ~750, and no stimulus is shared by two items, so there are no passage sets.
3. **ACT Science** — 31 tautological items whose stimulus states the answer
   (`act-science-0008` and every 8th id after); 31 items where two distractors
   are the same dataset with rows swapped; all 63 `type: "graph"` items render a
   table then ask about "the graph".
4. **SAT R&W and ACT English text defects** — 25 items whose keyed answer is
   ungrammatical (`sat-reading-writing-0011`: *"Linden Park's a lending library
   of games…"*, plus every 6th id through 0155); 29 whose explanation describes
   a different question (`0316`, `0320`, `0324`, …); 40 that ask one question in
   the stimulus and a different one in the stem; ~87 article-agreement errors
   (*"a instrument library"*). ACT English has **zero NO CHANGE choices**, which
   is the actual format of the real section.
5. **Fold `audit:questions --strict` into `npm run check`** once sections pass,
   so the leaks cannot come back.

## Gotchas that cost time

- **Do not name a script `*-test.js`** — `node --test` globs that pattern and
  will execute it during the test run. This already happened once.
- **Guard `main()` with `require.main === module`** in scripts, or importing
  them for their helpers runs the whole script.
- Banks are canonical in `content/banks/*.json`; `content/generated/*.js` is
  built output. Run `npm run build:content` after regenerating, and commit both.
- Regenerate with `node scripts/generate-<section>.js --rebuild`. Without
  `--rebuild` it only tops up to the target and keeps existing items.
- Legacy items (`provenance.generator === "legacy-migration"`, ~20 per section)
  survive `--rebuild` and carry the old boilerplate distractor rationales.
- The schema requires **exactly four choices** and one distractor rationale per
  wrong choice. The validator, the app, and the booklet renderer all assume it.
  Real ACT Mathematics uses five choices — a known fidelity gap, do not "fix"
  it without changing all three.
- Keep U+2212 (−) for minus signs in **choices as well as stems**; the old bank
  mixes U+2212 in stems with ASCII hyphen in choices and it prints as visibly
  different dashes.
- Generators should tag items `family:<name>` in `tags` so the audit and the
  session builder can see template families without guessing.

## Commands

```sh
npm run check                 # syntax, validation, static smoke, 46 tests
npm run audit:questions       # quality report per section
npm run validate:content      # read-only, safe while other work is running
npm run build:content         # banks -> content/generated/*.js
npm run build:booklet -- --form sat-full --pdf
```

Deployed from `main` via GitHub Pages at
<https://clwx-31.github.io/sat-act-practice/>.
