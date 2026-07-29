# AGENTS.md — SAT & ACT Practice site

Guidance for any AI coding agent (Codex, Claude, etc.) working in this repo.

## What this project is

A **free, public, static web app** that lets the user and their friends practice
SAT and ACT questions. You pick a section, answer one multiple-choice question at
a time, and get **instant feedback plus a full explanation** and a running score.

- **No build step, no framework, no server, no dependencies.** Plain HTML, CSS,
  and vanilla JavaScript. It runs by opening `index.html` in a browser and is
  deployed as-is to GitHub Pages.
- **Live site:** https://clwx-31.github.io/sat-act-practice/
  (GitHub Pages serves this repo's `main` branch from the repo root.)
- **Repo:** https://github.com/clwx-31/sat-act-practice

Part of a larger effort — full context and handoff notes live in the user's
**private** `quad` repo at `~/git/claude/quad/STATUS.md` (not in this repo).

The user is a **CLI/git beginner**: explain plainly, one step at a time, and
avoid assuming prior tooling knowledge.

## How the code fits together

Three scripts load in order (see the bottom of `index.html`):

1. **`questions.js`** — defines a single global `const QUESTIONS = [...]`, an
   array of question objects. This is pure data. **It is the only file you edit
   to change the question bank.**
2. **`app.js`** — an IIFE (`(function () { ... })()`) holding all quiz logic. It
   reads the global `QUESTIONS` array. No exports, no modules.
3. `index.html` loads `questions.js` **before** `app.js` so the data exists when
   the logic runs.

`styles.css` is the appearance layer; it is light/dark aware via
`@media (prefers-color-scheme: dark)` and CSS custom properties (`--bg`,
`--accent`, `--correct`, `--wrong`, …).

### Three screens, one page

`index.html` contains three `<section>`s toggled by adding/removing the
`hidden` class — there is no routing:

- `#setup` — start screen. A `<select id="sectionSelect">` dropdown is built
  **automatically from the data** by `populateSections()` in `app.js`; it groups
  questions by `"<test> — <section>"` and adds an "All questions" option. You do
  **not** hand-edit this menu — add questions and it updates itself.
- `#quiz` — one question at a time: tags, question text, choice buttons, a
  "Check answer" button, then an explanation and a "Next question →" button.
- `#results` — final score, a percentage, and an encouraging message.

### app.js flow (for reference — rarely needs edits)

`populateSections()` builds the menu → `startQuiz()` filters/shuffles the pool →
`renderQuestion()` draws one question → `selectChoice()` marks a pick →
`checkAnswer()` scores it and shows the explanation → `nextQuestion()` advances
→ `showResults()`. Answer text is inserted with an `escapeHtml()` helper, so
question/choice strings are treated as plain text (safe to include `<`, `&`,
etc.). "Shuffle the question order" uses a Fisher–Yates `shuffle()`.

## The question data model

Each entry in `QUESTIONS` (in `questions.js`) is an object:

| Field         | Type          | Notes                                                        |
| ------------- | ------------- | ------------------------------------------------------------ |
| `test`        | string        | `"SAT"` or `"ACT"`                                            |
| `section`     | string        | e.g. `"Math"`, `"Reading & Writing"`, `"English"`, `"Science"` |
| `topic`       | string        | short label, e.g. `"Algebra"`, `"Geometry"`                  |
| `difficulty`  | string        | `"Easy"`, `"Medium"`, or `"Hard"`                            |
| `question`    | string        | the question text                                            |
| `choices`     | array<string> | answer options; 2–6 supported (letters A–F assigned in order) |
| `answer`      | number        | **0-based** index of the correct choice (`0` = first)        |
| `explanation` | string        | why the answer is correct; shown after answering             |

`test` + `section` together define a menu group, so a new group appears just by
adding questions with a new pairing.

## Adding or changing questions

- Edit **`questions.js` only**. Copy an existing `{ ... }` block, paste it, edit
  the fields, and keep a trailing comma after the closing `}`.
- **Every question must be ORIGINAL.** Do **not** copy real, copyrighted
  SAT/ACT questions — this repo is public. Original practice material only.
- Double-check `answer` is the correct **0-based** index and the `explanation`
  matches.
- Current bank: **SAT Math only (15 questions).** Natural next steps: SAT
  Reading & Writing, and ACT English / Math / Reading / Science. Just add
  questions with the new `test`/`section` — the UI adapts.

## Testing & deploying

- **Test locally:** open `index.html` in a browser — no server needed. On macOS
  the user prefers Dia: `open -a Dia index.html`.
- **Validate the JS parses** (catches missing commas/brackets before deploy):
  ```sh
  node --check questions.js && node --check app.js
  ```
- **Deploy** (GitHub Pages rebuilds `main` automatically within ~1 minute):
  ```sh
  git add -A && git commit -m "..." && git push
  ```
  Confirm it's live: `curl -sI https://clwx-31.github.io/sat-act-practice/`

## Files

| File           | Role                                                          |
| -------------- | ------------------------------------------------------------ |
| `index.html`   | Page structure; three toggled sections; loads the two scripts |
| `styles.css`   | Appearance, light/dark aware                                 |
| `app.js`       | Quiz logic (IIFE reading `QUESTIONS`) — rarely needs edits   |
| `questions.js` | **The question bank — edit this to add/change questions**    |
| `README.md`    | Friendly overview for humans                                 |
| `AGENTS.md`    | This file — guidance for AI agents                           |

## Rules

- **Zero personal data.** This repo is public. Never add grades, finances, real
  names, or anything from the private `quad` repo.
- Keep it **dependency-free and buildless.** Don't introduce npm, a bundler, or
  a framework — the whole point is that it runs by opening a file.
- Keep questions **original** and keep the code readable and commented for a
  beginner.
