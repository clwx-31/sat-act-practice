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

## Commands

```sh
npm run check                              # must pass before any commit
npm run check:shapes -- act-mathematics
node scripts/check-passages.js act-english
npm run validate:content                   # read-only, safe while the other lane works
```

Pipe anything that can produce a long report through `tail`.
