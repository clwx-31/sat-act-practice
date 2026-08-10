# AGENTS.md — repository guidance

## Project boundaries

This repository is a public, dependency-free SAT/ACT practice site deployed as
static files from the repository root. Preserve plain HTML, CSS, and vanilla
JavaScript; do not add a framework, runtime server, paid service, or package
dependency without explicit approval.

Never add personal data, credentials, official test questions, commercial
question-bank material, or close imitations of copyrighted questions. All
practice content must be original and self-contained.

GitHub Pages serves `main`. Do not push or deploy unless the user explicitly
authorizes it. Keep generated caches, local browser profiles, and
machine-specific files out of Git.

## Read before changing content

1. `README.md`
2. `docs/OFFICIAL_STRUCTURE.md`
3. `content/schema.md`
4. `docs/CONTENT_AUTHORING.md`
5. `content/catalog.json`

Canonical questions are JSON arrays in `content/banks/`. The files in
`content/generated/` are build products needed by the static browser app.
Never hand-edit generated banks or restore the retired `questions.js` model.

The catalog defines stable section keys, official taxonomy, allowed response
types and calculator policies, difficulty targets, and exact domain targets.
Keep records within that manifest unless an official-source review justifies a
documented catalog change.

## Application architecture

- `index.html`: semantic views for setup, quiz, results, progress, and review.
- `styles.css`: responsive light/dark design and visible keyboard focus.
- `app.js`: lazy section loading, DOM interaction, local progress, and feedback.
- `core.js`: pure filtering, scoring, session, analytics, and recommendation
  functions shared with Node tests.
- `content/catalog.json`: schema/content version and coverage manifest.
- `content/banks/*.json`: canonical content.
- `content/generated/*.js`: generated browser globals.
- `scripts/lib/content.js`: validation, duplicate checks, coverage, and
  mathematical verification.
- `scripts/lib/generation.js`: deterministic, atomic generation helpers.

The browser app has no module loader. It loads the generated catalog, then
`core.js`, then `app.js`; section banks are added as script tags on demand.
Content strings must be rendered as text, not trusted HTML.

Progress is private, versioned browser-local data. Do not claim that the
recommendation logic implements official SAT adaptivity, ACT scoring, or score
prediction.

## Content workflow

Each accepted question needs every field in `content/schema.md`, a deterministic
ID, original-content provenance, a content version matching the catalog, and an
honest review status.

For a coherent batch:

1. Preserve accepted IDs and edit or run the relevant deterministic generator.
2. Validate the canonical records.
3. Inspect failures; never weaken a gate merely to reach a count.
4. Manually sample every affected domain, difficulty, and response format.
5. Regenerate browser files.
6. Refresh the coverage report when counts or statuses change.
7. Commit source, output, tests, documentation, and audit notes together.

`automated-verified` means automated checks passed; it does not mean a human
approved the content. Use `editorial-reviewed` only after a documented,
independent editorial review.

## Answer Signs guide (test-taking tells)

`content/guides/answer-signs.js` is a standalone browser global
(`window.PRACTICE_ANSWER_SIGNS`) that powers the "Answer Signs" view. It is a
study guide of legitimate answer "tells," **not** a question bank: it is not in
`content/catalog.json`, not validated by `scripts/validate-content.js`, and must
never be run through the bank generators.

Structure:

- `disclaimer` (string), `principles` (array of `{title, body}`), and `groups`.
- Each group: `{ id, test: "SAT"|"ACT"|"Both", category, title, intro, tells }`.
- Each tell: `{ name, sign, why, example, caution }` — all required, all
  plain-text strings. The renderer (`renderSigns` in `app.js`) labels them
  Look for / Why it works / Example / Caution and renders them as text.

To extend the guide:

1. Add tells or groups to `content/guides/answer-signs.js`, keeping every field
   present and honest. Tells are probabilistic heuristics; never present them as
   guarantees, and keep the disclaimer prominent. Content must stay original and
   free of copyrighted or official material.
