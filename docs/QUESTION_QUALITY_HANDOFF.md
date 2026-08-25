# Rebuild handoff — every section

Live working document. Whoever picks this up (human, Claude, or Codex) should
read it end to end before touching a generator, a bank, or the app shell.
Last updated 2026-08-19, after the ACT Reading rebuild shipped. **Numbers below
were re-measured against the working tree at that commit** — re-run the commands
in [Commands](#commands) before trusting any figure here; they drift every time a
generator or a gate changes.

> **Resume here.** ACT Reading is finished and shipped and passes both gates.
> ACT English is the next section and its authoring contract exists but no
> passage has been written yet. The exact continuation checkpoint is at the
> bottom of this file, under [Checkpoint](#checkpoint-2026-08-19).

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

**2. Difficulty must be a property of the question.** The criteria are written
down in `docs/DIFFICULTY_CALIBRATION.md` and measured by
`npm run check:difficulty`, which currently reports **1 of 7 sections has
meaningful difficulty labels** — for most sections the Hard tier is *more*
guessable without reading than the Easy tier, which means the label is
decorative.
 `assignDifficulties` fills
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

| Section | distinct shapes / 575 | near-dup | longest = key | blind score | audit | generator state |
| --- | --- | --- | --- | --- | --- | --- |
| act-reading | 575 | 0% | 18.8% | 23.8% | **PASS** | **rebuilt and shipped** |
| act-writing | 575 | 0% | n/a | n/a (essay) | PASS | passes |
| act-mathematics | 72 | 87.5% | 1.2% | 73.9% | FAIL | rewritten, not yet shipped |
| sat-math | 144 | 75.0% | 5.2% | 72.7% | FAIL | not started |
| act-english | 344 | 40.2% | 26.3% | 78.4% | FAIL | contract written, no passages yet |
| sat-reading-writing | 410 | 28.7% | 50.3% | 84.9% | FAIL | not started |
| act-science | 575 | 0% | 39.8% | 87.7% | FAIL | not started |

`npm run check:difficulty` now reports **2 of 7** sections with meaningful
difficulty labels (act-reading and act-writing).

Five banks are still the original content. The ACT Mathematics *generator* has
been fully rewritten but its output has never been shipped, because it does not
yet clear rule 1 (see below).

## ACT Reading — done

Rebuilt from scratch and shipped. 55 authored passages in
`scripts/data/act-reading/`, 575 questions, exactly on the catalog's domain
targets (275 / 160 / 140) and difficulty targets (175 / 250 / 150).
`scripts/generate-act-reading.js` no longer generates anything: it assembles the
authored sets into bank records, writes the shared passages to
`content/passages/act-reading.json`, and balances answer positions inside each
difficulty tier *and* overall.

What moved with it, and why it matters to every remaining section:

- **Three gates scored a passage-set item on its stem alone**, so two sets both
  asking "the passage is best described as" — wording the real ACT reuses on
  every form — read as duplicates. `duplicateErrors` and the audit's
  `shapeSignature`/`exactSignature` now anchor on `passageId`;
  `check-difficulty.js` uses the stem together with its choices. Expect to need
  the same treatment for ACT English, whose stems repeat by design.
- **`booklet.js` refuses non-ASCII LaTeX**, so authored prose with real names
  needs its accented letters in `TEX_UNICODE`. A table of common Latin accents
  is now there; add to it rather than rewriting a name.
- **Strategy is per-subskill, everything else is per-item.** `explanation`,
  `solutionSteps`, `hint`, and `trap` all come from the authored question.
  `strategy` comes from a 25-entry table in the generator, because the fastest
  reliable approach to a vocabulary-in-context item genuinely is the same one
  every time. A `trap` the author did not write is built from the first
  distractor's own reason, so it still names that item's wrong turn.

## ACT Mathematics — what is done and what blocks it

All 38 subskills build from difficulty-aware shapes: 232 shapes, three tiers
each, `family:` tagged. `node scripts/check-shapes.js act-mathematics` exercises
them over 1,200 sequences.

A test rebuild measured: distinct shapes 72 → 423, answerable-without-reading
73.9% → 44.7%, Hard-tier top answer position 67.3% → 25.3%, exact duplicates
1.6%. Real Hard content now exists — harmonic-mean round trips, alligation,
compound versus simple interest, inverse-square variation, similar-figure area
scaling, chained ratios, matrix entries, complex numbers, logarithms.

**The blocker: the harness now reports 206 problems across the 232 shapes**,
concentrated in 9 shape families. They rotate through too few phrasings, so a
later reuse repeats an earlier one, and because small numbers are invisible to
the validator the repeat is a rejection. `check-shapes` reports each one as
`reuses N and M overlap 100%`.

> ⚠️ **This number was 54 when the harness was looser.** `45454f7` made the
> harness apply the validator's *actual* near-duplicate rule, and `cacb869`
> then converted 34 algebra shapes to the shared phrasing layer. 206 is the
> honest current count — the work is roughly four times what the old figure
> implied. Re-run `npm run check:shapes -- act-mathematics` for the live list
> and the exact families; do not plan against the number printed here.

The fix per shape is one of:

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
   throws on it today. (It throws on every section except `act-mathematics` for
   the same reason — that is expected, not a bug to chase.) Same structure as ACT Mathematics, roughly twice the
   size.
3. ~~**ACT Reading**~~ — done, see above.
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
npm run check:shapes -- act-mathematics   # every shape, 1200 sequences (not yet in `check`)
npm run check:difficulty      # are the tier labels real? (not yet in `check`)
npm run audit:questions       # quality report per section
npm run audit:questions:strict
npm run validate:content      # read-only, safe while other work runs
npm run build:content         # banks -> content/generated/*.js
node scripts/generate-act-mathematics.js --rebuild
npm run build:booklet -- --form sat-full --pdf
```

Deployed from `main` via GitHub Pages at
<https://clwx-31.github.io/sat-act-practice/>.

## Checkpoint 2026-08-19

Where this stopped, precisely, so the next session does not repeat the audit.

### Completed and committed

- **ACT Reading, end to end.** 55 passage files in `scripts/data/act-reading/`
  (`001-lamplighter.js` … `055-ice.js`), the assembling generator, the shipped
  bank, `content/passages/act-reading.json`, and the three gate fixes described
  above. `npm run check` passes; `npm run audit:questions` and
  `npm run check:difficulty` both report act-reading as PASS.
- Two of the 55 carry data: `011-smoke-seeds.js` has a pipe table and
  `018-breathing-curve.js` has an ASCII plot. `unwrapParagraphs` keeps the line
  structure of any block containing `|`, which is what makes both render.

### In progress, uncommitted at the point of stopping

- `scripts/data/act-english/` holds `index.js`, `README.md`, and **passage 001
  of 40** and **002 of 40** — `001-key-counter.js` (personal essay, 16 questions
  at 5 PoW / 3 KoL / 8 CSE, 5/7/4 Easy/Medium/Hard, 3 NO CHANGE keys of 12
  underlined = 25%) and `002-snow-fence.js` (informative essay, 14 questions at
  4 / 2 / 8, 4/6/4, 3 keeps of 11 = 27.3%), plus `003-hose-threads.js`
  (historical account, 16 questions at 5 / 3 / 8, 5/7/4, 3 keeps of 12 = 25%).
  and `004-piano-tuning.js` (process narrative, 13 questions at 4 / 2 / 7,
  4/6/3, 3 keeps of 11 = 27.3%), and `005-shallow-end.js` (personal essay, 15
  questions at 5 / 2 / 8, 5/6/4, 3 keeps of 12 = 25%). **5 of 40 authored, 74 of
  575 questions**; all four passage types are in use and all four size groups
  from the build plan have one member. Running keep rate 15 of 58 = 25.9%.
  From 003 on, whole-essay questions carry no marker and are numbered last.
  They are authored but **not yet verified by a harness** — `check-passages.js`
  still has no act-english rules, and nothing loads the file, so `npm run check`
  passing says nothing about it. Codex Task 1 in `docs/CODEX_LANE.md` is that
  harness; run it against this passage first.
- The keep rate is defined as `keeps / underlined questions` — non-underlined
  rhetorical questions carry no NO CHANGE and stay out of the denominator. This
  is now stated in the authoring README so the checker matches the authoring.

Superseded note, kept for the record:

- `scripts/data/act-english/` exists with `index.js` and `README.md` only. The
  README is the authoring contract and the build arithmetic (40 passages:
  12 × 16 at 5/3/8, 3 × 15 at 5/2/8, 13 × 14 at 4/2/8, 12 × 13 at 4/2/7 →
  575 questions, 175 / 92 / 308). **No passage has been written and no harness
  rules exist for the section yet.**

### Requirement for the Codex lane — marker rule is too strict

`scripts/check-passages.js` (committed on `codex-lane` as `f946286`) requires a
`{n}` marker for every question. It should not. Run against passages 001 and 002
it reports 5 problems, and all five are the same false positive:

```
act-english-p001 q15: needs exactly one {15} marker
act-english-p001 q16: needs exactly one {16} marker
act-english-p002 q14: needs exactly one {14} marker
```

Those are **whole-essay questions** — *"Suppose the writer's goal had been…"*,
*"Paragraph 3 should be placed:"*. On the real ACT they have no location in the
text; they are printed after the passage. The checkpoint spec already said `{n}`
is *optional* for a non-underlined question.

The rule the harness should enforce, now written into
`scripts/data/act-english/README.md`:

- An **underlined** question needs exactly one `{n text}` marker. (Correct today.)
- A **point-specific non-underlined** question needs exactly one bare `{n}`.
- A **whole-essay non-underlined** question carries **no marker at all**, and
  every such question must be numbered last in the set — which keeps the markers
  that do exist running in passage order.

Distinguish them by whether a marker exists, not by a new field: a question with
no marker is valid only if it is non-underlined and its number is greater than
every numbered marker in the passage.

Everything else the harness reports is correct, including the keep-rate
denominator (`6/23 underlined`, 26.1%) and the on-pace domain and difficulty
tables, which show 0 gap on all six rows at 30 questions.

### The next four steps, in order

1. **Extend `scripts/check-passages.js` for act-english.** It currently hard-codes
   the reading rules: `SOURCES` has one entry, `checkQuestion` applies the
   reading length-ratio rule, and the pace report is reading-shaped. Split the
   per-section rules out. English needs: numbers running 1..N with markers in
   passage order; `{n text}` present exactly once per underlined question and
   `{n}` optional for a non-underlined one; `keep === true` → three distractors,
   `keep === false` → `key` plus `noChange` plus two distractors; every reason
   ≥ 25 characters; all three domains per set; no family more than twice per
   set; and a bank-wide **NO CHANGE keep rate between 20% and 30%**. Do *not*
   apply the reading choice-length ratio — "NO CHANGE" is nine characters and
   would fail every item.
2. **Author the 40 passages**, watching the pace report the way the reading
   build did. `PASSAGE_RULES["act-english"]` already exists in
   `scripts/lib/content.js`: 250–450 words, 12–18 questions, types
   `personal-essay`, `informative-essay`, `historical-account`,
   `process-narrative`.
3. **Rewrite `scripts/generate-act-english.js`** on the model of
   `generate-act-reading.js`. Differences to plan for: **NO CHANGE is always
   choice A**, so the answer position is forced whenever an item has one, and
   the position planner can only balance the items that are free. The generated
   stem for an underlined item should be `Which choice is best for underlined
   portion N?`, which repeats within a passage only by number — so check the
   audit's `shapeSignature` handles it, since it maps digits to `#` and would
   otherwise collide every underlined item in a set. That is the fourth place
   the passage-set assumption bites; fix it the same way as the other three.
4. **Then** ACT Mathematics (clear the shapes the harness reports and ship),
   ACT Science, SAT Math, SAT Reading & Writing.

### Known divergences, deliberately not changed

- ~~The catalog gives ACT English 235 / 120 / 220…~~ **Decided 2026-08-24:
  rescale to 175 / 92 / 308** (30% / 16% / 54%), which matches how the real ACT
  weights the section. Taken now because zero English passages existed, so it
  was the cheapest it would ever be.
  **It is deliberately a two-step change.** `scripts/data/act-english/README.md`
  already carries the new arithmetic and is what authoring follows.
  `content/catalog.json` still says 235 / 120 / 220 and flips only in the commit
  that ships the rebuilt bank — `validateAll({ requireComplete: true })` in
  `scripts/lib/content.js:550` compares per-domain counts exactly, so editing
  the catalog before the bank exists makes `npm run check` fail for every lane
  until all 40 passages are written. `tests/content.test.js` needs no change:
  it asserts only that domain targets sum to `targetPerSection`, and 175 + 92 +
  308 = 575.
- `strategy` on a reading item is shared across the items with the same
  subskill. Everything a student reads about *their* question — explanation,
  steps, hint, trap — is per item. Per-item strategy lines would be 575 more
  authored sentences and are worth doing only if the shared ones start reading
  as filler.
