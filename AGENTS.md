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
