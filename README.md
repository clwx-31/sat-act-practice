# SAT & ACT Practice

A free, public practice site for SAT and ACT questions — built to help me and
my friends get better test scores. Every question is **original** practice
material (safe to publish; not copied from real, copyrighted exams).

**Live site:** _(added once GitHub Pages is turned on)_

## How it works

Open the site, choose what to practice, and answer one question at a time. After
each answer you get instant feedback and a full explanation, plus a running
score.

## Adding or editing questions

Everything lives in **`questions.js`** — that's the only file you edit to change
the question bank. Copy an existing question block, paste it, and edit the
fields. The comments at the top of that file explain each field.

Currently: **SAT Math** (15 questions). ACT and other sections come next by
adding questions with a different `test` / `section`.

## Files

| File           | What it is                                        |
| -------------- | ------------------------------------------------- |
| `index.html`   | The page structure                                |
| `styles.css`   | Appearance (works in light and dark)              |
| `app.js`       | Quiz logic — you rarely need to touch this        |
| `questions.js` | **The question bank — edit this to add questions**|

## Viewing it locally

Just open `index.html` in a browser (no server needed). On a Mac:

```sh
open -a Dia index.html
```
