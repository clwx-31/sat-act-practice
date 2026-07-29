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
| `stimulus` | object or `null` | Optional passage, notes, table, or scenario |
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
| `verification` | object or `null` | Optional deterministic answer-verification data |

`distractorRationales` contains objects with an `index` and `reason`. It must
cover every incorrect option exactly once and must not include the correct
option.

Essay `correctAnswer` values contain a defensible sample thesis, an outline,
and rubric-aligned review criteria. They are guides, not claims that one
position is uniquely correct.

Run `npm run validate:content` after authoring and `npm run build:content` to
refresh the browser-loadable banks. No package installation is required.
