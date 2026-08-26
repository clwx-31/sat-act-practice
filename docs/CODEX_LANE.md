# Codex lane — task queue

Read `AGENTS.md` first, especially **Two-agent lanes** and **Context hygiene**.
This file is the queue. Work tasks in order. Each one ends in a commit.

You own `scripts/*.js`, `scripts/lib/*.js`, `app.js`, `core.js`, `styles.css`,
`booklet.js`, `print.js`, `index.html`, and `tests/`. You do not own
`scripts/data/**`, `guides/**`, `docs/**`, or `README.md` — Claude is authoring
in those concurrently, and editing them causes the only merge conflicts this
setup can produce. If a task seems to require one, stop and say so.

Branch `codex-lane`, worktree `../sat-act-codex`. Do not push, rebase, or switch
branches.

**Standing authorisation for one merge only:** you may run `git merge --no-ff main`
whenever you need main's work, without asking each time. `--ff-only` will keep
failing because both branches carry real commits, and that failure is expected
rather than a problem to report. The lanes own disjoint paths, so these merges
are clean; the only file both lanes have ever edited is
`docs/QUESTION_QUALITY_HANDOFF.md`, which is why your reports now go to
`docs/CODEX_REPORTS.md`. If that file does conflict, keep both sides. No other
merge, and no push, is authorised.

---

## Task 1 — per-section rules in `scripts/check-passages.js`

**Why first:** Claude is authoring ACT English passages right now and has no way
to verify them until this exists. It is small and it unblocks the other lane.

`scripts/check-passages.js` currently hard-codes ACT Reading: `SOURCES` has one
entry, `checkQuestion` applies the reading choice-length-ratio rule, and the
pace report is reading-shaped. Split the per-section rules apart so a section
registers its own, then add ACT English.

The ACT English authoring contract is `scripts/data/act-english/README.md` —
read it; it is the specification. Rules to enforce:

- Question `number`s run `1..N` and their `{n …}` markers appear in passage
  order.
- `{n text}` appears exactly once per underlined question. A non-underlined
  question uses a bare `{n}` marker.
- `keep === true` → three distractors. `keep === false` → `key`, plus a
  `NO CHANGE` choice, plus two distractors.
- Every distractor reason is at least 25 characters.
- All three reporting domains appear in every set.
- No `family` appears more than twice in one set.
- Bank-wide **NO CHANGE keep rate between 20% and 30%**.
- **Do not apply the reading choice-length-ratio rule.** `NO CHANGE` is nine
  characters and would fail every item that has one.

Domain totals for the pace report are **175 Production of Writing / 92 Knowledge
of Language / 308 Conventions of Standard English**, which is what the README
says. This intentionally differs from `content/catalog.json`, which still reads
235/120/220 and flips only when the rebuilt bank ships — see the decision note
in `docs/QUESTION_QUALITY_HANDOFF.md`. Take the numbers from the README.

`PASSAGE_RULES["act-english"]` already exists in `scripts/lib/content.js`:
250–450 words, 12–18 questions, types `personal-essay`, `informative-essay`,
`historical-account`, `process-narrative`.

**Done when** `node scripts/check-passages.js act-reading` still passes
unchanged, `node scripts/check-passages.js act-english` runs against the
passages then present and reports rather than throwing, and `npm run check`
passes.

---

## Task 2 — clear the ACT Mathematics shape phrasings

The generator is fully rewritten; its output has never shipped because it fails
the validator's near-duplicate rule. Get the live list — do not trust any count
written down anywhere, including here:

```sh
npm run check:shapes -- act-mathematics 2>&1 | tail -40
```

Each failure reads `reuses N and M overlap 100%`: a shape rotates through too
few phrasings, so a later reuse repeats an earlier one. Because tokens are words
of more than two characters, one- and two-digit numbers are invisible to the
rule — `3x + 5 = 26` and `4x + 7 = 31` are the same question to the validator.
Only wording and setting distinguish two uses.

The fix per shape is one of two, per `docs/QUESTION_QUALITY_HANDOFF.md`:

