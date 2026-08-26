# SAT Reading and Writing items

One file per batch of items. `index.js` loads every `NNN-*.js` in this
directory, so adding a batch means adding a file — there is no list to keep in
step.

## Why this section is authored

The shipped bank has **410 distinct shapes across 575 items**. All 565 stimuli
are distinct strings, so the validator passes them, but twenty-one of them are
this sentence:

> While documenting a **lending library of games** in **Hazel Field**, the
> internship taught **Zara** to catalog samples, operate a scanner, and ______.

with the project, the town and the name swapped. On a section where the sentence
is the thing being tested, that tests one sentence twenty-one times.

A template cannot fix it. The answer has to sit in a particular sentence, and
the distractors have to be plausible misreadings of *that* sentence, which is
the same reason ACT Reading and ACT English are authored.

## Format

The digital SAT gives every question its own short passage. One passage, one
question, 25 to 80 words, four choices, no NO CHANGE. That keeps the unit of
work small: this is 575 short pieces rather than 40 long ones.

```js
module.exports = {
  id: "sat-rw-b001",
  title: "…",                       // batch label, for the pace report only
  items: [
    {
      id: "sat-rw-0001",
      subskill: "parallel structure",   // must exist in the catalog
      family: "verb-series",            // groups shapes for the audit
      difficulty: "Medium",
      passage: `…25 to 80 words, ending in ______ for a completion item…`,
      stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
      key: "…",
      wrong: [["…", "why a student picks this"], ["…", "…"], ["…", "…"]],
      why: "…", steps: ["…", "…"], hint: "…", trap: "…",
    },
  ],
};
```

## Rules the harness enforces

- **Passage 25–80 words**, and every passage in the section distinct **after
  proper nouns and digits are stripped**. That second clause is the whole point:
  the current bank passes a plain distinctness test and fails this one.
- Exactly three `wrong` entries, each with a reason of 25 characters or more
  naming the misconception.
- A completion item's passage ends in `______`; a question about the passage
  does not.
- Every subskill in the catalog is used, and no `family` exceeds 2% of the
  section.
- At least two `steps` and a `hint` per item.

## Targets

575 items on the catalog's existing domain targets, which already match the real
test and need no rescaling:

| Domain | Target | Share |
| --- | ---: | ---: |
| Information and Ideas | 150 | 26% |
| Craft and Structure | 160 | 28% |
| Expression of Ideas | 115 | 20% |
| Standard English Conventions | 150 | 26% |

Difficulty targets are the section standard: 175 Easy, 250 Medium, 150 Hard.

Batches of 25 items give 23 files. Each batch should mix domains rather than
grouping by subskill, so that a batch abandoned halfway leaves the section
balanced rather than lopsided.

Progress is `node scripts/check-passages.js sat-reading-writing`.