2. Give each new group a unique `id`; the filter buttons and smoke test rely on
   it. Use `test` values `SAT`, `ACT`, or `Both` (badge styling keys off the
   lowercased value; add a `.signs-badge-both` rule if you use `Both`).
3. `node scripts/smoke-static.js` validates that the guide loads and that every
   group has an id, test, category, and non-empty `tells`. Run `npm run check`.

## Markdown study library (`guides/`)

`guides/` is a Markdown study library: test formats, registration logistics,
item architecture and answer patterns, one guide per catalog domain across all
seven sections, formula references, a Desmos playbook, and study plans.

It is **documentation, not question-bank content**. It is not in
`content/catalog.json`, not validated by `scripts/validate-content.js`, and must
never be run through the bank generators. It is also distinct from
`content/guides/answer-signs.js`, which is a browser global powering an in-app
view; `guides/` is not loaded by the browser app at all.

Conventions:

- `guides/README.md` is the index. **Every guide must be reachable from it**,
  directly or transitively — `scripts/check-guides.js` enforces this.
- Domain guides name the exact `content/catalog.json` domain and skills they
  cover in a header block, so readers can filter the app to matching practice.
  When the catalog taxonomy changes, update the affected guides.
- Every heuristic must be stated with the conditions under which it fails.
  These are probabilistic tells, not rules; never present them as guarantees.
- Content must stay original and free of official or copyrighted material.
- Time-sensitive facts (test dates, fees, policies) carry a verify-before-you-
  rely-on-this note. Update `guides/02-registration-and-test-day.md` when a new
  testing year is published.

`node scripts/check-guides.js` verifies that every relative Markdown link
resolves, every file has a top-level heading, and every file is reachable from
the index. It runs as part of `npm run check`.

## Expanding question counts

Every bank currently holds exactly `catalog.targetPerSection` (575) items —
175 Easy, 250 Medium, 150 Hard — well above any 100-per-section floor. To raise
counts:

1. Increase `targetPerSection`, `difficultyTargets`, and each domain `target` in
   `content/catalog.json` so domain targets and difficulty targets each sum to
   the new total. The unit tests read the catalog dynamically and follow
   automatically.
2. Only `sat-math` sets `finalMultipleChoiceCount` (its mixed MC/numeric split);
   it must equal the final multiple-choice count, or the answer-position gate
   fails. Recompute it when the target changes. Rerun each generator and
   `npm run build:content`.
3. Generators are deterministic and de-duplicated: each repeats its scene and
   template variety with a fixed period, so pushing a section past that period
   trips the duplicate gate. Text banks now compose place names from coprime
   banks (e.g. 25 x 23 = 575 unique) so items stay distinct; extend that pattern
   (larger or additional coprime banks) before raising the target further, and
   regenerate the three text-heavy sections with `--rebuild`. Never weaken a
   gate to hit a count. Update `scripts/smoke-static.js` (which reads
   `targetPerSection`), the README table, and the coverage report together.

## Required verification

Run the smallest relevant checks during development and the full check before a
content or application checkpoint:

```sh
npm run check
```

No installation is required. The full command performs syntax checks, complete
content validation, a static DOM/generated-bank smoke test, and Node tests.
When content changes, also run:

```sh
npm run build:content
npm run report:content:write
git diff --check
```

Test major interactions in a current browser when one is available: section
loading, targeted and full sessions, each response type, hints, answer guides,
results, recommendations, review lists, progress, clear-progress confirmation,
keyboard operation, narrow layout, and dark mode. Report unavailable browser or
accessibility tooling rather than installing it.

## Editing and completion rules

- Inspect `git status` and preserve unrelated work.
- Keep changes small enough to review and use terse imperative commit subjects.
- Update documentation when behavior, schema, commands, counts, or limitations
  change.
- Do not claim that a bank is complete unless `node
  scripts/validate-content.js --complete` passes.
- Do not claim editorial approval based on generated content or automated tests.
- Keep the independent-project and trademark wording visible in the interface
  and README.