- **Algebra shapes**, no real-world setting: extend `choose(variant, [...])`
  from four phrasings to **eight**, each carrying a word the others lack —
  `Given`, `Suppose`, `Assume`, `Determine`, `Which`, `When`, `Let`, `Take`.
  The expression contributes almost no tokens, so the short frame is what
  separates them.
- **Word problems**: draw a setting with `scene(variant, POOL)` from
  `scripts/lib/scenes.js` and phrase around it. Eight settings × four phrasings
  is ample, and it is also what makes the bank read like a real test instead of
  one scenario wearing different numbers.

Work one shape family per commit. The harness sweeps 1,200 sequences — do not
narrow it; it was 24 until 2026-08-18 and missed shapes that only collapse
around sequence 175.

**Done when** `npm run check:shapes -- act-mathematics` reports zero problems.
Do not rebuild or ship the bank in this task; `content/banks/` is shared and
shipping is a separate step taken with the user.

---

## Task 3 — rebuild ACT Mathematics and prove it

Task 2 is complete: `npm run check:shapes -- act-mathematics` reports
**232 shapes exercised over 1200 sequences: clean.** The generator can now fill
the bank without tripping the validator's near-duplicate rule, and nothing has
been rebuilt yet.

```sh
node scripts/generate-act-mathematics.js --rebuild
npm run build:content
npm run check
npm run audit:questions 2>&1 | tail -30
npm run check:difficulty 2>&1 | tail -20
```

`--rebuild` is required. Without it the generator only tops up to the target and
keeps the existing items, which is the opposite of what this task is for.

This task writes to `content/banks/act-mathematics.json` and
`content/generated/act-mathematics.js`, which are shared files. That is expected
here — say so in the commit body. **Commit both**; the bank is canonical and the
generated file is its build product, and they must never diverge.

Nothing reaches the live site from this branch. `codex-lane` is not deployed;
GitHub Pages serves `main`, and merging is the user's decision.

**Done when** `npm run check` passes, `npm run audit:questions` reports
act-mathematics as **PASS**, and `npm run check:difficulty` counts act-mathematics
among the sections with meaningful difficulty labels. Report all three numbers.

Two things to expect rather than chase:

- **Five legacy items survive `--rebuild`** — those with
  `provenance.generator === "legacy-migration"`. They carry the old boilerplate
  rationales. Leave them; replacing them is a separate decision.
- **The schema requires exactly four choices.** Real ACT Mathematics uses five.
  That is a known fidelity gap recorded in the handoff, not a bug to fix here:
  changing it means changing the validator, the app, and the booklet renderer
  together.

If the audit does **not** reach PASS, stop and write what failed into
`docs/QUESTION_QUALITY_HANDOFF.md` rather than loosening a gate to get past it.

---

## Task 4 — SAT Math shapes

The largest remaining generator job: 48 subskills, none converted, roughly twice
the size of ACT Mathematics.

`scripts/generate-sat-math.js` holds an unfinished rewrite from `09dd729`. It
exports `context`, `formatNumber`, and `mathQuestion` but **no `SHAPES`**, so
`node scripts/check-shapes.js sat-math` throws today. That is the starting
condition, not a bug — the harness throws on every section except
`act-mathematics` for the same reason.

Build it the way ACT Mathematics is built. `scripts/generate-act-mathematics.js`
is the worked example and it now passes the harness, so copy its structure
rather than inventing one. Every shape needs `family:`, difficulty-aware
branches for all three tiers, five or six `wrong` entries with reasons of 12
characters or more, at least two `steps` and one `principle`, U+2212 for every
minus sign, and eight phrasings or eight `scene()` settings so reuses stay under
the 0.90 overlap rule.

Work one subskill per commit. Do not rebuild the bank in this task.

**Done when** `npm run check:shapes -- sat-math` runs without throwing and
reports zero problems across all 48 subskills.

---

## Task 5 — cross-shape collisions (supersedes the rest of Task 3)

Your Task 3 report was correct and the stop was the right call. The diagnosis is
in `docs/QUESTION_QUALITY_HANDOFF.md` under **"Why the ACT Mathematics rebuild
failed the audit"** — read it first. The short version:

