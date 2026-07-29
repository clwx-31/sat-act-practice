# SAT/ACT Practice Platform Implementation Plan

Status: active  
Started: 2026-07-29  
Target: 500 validated original items in each of seven supported sections

## Baseline

The starting application is a dependency-free static site made from
`index.html`, `styles.css`, `questions.js`, and `app.js`. It has one in-memory
multiple-choice quiz flow. The 45 starting questions are stored directly in a
global JavaScript array: 15 SAT Math, 10 SAT Reading and Writing, and 5 each in
ACT English, Math, Reading, and Science.

There is no authentication, durable progress, content schema, generation
pipeline, automated test suite, or explicit deployment workflow. GitHub Pages
serves `main` from the repository root. The initial worktree was clean at
commit `e5e3432`, and the existing `node --check` checks passed.

## Scope decision

The platform will support all current SAT and ACT top-level tests documented by
their owners:

1. SAT Reading and Writing
2. SAT Math
3. ACT English
4. ACT Mathematics
5. ACT Reading
6. ACT Science (optional on the current ACT)
7. ACT Writing (optional on the current ACT)

“500 per section” therefore means 3,500 accepted records. ACT Writing records
are open-ended prompts with planning guidance, rubric-aligned sample outlines,
and self-review instructions instead of answer choices or a single answer.
Optional ACT sections are labeled accurately in the interface and are not
described as part of the current ACT Composite score.

The product is independent practice software. It will not reproduce official
scoring, adaptive routing, or proprietary questions.

## Architecture

The deployed app remains plain HTML, CSS, and JavaScript with no runtime server
or third-party dependency.

- Canonical content lives as structured JSON, split by test section.
- A Node script validates and compiles canonical JSON into browser-loadable
  JavaScript banks.
- A small catalog lets the browser load only the selected section.
- Shared pure functions cover filtering, scoring, progress summaries, and
  recommendation logic and are tested with Node's built-in test runner.
- Browser progress is stored locally and versioned. No account or personal data
  leaves the device.
- Generation is deterministic and resumable. Existing accepted IDs are
  preserved, and batches are written atomically.
- Validation includes schema, IDs, answer keys, metadata, exact and normalized
  duplicates, near-duplicate signatures, choice quality, answer distribution,
  coverage, and section counts.

Generated content is not treated as editorially approved merely because it
passes automated checks. Every record carries provenance, content version, and
review status.

## Checkpoints

- [x] Record official structures, domains, distributions, and legal assumptions.
- [x] Add schema, catalog, validators, generator framework, and tests.
- [x] Migrate and audit the 45-question legacy bank.
- [x] Complete and validate 500 SAT Reading and Writing records.
- [x] Complete and validate 500 ACT English records.
- [x] Complete and validate 500 ACT Reading records.
- [ ] Complete and validate 500 ACT Writing records.
- [ ] Complete and validate 500 SAT Math records.
- [ ] Complete and validate 500 ACT Mathematics records.
- [ ] Complete and validate 500 ACT Science records.
- [ ] Integrate lazy content loading and robust error/empty states.
- [ ] Add full, targeted, missed, flagged, and bookmarked practice.
- [ ] Add hints, instructional answer guides, search, and filters.
- [ ] Add local progress analytics and transparent recommendations.
- [ ] Complete responsive, keyboard, semantic, and focus-state polish.
- [ ] Update authoring, validation, setup, legal, count, and limitation docs.
- [ ] Run final content, unit, integration, syntax, and smoke-test audits.

## Quality gates

Each content checkpoint must:

1. pass the JSON schema and metadata validator;
2. contain no exact duplicate stems;
3. stay below the configured near-duplicate threshold;
4. meet its domain and difficulty manifest;
5. keep answer positions within the configured balance tolerance;
6. include a hint, concise explanation, detailed reasoning, distractor
   rationales, strategy, trap, timing, principle/formula, policy, provenance,
   version, and review status;
7. pass deterministic math verification where a verifier is declared;
8. produce an accepted/rejected/pending report; and
9. receive a representative manual sample review before commit.

## Unattended decision policy

Small reversible choices are documented and implemented. Work stops only for a
material scope/legal decision, unavailable external authority, or when no safe
runnable work remains. No branch change, history rewrite, push, deployment,
paid service, credential use, or collection of personal information is in
scope.
