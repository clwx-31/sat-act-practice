# Codex lane — task queue

Read `AGENTS.md` first, especially **Two-agent lanes** and **Context hygiene**.
This file is the queue. Work tasks in order. Each one ends in a commit.

You own `scripts/*.js`, `scripts/lib/*.js`, `app.js`, `core.js`, `styles.css`,
`booklet.js`, `print.js`, `index.html`, and `tests/`. You do not own
`scripts/data/**`, `guides/**`, `docs/**`, or `README.md` — Claude is authoring
in those concurrently, and editing them causes the only merge conflicts this
setup can produce. If a task seems to require one, stop and say so.

Branch `codex-lane`, worktree `../sat-act-codex`. Do not push, merge, rebase, or
switch branches.

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