`check-shapes` compares each shape against **its own reuses only**. It reports
232 shapes clean while 137 of 575 items sit in a near-duplicate pair, because
**225 of the 296 pairs are between two *different* subskills**. Task 2's eight
shared frames (`Given`, `Suppose`, `Assume`, …) are the likely cause: the
validator drops tokens of two characters or fewer, so a bare algebra stem is
almost all frame, and shapes from different subskills now open identically.

Two pieces of work, in this order:

**5a. Make the harness see it.** Extend `scripts/check-shapes.js` to compare
every emitted stem against every other emitted stem across all shapes in the
section, applying the same Jaccard ≥ 0.90 rule as `duplicateErrors`, and report
the colliding pairs with both subskill names. Today it only sweeps within a
shape. Confirm the extended harness reproduces the failure — it should report
roughly 296 pairs, not zero. **A harness that still reports clean has not been
extended correctly**, and that check is the whole point of this step.

**5b. Give each subskill its own phrasing.** Do not add more shared frames; that
is what caused this. Each subskill needs wording no other subskill uses —
subskill-specific verbs, nouns naming the object under test, and where a setting
fits, a `scene()` pool reserved to that subskill. The heaviest clusters to start
with are `notation` (which collides with five other subskills), `linear
equations`, `exponents`, and `transformations`.

**Done when** the extended harness reports zero cross-shape collisions and
`node scripts/generate-act-mathematics.js --rebuild` followed by
`npm run build:content` completes without the near-duplicate stop.

Leave the rebuilt bank uncommitted until then, and do not run the audit as a way
of deciding whether to proceed — 5a's harness is the gate now.

Note: the 45.7% answerable-without-reading figure is a **separate** problem. Do
not try to fix it in this task.

---

## Task 6 — rebalance answer positions inside each difficulty tier (do this first)

**Priority: ahead of Task 5.** This is small, mechanical, and it fixes what the
live site serves today. The diagnosis is in `docs/QUESTION_QUALITY_HANDOFF.md`
under **"Answer positions are balanced per bank but skewed per tier."**

Every bank is a clean 25/25/25/25 overall. Inside each difficulty tier,
act-english, act-mathematics, and act-science all sit at roughly:

```
Easy    21/18/46/15      Medium   3/43/22/33      Hard   67/4/6/23
```

A student drilling Hard sees the key at A two thirds of the time. That is a
pattern worth more than the content is.

Write `scripts/rebalance-answers.js`, taking a section key and operating on the
committed bank in place:

- Group items by `difficulty`, then within each tier reassign target positions so
  each of A/B/C/D lands within one item of a quarter of that tier.
- For each item, permute the `choices` array to move the key to its assigned
  position, then update **`correctAnswer`** (a 0-based index into `choices`) and
  the **`index`** field of every entry in `distractorRationales`, which is also a
  0-based index into `choices`. A rationale must stay attached to the choice it
  describes — verify by text, not by position, before and after.
- Skip items that do not have exactly four choices, and skip
  `content/banks/act-writing.json`, which has no multiple-choice items.
- Be deterministic: same input, same output. Seed from the section key.

Then apply it to **act-english, act-mathematics, and act-science**, run
`npm run build:content`, and commit banks and generated files together.

**Done when**, for all three sections, no position exceeds 30% in any tier, and
`npm run check` still passes. Re-measure with a script rather than trusting the
audit alone, and report the nine before/after numbers.

> **The bank half of this task is already done on `main`.** Your
> `rebalance-answers.js` was verified from the other lane and then applied there
> to **act-english, act-mathematics, act-science, and also sat-math**, followed by
> `npm run build:content`. Every section now sits at or below **25.6%** for its
> worst answer position in any difficulty tier, except sat-reading-writing at
> 29.1%, which was already inside the guard. `npm run check` passes.
>
> **Do not apply it again.** Merge `main`, drop any local bank changes from this
> task, and do only the guard described below. Your script itself is not on
> `main` — it arrives when `codex-lane` merges, and the transformation is
> recorded in the commit that applied it.

