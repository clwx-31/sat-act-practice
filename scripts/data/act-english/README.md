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
  stated goal. Mark the place with a bare `{n}` when the question asks about a
  particular point in the text.

## Rules the generator enforces

- Question numbers run 1..N in order, and markers appear in the passage in the
  same order.
- Every distractor carries a reason, of 25 characters or more, naming the error
  it represents — a comma splice, a shifted tense, a modifier attached to the
  wrong noun, a redundancy the sentence already contains.
- **NO CHANGE must be right often enough to be worth considering.** Across the
  bank the keep rate has to land between 20% and 30%, which is where the real
  test sits. A bank where NO CHANGE is never correct teaches students to ignore
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

The bank must land on exactly 575 questions with the catalog's domain targets
(235 Production of Writing / 120 Knowledge of Language / 220 Conventions of
Standard English) and difficulty targets (175 Easy / 250 Medium / 150 Hard).
That fixes the arithmetic in advance:

| Passages | Questions each | Domain split (PoW / KoL / CSE) |
| --- | --- | --- |
| 20 | 14 | 6 / 3 / 5 |
| 5 | 14 | 5 / 3 / 6 |
| 15 | 15 | 6 / 3 / 6 |

**40 passages, 575 questions, 235 / 120 / 220.**

Progress is `node scripts/check-passages.js act-english`, which reports
passages, questions, tier counts, domain counts, and the NO CHANGE keep rate,
and fails on any authoring rule.
