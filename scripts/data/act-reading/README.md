# ACT Reading passages

One file per passage. `index.js` loads every `NNN-*.js` in this directory, so
adding a passage means adding a file — there is no list to keep in step.

A reading question cannot be generated from a template the way an algebra
question can: the answer has to live in a particular sentence of a particular
passage, and the distractors have to be misreadings a real student would make
of *that* passage. So passages and their questions are authored together, and
the generator's job is assembly and enforcement, not invention.

## Shape of a file

```js
module.exports = {
  id: "act-reading-p001",
  type: "literary-narrative",   // or social-science, humanities, natural-science
  title: "…",
  intro: "This passage is adapted from …",   // printed in italics, as the ACT does
  content: `…600–950 words…`,
  questions: [
    {
      subskill: "main idea",        // must exist in the catalog for act-reading
      family: "central-claim",      // groups shapes for the audit
      difficulty: "Hard",           // per docs/DIFFICULTY_CALIBRATION.md
      stem: "…",
      key: "…",
      wrong: [["…", "why a student picks it"], ["…", "…"], ["…", "…"]],
      why: "…",                     // cites the passage
      steps: ["…", "…"],
      hint: "…",
      trap: "…",                    // optional
    },
  ],
};
```

## Rules the generator enforces

- **Choices are length-matched.** The longest choice may not exceed the
  shortest by more than half again. The old bank keyed 83% of items to the
  longest, most hedged option, which made 97% of the section answerable without
  reading the passage. Every distractor must be as qualified as the key.
- **Every distractor carries a reason** naming the misreading it represents —
  a detail from the wrong paragraph, the opposite of the author's stance, a
  true statement that does not answer the question.
- **The explanation quotes or paraphrases the passage.** If it does not point
  at the text, the question is not a reading question.
- **8–12 questions per passage**, mixing the three reporting domains roughly
  5 / 3 / 2, the ACT's own proportions.
- **Passage length 600–950 words.** Paired sets hold both passages in one
  record, marked `Passage A` and `Passage B`, and carry the comparison
  subskills.

Difficulty follows `docs/DIFFICULTY_CALIBRATION.md`: Easy means the answer sits
in one place the question points at; Medium means it is distributed across a
paragraph or needs a supported inference; Hard means separated parts of the
passage must be brought together, or the author's view distinguished from a
view the author reports.

## The build plan

The bank must land on exactly 575 questions, with the catalog's domain targets
(275 Key Ideas and Details / 160 Craft and Structure / 140 Integration of
Knowledge and Ideas) and difficulty targets (175 Easy / 250 Medium / 150 Hard)
met exactly. That constrains how the passages are sized, so the arithmetic is
fixed in advance:

| Passages | Questions each | Domain split (KID / C&S / IKI) |
| --- | --- | --- |
| 30 | 10 | 5 / 3 / 2 |
| 20 | 11 | 5 / 3 / 3 |
| 5 | 11 | 5 / 2 / 4 |

**55 passages, 575 questions, 275 / 160 / 140.**

Difficulty runs about 3 Easy / 4 Medium / 3 Hard per set; `check-passages.js`
prints the running totals so the last few passages can be tuned to land on
175 / 250 / 150.

Genres follow a real test form — Literary Narrative, Social Science,
Humanities, Natural Science — roughly 14 passages each. About a quarter of the
Social Science and Natural Science slots are **paired sets**: two shorter
passages in one record, marked `Passage A` and `Passage B`, carrying the
`compare perspectives` and `synthesize information` subskills. A few Natural
Science passages append a small table or figure block to carry
`integrate table data` and `integrate graph data`.

Progress is `node scripts/check-passages.js`, which reports passages,
questions, tier counts, and domain counts, and fails on any authoring rule.