sat-math was not in the original task list because it was under the audit's 40%
threshold, but its Easy tier sat at 36% B, which fails the 30% guard. It was
rebalanced for that reason.

**Then add the guard.** After the three banks are committed, add a per-tier
answer-position check to `npm run check` that fails if any position exceeds 30%
within any difficulty tier of any section. Without it, the next regenerated bank
reintroduces the skew silently — ACT English, ACT Mathematics, and ACT Science
are all scheduled for regeneration, and only `generate-act-reading.js` currently
balances within tier.

Two cautions:

- **Do not touch act-reading.** It is already 25/25/25/25 in every tier and is
  the model this task is copying.
- **Do not regenerate any bank.** This task permutes existing items only. If a
  generator runs, the authored content changes and the task has overreached.

---

## Task 7 — rebuild ACT Mathematics and ship it

Everything that blocked this is now done. Verified from the other lane on
`codex-lane` at `daeb05c`: `check:shapes` reports **232 shapes clean over 1200
sequences**, cross-shape collision detection exists and passes,
`check-answer-positions.js` is wired into `npm run check`, and
`scripts/lib/generation.js` balances answer positions at generation time so a
rebuild cannot reintroduce the per-tier skew.

This is the run that has failed twice. Do it in one sitting:

```sh
git merge --no-ff main
node scripts/generate-act-mathematics.js --rebuild
npm run build:content
npm run check
npm run audit:questions 2>&1 | tail -30
npm run check:difficulty 2>&1 | tail -20
node scripts/check-answer-positions.js
```

`--rebuild` is required; without it the generator only tops up and keeps the old
items.

**Report five numbers:** near-duplicate rate, distinct shapes, largest family
share, answerable-without-reading, and the worst answer position in any tier.
The audit targets are near-dup under 2%, no family over 10%, longest-is-key
under 40%, answerable-without-reading under 40%.

**The one that may still fail is answerable-without-reading.** It measured 45.7%
against a 40% target and is a *separate* problem from the duplicates — it means
an item can be guessed from its choices alone. Nothing done so far addresses it.
If everything else passes and only this fails, **stop and report**; do not
loosen the threshold and do not start rewriting content to chase it. That is a
content decision, not a generator one.

Expect and do not chase: five `legacy-migration` items survive `--rebuild`, and
the schema's four-choice limit against the real ACT's five is a known fidelity
gap recorded in the handoff.

**Done when** `npm run check` passes, the audit reports act-mathematics **PASS**,
and both banks are committed together. If it passes, that is the third of seven
sections finished and the first new one since ACT Reading.

---

## Task 8 — fix the blind-score tie bug, then close the last duplicates

Your Task 7 report was right and stopping was right. One of the two failures is
a bug in the measurement; the other is real.

**8a. Fix `blindScore` in `scripts/audit-questions.js`.** Its longest-option
branch counts a hit whenever `lengths[correctAnswer] === longest`, which is true
whenever **all four choices are the same length** — the normal case for numeric
maths choices such as `12`, `15`, `18`, `21`. A student applying "take the
longest" to four equal-length options has nothing to go on and would score at
chance.

`longestChoiceIsKey`, twenty lines earlier in the same file, already requires
`lengths.filter((l) => l === longest).length === 1` before counting a hit. Apply
the same condition in `blindScore`. When the longest length is tied, the blind
student should score at chance across the tied options rather than automatically
succeeding.

On the rebuilt ACT Mathematics bank the 47.1% is 46 items from recalled choice
sets, 225 from the longest-choice rule, and **81 of those 225 have all four
choices the same length**. Removing the artefact gives **33.0%**, which passes.
Re-run the audit and confirm that figure; add a test so the tie case cannot
regress.

**8b. Close the remaining duplicates.** Near duplicates at 4.5% (26 items) and
the 8.0% of items whose sorted choice set has appeared before are the same
problem seen twice. The choice-set repeat is the sharper signal — two items with
identical option sets are the same question however the stem is worded — so use
it to find the shapes still colliding, and extend those the way Task 5b
extended the others.

