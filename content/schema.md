# Question Schema

Canonical banks are JSON arrays in `content/banks/<section-key>.json`. The
validator rejects unknown or missing required values.

| Field | Type | Purpose |
| --- | --- | --- |
| `id` | string | Stable deterministic ID, `<section-key>-NNNN` |
| `test` | string | `SAT` or `ACT` |
| `section` | string | Official top-level section name |
| `sectionKey` | string | Catalog key linking the record to its manifest |
| `domain` | string | Official content/reporting domain |
| `skill` | string | Catalog skill within the domain |
| `subskill` | string | Specific assessed behavior |
| `difficulty` | string | `Easy`, `Medium`, or `Hard` |
| `responseType` | string | `multiple-choice`, `numeric`, or `essay` |
| `stimulus` | object or `null` | Optional passage, notes, table, or scenario belonging to this question alone |
| `passageId` | string or `null` | Links the question to a shared passage in `content/passages/<section-key>.json`. Mutually exclusive with `stimulus` |
| `stem` | string | Complete question or essay task |
| `choices` | array or `null` | Four choices for multiple-choice records |
| `correctAnswer` | number, string, or object | Zero-based choice index, numeric response, or writing guide |
| `hint` | string | Optional help that does not reveal the answer |
| `explanation` | string | Concise explanation shown first |
| `solutionSteps` | string array | Detailed ordered reasoning or writing plan |
| `distractorRationales` | array or `null` | One rationale per incorrect multiple-choice option |
| `strategy` | string | Fast or reliable test-taking approach |
| `trap` | string | Likely misconception |
| `estimatedSeconds` | positive integer | Expected completion time |
| `principles` | string array | Formula, convention, or reading/writing strategy |
| `calculatorPolicy` | string | Catalog-approved policy label |
| `format` | string | More precise format such as `passage`, `table`, or `essay-prompt` |
| `tags` | string array | Cross-cutting labels such as `modeling` |
| `provenance` | object | Original-content declaration, generator, seed, and creation date |
| `contentVersion` | string | Version matching the catalog |
| `reviewStatus` | string | `pending-editorial`, `automated-verified`, or `editorial-reviewed` |
| `verification` | object or `null` | Optional deterministic answer-verification data with `kind`, numeric `inputs`, and recomputed `expected` |

`distractorRationales` contains objects with an `index` and `reason`. It must
cover every incorrect option exactly once and must not include the correct
option.

Essay `correctAnswer` values contain a defensible sample thesis, an outline,
and rubric-aligned review criteria. They are guides, not claims that one
position is uniquely correct.

## Passages

Sections whose real exam builds questions around a shared passage keep those
passages in `content/passages/<section-key>.json`, one record per passage, and
questions point at them with `passageId`. A passage is stored once and
referenced by every question in its set; it is never copied onto the questions.
`scripts/build-content.js` stitches the two together when it writes the
browser bundle, so consumers still read `question.stimulus` and see the
passage text.

| Field | Type | Purpose |
| --- | --- | --- |
| `id` | string | `<section-key>-pNNN` |
| `sectionKey` | string | Section the passage belongs to |
| `type` | string | Passage kind, constrained per section (see below) |
| `title` | string | Short title shown above the passage |
| `intro` | string | Optional italic lead-in, as the real ACT prints |
| `content` | string | The passage itself; supports paragraph, list, and table blocks |
| `wordCount` | integer | Must equal the word count of `content` |
| `provenance` | object | Original-content declaration |

The validator enforces the structure of each real exam:

| Section | Passage types | Words | Questions per passage |
| --- | --- | --- | --- |
| `act-reading` | literary-narrative, social-science, humanities, natural-science | 600–950 | 8–12 |
| `act-english` | personal-essay, informative-essay, historical-account, process-narrative | 250–450 | 12–18 |
| `act-science` | data-representation, research-summaries, conflicting-viewpoints | 80–600 | 5–8 |

Every `passageId` must resolve, every passage must be referenced, and a
question in a set must not also carry its own `stimulus`.

Duplicate detection adapts: two standalone questions are compared on their
stimulus, while two questions in a passage set are compared on stem plus
choices, since sharing the passage is the point.

Run `npm run validate:content` after authoring and `npm run build:content` to
refresh the browser-loadable banks. No package installation is required.
