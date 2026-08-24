# ACT English passages

One file per passage. `index.js` loads every `NNN-*.js` in this directory, so
adding a passage means adding a file — there is no list to keep in step.

ACT English is not a set of grammar questions about unrelated sentences. It is a
piece of continuous prose with portions underlined, and the student's job is to
decide, in context, whether each underlined portion should stay as it is. That
is why the answer choices begin with **NO CHANGE** and why the correct answer is
often to leave the text alone. A bank of isolated sentences is a different test.

## Shape of a file

```js
module.exports = {
  id: "act-english-p001",
  type: "personal-essay",     // or informative-essay, historical-account, process-narrative
  title: "…",
  content: `[1] First paragraph, with an {1 underlined portion} in it.

[2] Second paragraph. {7} A boxed number with no text marks the place a
non-underlined question asks about.`,
  questions: [
    {
      number: 1,                  // matches the {1 …} marker; questions run 1..N in order
      subskill: "commas",         // must exist in the catalog for act-english
      family: "comma-splice",     // groups shapes for the audit
      difficulty: "Medium",
      keep: false,                // is NO CHANGE the correct answer?
      key: "winter, and the committee",     // required when keep is false
      noChange: "why leaving it alone is wrong — 25 characters or more",
      wrong: [["…", "why a student picks it"], ["…", "…"]],   // two when keep is false
      why: "…", steps: ["…", "…"], hint: "…", trap: "…",
    },
    {
      number: 7,
      subskill: "organization",
      family: "sentence-placement",
      difficulty: "Hard",
      stem: "For the sake of logic and coherence, Sentence 4 should be placed:",
      key: "…",
      wrong: [["…", "…"], ["…", "…"], ["…", "…"]],            // three; no NO CHANGE
      why: "…", steps: ["…", "…"], hint: "…",
    },
  ],
};
```

## The two kinds of question

- **Underlined.** Carries `keep`. The passage must contain `{n text}` exactly
  once, and `text` is the portion under test. The generator builds the stem and
  puts **NO CHANGE** first, always, as the real test does. When `keep` is true
  the key is NO CHANGE and `wrong` holds three alternatives; when it is false
  the key is `key`, `noChange` gives the reason the original fails, and `wrong`
  holds two further alternatives.
- **Non-underlined.** Carries its own `stem` and three distractors, and no NO
  CHANGE. These are the rhetorical questions: what a paragraph is for, where a
  sentence belongs, whether to add or delete something, whether the essay met a
  stated goal.

  A non-underlined question comes in two kinds, and they are marked differently:

  - **Point-specific** — it asks about one place in the text, such as adding a
    sentence here or opening this paragraph. Mark that place with a bare `{n}`.
  - **Whole-essay** — it asks about the essay as a whole: whether a stated goal
    was met, where a paragraph belongs, whether a closing clause earns its keep.
    These carry **no marker**, because on the real test they have no location;
    they are printed after the passage. Number them **last in the set**, so
    every marker that does exist still runs in passage order.

## Rules the generator enforces

- Question numbers run 1..N in order, and markers appear in the passage in the
  same order.
- Every distractor carries a reason, of 25 characters or more, naming the error
  it represents — a comma splice, a shifted tense, a modifier attached to the
  wrong noun, a redundancy the sentence already contains.
- **NO CHANGE must be right often enough to be worth considering.** Across the
  bank the keep rate has to land between 20% and 30%, which is where the real
  test sits. The rate is `keeps / underlined questions` — non-underlined
  rhetorical questions have no NO CHANGE choice and are not in the denominator. A bank where NO CHANGE is never correct teaches students to ignore
  it, and a bank where it is usually correct teaches them to pick it.
- Passage length 250–450 words, 12–18 questions per passage.
- Every set reaches all three reporting domains.
- No family may appear more than twice in one set.

Difficulty follows `docs/DIFFICULTY_CALIBRATION.md`: Easy means one rule
applies and the sentence makes the trigger visible; Medium means the rule
depends on something further away in the sentence, or two rules compete; Hard
means the student has to work out what the sentence is trying to do before the
rule can be applied at all.

## The build plan

The bank must land on exactly 575 questions with the difficulty targets
(175 Easy / 250 Medium / 150 Hard) and the domain targets **175 Production of
Writing / 92 Knowledge of Language / 308 Conventions of Standard English** —
30% / 16% / 54%, which is how the real ACT weights the section.

> `content/catalog.json` still carries the old 235 / 120 / 220 split. Author
> against the numbers in this table, not against the catalog. The catalog flips
> to 175 / 92 / 308 in the same commit that ships the rebuilt bank, because
> `npm run check` enforces per-domain counts exactly and changing the catalog
> any earlier turns the gate red for every lane until all 40 passages exist.

That fixes the arithmetic in advance:

| Passages | Questions each | Domain split (PoW / KoL / CSE) |
| --- | --- | --- |
| 12 | 16 | 5 / 3 / 8 |
| 3 | 15 | 5 / 2 / 8 |
| 13 | 14 | 4 / 2 / 8 |
| 12 | 13 | 4 / 2 / 7 |

**40 passages, 575 questions, 175 / 92 / 308.** Every set stays inside the
12–18 question rule in `PASSAGE_RULES`.

Progress is `node scripts/check-passages.js act-english`, which reports
passages, questions, tier counts, domain counts, and the NO CHANGE keep rate,
and fails on any authoring rule.