**Done when** the audit reports act-mathematics **PASS** on every metric, with
no threshold changed. If near-duplicates will not come under 2% without
loosening something, stop and report rather than adjusting the target.

---

## Task 9 — ACT Science: the two tells

ACT Science is **one metric from PASS**. Everything else is already clean: 0
exact duplicates, 0 near duplicates, largest family 0.2%, answer positions
25.1 / 25.2 / 25.3 across the tiers, difficulty mix exactly 175 / 250 / 150. The
single failure is answerable-without-reading at **77.9%** against a 40% target,
the worst figure in the project.

Measured from the other lane, that 77.9% is two separate defects:

| Driver | Items | Share |
| --- | ---: | ---: |
| Choice set already seen, same key | 339 | **59.0%** |
| Key is the longest option | — | 19.0% |
| (key strictly longest, no tie) | 229 | 39.8% |

**9a. Repeated choice sets — 339 items.** The same four options recur across the
bank with the same answer, so a student who has met the set before recalls the
key without reading. This is the defect you took from 49 to 0 in ACT Mathematics
under Task 8b; apply the same treatment. It is the larger half by far and worth
doing first.

**9b. The length tell.** The key averages **43.8 characters** and the distractors
**29.7**. The median winning option is **27 characters longer** than its nearest
rival. A student who simply picks the longest option is right 39.8% of the time
without reading anything.

Distractors have to be written at the length of the key. A wrong answer that is
obviously too short to be the careful one is not a distractor, it is a spacer.
Where the generator builds a correct answer as a full explanatory clause and the
wrong ones as fragments, the wrong ones need the same grammatical weight.

**Done when** `npm run audit:questions` reports act-science **PASS**, with no
threshold changed. Report the same five numbers as Task 7.

Do not chase the separate content defects logged in the handoff — the
tautological items, the swapped-row distractor pairs, and the `type: "graph"`
items that render a table. Those are real and they are a different job.

---

## Task 10 — SUPERSEDED. SAT Math does need the generator work

**This task was scoped wrongly and Codex was right to stop.** It said SAT Math
looked mechanical because a stem-level sweep found one near-duplicate pair. That
sweep was the wrong instrument. Reproducing the audit's own `shapeSignature` —
which strips the scene preamble, every proper noun and every digit before
comparing — gives:

```
sat-math distinct shapes: 144 of 575   items sharing a shape: 85.7%
  x18  exponent rules|in the product x^# · x^# = x^k, what is k?
  x18  rational expressions|for x ≠ #, (x² − #)/(x − #) is equivalent to x + k. is k?
  x18  quadratic equations|what is the positive solution to x² = #?
```

Eighteen items asking the same question with different numbers are eighteen
different strings and one question. Textual comparison cannot see that; the
audit can. **Go to Task 4.** The blocker Codex hit — Medium unit conversion
having no shapes — is the same finding from the other direction: the generator
cannot rebuild because the shapes do not exist yet.

Nothing below about the choice sets is wrong, but it is a consequence rather
than the cause. Repeated choice sets follow from repeated shapes, and building
real shapes fixes both.

### The original text, kept for the record



**Do not start the Task 4 generator rewrite.** Measured from the other lane, SAT
Math does not look like a section that needs one. Of its 458 four-choice items
(the rest are grid-ins):

| Signal | SAT Math |
| --- | --- |
| Repeated choice set, same key | **210 items, 45.9%** |
| Key strictly longest | 11 items, 2.4% |
| Average key vs distractor length | 1.8 vs 2.0 characters |
| Near-duplicate stem pairs | **1** |

There is no length tell and the stems are effectively clean. Nearly the whole
failure is the defect you have now fixed twice: the same option set recurring
with the same answer, so a student who has met it recalls the key.

Apply the ACT Science freshness treatment. Start there and re-audit before doing
anything else — this may be most of the job.

The audit also reports a near-duplicate failure for sat-math. My stem-level
measurement finds one pair, so the audit is counting a different signature;
check what `shapeSignature` is keying on for this section before assuming the
stems need work.

