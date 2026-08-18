# Rebuild handoff — every section

Live working document. Whoever picks this up (human, Claude, or Codex) should
read it end to end before touching a generator, a bank, or the app shell.
Last updated 2026-08-18.

## The goal

Every section carries an extremely large pool of questions — target **1,050 per
section**, up from 575 — spanning Easy, Medium, and Hard, where the label
describes the question and the questions read like real SAT and ACT items. The
app shell is then reorganised around a simpler primary flow.

"1,050 different questions" means 1,050 items no student ever sees twice, built
from a few hundred *shapes* that each appear a handful of times in different
wording and different settings. It does not mean 1,050 structurally distinct
question types per section; that would be roughly 7,000 hand-written shapes
across the seven sections.

## The two rules that govern everything

Both are enforced, both have bitten already, and neither is negotiable.

**1. The validator's near-duplicate rule.** `duplicateErrors` in
`scripts/lib/content.js` rejects any two questions in one section whose stem
token sets overlap by **Jaccard ≥ 0.90**. Tokens are words of **more than two
characters**, so one- and two-digit numbers are dropped entirely. For an algebra
item this means the numbers are invisible to the rule: `3x + 5 = 26` and
`4x + 7 = 31` are the *same question* as far as validation is concerned. Only
wording and setting distinguish two uses of a shape. For items carrying a
`stimulus`, only the stimulus is compared — the stem is ignored.

**2. Difficulty must be a property of the question.** `assignDifficulties` fills
the catalog's per-tier targets in hash order and every generator branches on
`task.difficulty`. A tier label is a lie unless the shape behind it is really
one-step (Easy), two or three steps (Medium), or governed by a structure the
student has to identify before computing (Hard).

## Architecture

```
content/catalog.json          sections → domains → skills → subskills, targets
content/banks/*.json          canonical questions (7 files, one per section)
content/generated/*.js        browser-ready derivative — never hand-edit
scripts/lib/content.js        schema validation, duplicate rules, bank I/O
scripts/lib/generation.js     taxonomy walk, difficulty assignment, answer placement
scripts/lib/scenes.js         scenario pools word problems draw settings from
scripts/generate-<section>.js one per section
scripts/check-shapes.js       runs every shape before it can reach a bank
scripts/audit-questions.js    measures a built bank
```

A **shape** is `(sequence, variant) => spec`. `sequence` varies the numbers;
`variant` counts how many times that shape has already been used in this bank
and is what the wording rotation keys off. The generator assembles a spec into a
record: it places the key at the planned answer position, sorts numeric choices
ascending, and refuses to emit a stem it has already emitted.

## Where each section stands

Measured by `npm run audit:questions` against the **committed** banks. Targets:
near-dup < 2%, no family over 10%, no tier's top answer position over 40%,
longest-is-key < 40%, answerable-without-reading < 40%.

| Section | distinct shapes / 575 | near-dup | longest = key | blind score | generator state |
| --- | --- | --- | --- | --- | --- |
| act-mathematics | 72 | 87.5% | 1.2% | 73.9% | **rewritten, not yet shipped** |
| sat-math | 144 | 75.0% | 5.2% | 72.7% | not started |
| act-english | 344 | 40.2% | 26.3% | 78.4% | not started |
| sat-reading-writing | 410 | 28.7% | 50.3% | 84.9% | not started |
| act-reading | 575 | 0% | **83.3%** | **97.4%** | not started |
| act-science | 575 | 0% | 39.8% | 87.7% | not started |
| act-writing | 575 | 0% | n/a | n/a (essay) | passes |

The committed banks are all still the original content. The ACT Mathematics
*generator* has been fully rewritten but its output has never been shipped,
because it does not yet clear rule 1 (see below).

## ACT Mathematics — what is done and what blocks it

All 38 subskills build from difficulty-aware shapes: 232 shapes, three tiers
each, `family:` tagged. `node scripts/check-shapes.js act-mathematics` exercises
them over 1,200 sequences.

A test rebuild measured: distinct shapes 72 → 423, answerable-without-reading
73.9% → 44.7%, Hard-tier top answer position 67.3% → 25.3%, exact duplicates
1.6%. Real Hard content now exists — harmonic-mean round trips, alligation,
compound versus simple interest, inverse-square variation, similar-figure area
scaling, chained ratios, matrix entries, complex numbers, logarithms.

**The blocker: 54 of the 232 shapes fail rule 1.** They rotate through four
phrasings, so a fifth reuse repeats the first, and because small numbers are
invisible to the validator the repeat is a rejection. `check-shapes` reports
each one as `reuses N and M overlap 100%`. The fix per shape is one of:

- **Algebra shapes** (no real-world setting): extend the `choose(variant, [...])`
  stem array from four phrasings to **eight**, each carrying a word the others
  lack — `Given`, `Suppose`, `Assume`, `Determine`, `Which`, `When`, `Let`,
  `Take`. Short frames are what separate them; the expression contributes almost
  no tokens.
- **Word-problem shapes**: draw a setting from `scripts/lib/scenes.js` with
  `scene(variant, POOL)` and phrase around it. Eight settings × four phrasings
  is ample, and it is also what makes the bank read like a real test rather than
  one scenario wearing different numbers.

