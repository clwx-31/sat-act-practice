# Summit Prep — SAT & ACT Practice

Summit Prep is a free, independent practice platform with 4,025 original
questions and writing prompts. It covers every current SAT section and every
required or optional ACT section:

| Test section | Items | Status |
| --- | ---: | --- |
| SAT Reading and Writing | 575 | Complete; awaiting human editorial review |
| SAT Math | 575 | Complete; awaiting human editorial review |
| ACT English | 575 | Complete; awaiting human editorial review |
| ACT Mathematics | 575 | Complete; awaiting human editorial review |
| ACT Reading | 575 | Complete; awaiting human editorial review |
| ACT Science | 575 | Complete; optional on the current ACT |
| ACT Writing | 575 | Complete; optional, open-ended essay prompts |

Each section provides at least 175 Easy, 250 Medium, and 150 Hard items, so
targeted practice by difficulty always has a deep pool.

Every item includes a hint, concise explanation, step-by-step guide, reliable
approach, common trap, relevant principles, timing guidance, provenance, and
review metadata. Multiple-choice items also explain every incorrect option.

This is a dependency-free static site: plain HTML, CSS, and JavaScript, with no
server, account, framework, package installation, or production build. Progress
is stored only in the browser.

## Use it locally

Open `index.html` directly in a current browser. A local server is optional:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

The configured GitHub Pages site is:
https://clwx-31.github.io/sat-act-practice/

## Study guides

[`guides/`](guides/README.md) is a Markdown study library covering both tests end
to end: test formats and scoring, registration and test-day logistics, how
standardized items are constructed, answer patterns, pacing, an error-log
method, one guide per catalog domain for all seven sections, formula references
for both tests, a Desmos playbook, condensed final-week cheat sheets, and 4-,
8-, and 12-week study plans.

Each domain guide names the exact `content/catalog.json` domain and skills it
covers, so you can read a guide and then filter the app to precisely that
material. Start at [`guides/README.md`](guides/README.md).

The guides are documentation, not question-bank content: they are not in the
catalog, not validated by `scripts/validate-content.js`, and never run through
the generators. `npm run check:guides` verifies that every relative link
resolves and every file is reachable from the index.

## Study features

- Learn the honest, legal answer "tells" for every section in the **Answer
  Signs** guide: universal elimination principles plus section-specific
  heuristics for SAT and ACT math, reading, writing/English, and science.
- Select SAT or ACT section, official domain, skill, and difficulty.
- Run targeted, full-mix, recommended, missed, bookmarked, or flagged sessions.
- Search stems, passages, topics, skills, and stable question IDs.
- Answer multiple-choice and numeric questions or draft ACT essays.
- Request a hint before answering and read the complete answer guide afterward.
- Track on-device accuracy and completion by skill.
- Receive transparent recommendations based on due misses and weak skills.
- Use keyboard shortcuts `1`–`4` for choices and `Enter` to check a response.
- Study on mobile or desktop with light/dark color support and visible focus.

Recommendations are practice guidance only. They do not reproduce official
adaptive routing, scaled scoring, or score prediction.

## Architecture

Canonical content lives in `content/banks/*.json`; do not edit the generated
JavaScript banks directly.

| Path | Purpose |
| --- | --- |
| `index.html`, `styles.css` | Accessible single-page interface and responsive design |
| `app.js` | Browser interaction, lazy loading, sessions, review, and local progress |
| `core.js` | Pure filtering, scoring, analytics, and recommendation functions |
| `content/catalog.json` | Section taxonomy and exact coverage manifests |
| `content/banks/*.json` | Canonical section banks |
| `content/generated/*.js` | Browser-ready output committed for static hosting |
| `content/guides/answer-signs.js` | Answer Signs study guide (test-taking tells); not part of the question-bank pipeline |
| `guides/` | Markdown study library: foundations, per-domain guides, formula references, study plans |
| `content/schema.md` | Complete question schema |
| `scripts/` | Deterministic generators, validators, reports, and browser-content build |
| `tests/` | Node tests for schema, validation, filters, scoring, sessions, and recommendations |
| `docs/` | Official structure, authoring workflow, coverage, audit, and limitations |

The browser loads only the selected 575-item bank. Progress uses the versioned
`summit-prep-progress-v2` local-storage key and never leaves the device.

## Validate and test

Node.js 18 or newer is recommended. No `npm install` is needed.

```sh
npm run check
```

That command checks JavaScript syntax, requires exactly 575 valid items per
section, verifies the static HTML/content contract, checks the guides library's
links and reachability, and runs the unit tests.
Individual commands are also available:

```sh
npm run validate:content
node scripts/validate-content.js --complete
npm run build:content
npm run check:guides
npm run test
npm run report:content
```

After changing canonical content, run `npm run build:content` and commit both
the JSON source and regenerated browser bank.

See [Content authoring and review](docs/CONTENT_AUTHORING.md) for the safe
editing workflow and [Content coverage report](docs/CONTENT_REPORT.md) for
verified counts.

## Editorial and legal status

All passages, scenarios, questions, distractors, and explanations in this
repository are original practice material. Automated validation checks
structure, taxonomy, distributions, answer alignment, duplicates, metadata,
and declared mathematical verification, but it is not a substitute for
independent human editorial review. None of the current records is labeled
`editorial-reviewed`.

SAT® is a registered trademark of College Board. ACT® is a registered trademark
of ACT, Inc. This independent educational project is not affiliated with,
endorsed by, or sponsored by College Board or ACT, Inc.