**Done when** `npm run audit:questions` reports sat-math **PASS** with no
threshold changed. Report the same five numbers.

If it does not reach PASS on the choice sets alone, stop and report what remains
rather than starting the generator rewrite in the same sitting.

---

## Task 11 — SAT Reading & Writing (the real rebuild, do not start yet)

This one genuinely is a rebuild, and the numbers say so:

| Signal | SAT Reading & Writing |
| --- | --- |
| Repeated choice set, same key | 310 items, 53.9% |
| Key strictly longest | 167 items, 29.0% |
| Average key vs distractor length | 51.5 vs 40.2 characters |
| **Near-duplicate stem pairs** | **16,900** |

Sixteen thousand nine hundred near-duplicate stem pairs is a different order of
problem from anything fixed so far — the stems themselves are overwhelmingly the
same. On top of that sit the content defects already logged in the handoff: 25
items whose keyed answer is ungrammatical, 29 whose explanation describes a
different question, 40 that ask one thing in the stimulus and another in the
stem, and roughly 87 article-agreement errors.

Do not begin this until SAT Math is finished and merged. When it starts it will
need a plan first, written into `docs/CODEX_REPORTS.md`, not a direct attack on
the generator.

---

## Task 12 — rebuild SAT Math and audit it

Task 4 is done: 48 of 48 subskills implemented, 309 shapes exercised over 1,200
sequences, harness clean, nothing rebuilt. This is the run that turns that into
a bank.

```sh
git merge --no-ff main
node scripts/generate-sat-math.js --rebuild
npm run build:content
npm run check
npm run audit:questions 2>&1 | sed -n '/== sat-math/,/^==/p'
npm run check:difficulty 2>&1 | tail -20
node scripts/check-answer-positions.js
```

**Report the five numbers:** near-duplicate rate, distinct shapes, largest family
share, answerable-without-reading, and the worst answer position in any tier.

**The number that matters most is distinct shapes.** The committed bank has
**144 distinct shapes across 575 items — 85.7% of items share a shape with
another**, which is the defect this whole task exists to fix. With 309 shapes
built and three difficulty tiers each, the rebuild should land far above 144. If
it does not, the shapes are not reaching the bank and that is worth stopping for,
whatever the other metrics say.

Watch for the choice-set repetition that ACT Math and ACT Science both had: SAT
Math measured **210 items (45.9%) sharing a choice set with an earlier item**
before the rebuild. The freshness technique you used twice should carry over.

`generation.js` now balances answer positions at generation time, so the per-tier
gate should pass without intervention. If it does not, that is a regression in
the generator rather than something to fix in the bank.

**Done when** `npm run check` passes, the audit reports sat-math **PASS**, and
both the bank and its generated file are committed together. That would be five
of seven sections finished, leaving only SAT Reading & Writing and the ACT
English rebuild in the other lane.

---

## Task 13 — assemble the authored ACT English passages (HIGHEST VALUE REMAINING)

**Do this before anything else once Task 12 lands, and before SAT Reading &
Writing.** `scripts/generate-act-english.js` still contains the old template
generator and has **zero references** to `scripts/data/act-english/`. Forty
authored passages and 575 questions exist and reach nothing. Until this runs,
the site serves the old bank and the entire English rebuild is invisible.

Rewrite it on the model of `scripts/generate-act-reading.js`, which does exactly
this job for Reading: it assembles authored sets into bank records rather than
generating anything. Read that file first.

**Four things differ from Reading, and each has bitten before:**

1. **NO CHANGE is always choice A.** For every underlined item the answer
   position is forced, so the position planner can only balance the
   non-underlined rhetorical questions. Do not try to balance the underlined
   ones; report the resulting distribution instead. `check-answer-positions.js`
   will need to know that act-english is a special case, or it will fail on a
   bank that is correct.

2. **The generated stem for an underlined item repeats by number.** Something
   like `Which choice is best for underlined portion 7?` differs from item 3 in
   the same passage only by a digit — and `shapeSignature` maps digits to `#`,
   so every underlined item in a set collapses to one shape. Anchor on
   `passageId`, the same fix already applied in `duplicateErrors`,
   `exactSignature` and `check-difficulty.js`. **This is the fourth place the
   passage-set assumption bites.**