Failing subskills: complex numbers, dimensional reasoning, exponents, factoring,
inequalities, linear equations, number properties, rational expressions,
systems, unit conversion. Run the harness for the current list.

## Order of work

1. **ACT Mathematics** — clear the 54 shapes, rebuild, ship. Nearest to done.
2. **SAT Math** — 48 subskills, none converted. `scripts/generate-sat-math.js`
   holds an unfinished rewrite from `09dd729`; it exports `context`,
   `formatNumber`, `mathQuestion` but **no `SHAPES`**, so `check-shapes.js`
   throws on it today. Same structure as ACT Mathematics, roughly twice the
   size.
3. **ACT Reading** — the worst section. 97.4% answerable without reading,
   because the key is always the hedged, qualified, longest option and the
   distractors are short absolutes. Fix by length-matching and equally
   qualifying every distractor. Also: median passage is 52 words against a real
   ~750, and no stimulus is shared by two items, so there are no passage sets.
4. **SAT Reading & Writing and ACT English** — 25 items whose keyed answer is
   ungrammatical (`sat-reading-writing-0011` and every 6th id through 0155); 29
   whose explanation describes a different question (`0316`, `0320`, `0324`, …);
   40 that ask one question in the stimulus and another in the stem; ~87
   article-agreement errors (*"a instrument library"*). ACT English has **zero
   NO CHANGE choices**, which is the actual format of the real section.
5. **ACT Science** — 31 tautological items whose stimulus states the answer
   (`act-science-0008` and every 8th id after); 31 where two distractors are the
   same dataset with rows swapped; all 63 `type: "graph"` items render a table
   and then ask about "the graph".
6. **Scale to 1,050.** `targetPerSection` is a single number used in five
   places, so every section grows together. Raising it needs: `targetPerSection`
   and `difficultyTargets` in `content/catalog.json` (keep the 30/43/26 split —
   320/455/275), each section's per-domain `target` values rescaled to sum to
   the new total, and the two assertions in `tests/content.test.js`. Do this
   only once the generators can fill it.
7. **App shell** — reorganise around a simpler primary flow.
8. **Fold `audit:questions --strict` and `check-shapes` into `npm run check`**
   once sections pass, so the leaks cannot come back.

## Authoring a shape

```js
(s, variant) => {
  const sc = scene(variant, PRODUCTION);          // word problems only
  const rate = span(s, 12, 8, 3);                 // low + (s % count) * step
  return {
    family: "unit-rate-from-a-total",             // required, kebab-case
    stem: choose(variant, [ /* 8 phrasings */ ]),
    answer: rate,                                 // number | string | val(text, value)
    wrong: [[value, "why a student picks this"], /* 5–6 of them */],
    why: "…", steps: ["…", "…"], principles: ["…"], hint: "…",
    verification: quotientCheck(total, hours, rate),
  };
}
```

Rules the harness enforces:

- Five or six `wrong` entries, not three. Assembly drops any that collide with
  the key or each other and needs three survivors at **every** sequence.
- Every distractor reason names the misconception, in 12 characters or more.
- U+2212 (−) for every minus sign, in choices as well as stems. Never an ASCII
  hyphen next to a digit.
- `verification.expected` must equal the key. It is recomputed independently by
  both the harness and the shipped validator; kinds are listed in `recompute`
  in `check-shapes.js`. Omit it rather than restate the answer.
- At least two `steps` and one `principle`.
- Eight reuses must all stay under 0.90 overlap — rule 1.

## Gotchas that have already cost time

- **Do not name a script `*-test.js`** — `node --test` globs that and will run
  it during the test suite. This happened once.
- **Guard `main()` with `require.main === module`**, or importing a script for
  its helpers runs the whole script.
- The harness swept 24 sequences until 2026-08-18 and missed shapes that only
  collapse at, say, sequence 175 — one of which aborted a rebuild. It now sweeps
  1,200. Do not narrow it.
- Banks are canonical; `content/generated/*.js` is built. Run
  `npm run build:content` after regenerating and commit both.
- `node scripts/generate-<section>.js` without `--rebuild` only tops up to the
  target and keeps existing items.
- Legacy items (`provenance.generator === "legacy-migration"`) survive
  `--rebuild` and carry the old boilerplate rationales. ACT Mathematics has 5.
- The schema requires **exactly four choices** and one rationale per wrong
  choice. Real ACT Mathematics uses five — a known fidelity gap. Changing it
  means changing the validator, the app, and the booklet renderer together.
- Printable booklets (`booklet.js`, `print.html`, `scripts/build-booklet.js`)
  and full-length blueprints in `core.js` consume the banks. Do not change the
  record shape without them.

## Commands

```sh
npm run check                 # syntax, validation, static smoke, tests — must pass before commit
node scripts/check-shapes.js  # every math shape, 1200 sequences (not yet in `check`)
npm run audit:questions       # quality report per section
npm run validate:content      # read-only, safe while other work runs
npm run build:content         # banks -> content/generated/*.js
node scripts/generate-act-mathematics.js --rebuild
npm run build:booklet -- --form sat-full --pdf
```

Deployed from `main` via GitHub Pages at
<https://clwx-31.github.io/sat-act-practice/>.
