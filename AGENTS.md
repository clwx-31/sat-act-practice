# Instructions for AI assistants — SAT & ACT Practice site

A public, static practice-question site for the user and their friends. Live at
**https://clwx-31.github.io/sat-act-practice/** (GitHub Pages, this repo's `main`).

Part of a larger effort — full context and handoff live in the user's private
`quad` repo at `~/git/claude/quad/STATUS.md`. The user is a **CLI/git beginner**:
explain plainly, one step at a time.

## Adding or changing questions

- **`questions.js` is the only file to edit** to change the question bank. Each
  question's fields are documented at the top of that file. Keep every question
  **original** — do NOT copy real, copyrighted ACT/SAT questions.
- Currently: **SAT Math** (15 questions). Grow it by adding questions with a
  different `test` / `section` (e.g. SAT Reading & Writing, ACT English / Math /
  Science). The start screen builds its menu automatically from the data.

## Files

- `index.html` — page structure · `styles.css` — styling (light/dark aware)
- `app.js` — quiz logic (rarely needs edits) · `questions.js` — **the question bank**

## Testing & deploying

- **Test locally:** open `index.html` in a browser (no server needed). On macOS
  the user prefers Dia: `open -a Dia index.html`.
- **Validate data:** `node --check app.js` and `node --check questions.js`.
- **Deploy:** `git add -A && git commit -m "..." && git push`. GitHub Pages
  rebuilds automatically within ~1 minute. Confirm with:
  `curl -sI https://clwx-31.github.io/sat-act-practice/`.

## Rules

- **Zero personal data** in this repo — it is public. Never add grades, finances,
  or anything from the private `quad` repo.