3. **`strategy` is per-subskill, everything else is per-item.** Reading uses a
   25-entry table in its generator because the fastest reliable approach to a
   given item type genuinely is the same every time. Do the same here.
   `explanation`, `solutionSteps`, `hint` and `trap` all come from the authored
   question.

4. **The catalog flip happens in this commit.** `content/catalog.json` still
   gives ACT English 235 / 120 / 220. The authored bank is built to
   **175 / 92 / 308**. `validateAll({requireComplete: true})` compares per-domain
   counts exactly, so the catalog change and the new bank must land together or
   `npm run check` fails. `tests/content.test.js` needs no change — it asserts
   only that the domain targets sum to `targetPerSection`, and 175 + 92 + 308 =
   575.

Run `node scripts/check-passages.js act-english` first. It enforces the
authoring rules this script is entitled to assume, and it currently reports
clean.

**Done when** `npm run check` passes, `npm run audit:questions` reports
act-english, and the bank, the generated file and the catalog are committed
together. Report the five numbers and the answer-position distribution.

---

## Task 14 — SAT Reading & Writing: write a plan, do not start the rebuild

Only if credits remain after Task 13. This section has **16,900 near-duplicate
stem pairs**, a 29% longest-key tell, and the content defects logged in the
handoff — 25 ungrammatical keys, 29 explanations describing a different
question, 40 stimulus/stem mismatches, ~87 article-agreement errors.

It cannot be finished in a short sitting, and a half-finished attempt is worse
than none because it leaves the bank in a state nobody can reason about. Write a
plan into `docs/CODEX_REPORTS.md` covering what the 16,900 pairs actually are —
run the audit's `shapeSignature` and count distinct shapes, as was done for SAT
Math — and stop there.

---

## Task 15 — SAT Reading & Writing: build the harness AND the assembler first

**Both, before the authoring starts.** ACT English proved the failure mode: its
harness was built up front and worked, its assembler was left to the end, and
575 finished questions sat unreachable for two days because the one file that
could publish them had not been written. Do not repeat that.

The contract is `scripts/data/sat-reading-writing/README.md`. Read it first.

**15a. Extend `scripts/check-passages.js` for sat-reading-writing.** The section
rules are in the README. The one that matters and is not like any existing
check: **every passage must be distinct after proper nouns and digits are
stripped.** The shipped bank passes a plain distinctness test — all 565 stimuli
are different strings — and fails this one, because twenty-one of them are the
same sentence with the town and the name swapped. Use the audit's
`shapeSignature` treatment: strip `\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*` and
`\b\d+(?:\.\d+)?\b`, then compare.

**15b. Write `scripts/generate-sat-reading-writing.js` as an assembler**, on the
model of `generate-act-english.js`, which you have just written. Differences:
one passage per item rather than a shared passage set, four choices with no NO
CHANGE, so answer positions are freely balanceable across every item and the
per-tier gate applies normally with no special case.

Test both against whatever items exist in `scripts/data/sat-reading-writing/`
when you get there — there will be a small number. The assembler should build a
partial bank without error and refuse to overwrite the shipped bank until the
section is complete. Do **not** rebuild `content/banks/sat-reading-writing.json`
yet; 575 authored items do not exist.

**Done when** `node scripts/check-passages.js sat-reading-writing` reports on
the authored items without throwing, and the assembler runs end to end on a
partial set. Report both.

## Where to write reports

Write failure reports and findings to `docs/CODEX_REPORTS.md`, not to
`docs/QUESTION_QUALITY_HANDOFF.md`. The handoff is edited continuously in the
other lane and concurrent edits to it are the one merge conflict this setup can
produce. Create the file if it does not exist.

---

## Commands

```sh
npm run check                              # must pass before any commit
npm run check:shapes -- act-mathematics
node scripts/check-passages.js act-english
npm run validate:content                   # read-only, safe while the other lane works
```

Pipe anything that can produce a long report through `tail`.
