# Content Audit Log

## Legacy bank audit — 2026-07-29

Source commit: `e5e3432`  
Records inspected: 45  
Accepted into canonical banks: 45  
Rejected: 0  
Pending human editorial review: 45

### Checks performed

- Recomputed the short arithmetic and algebra solutions.
- Checked each answer index against its displayed choice.
- Checked reading, writing, English, and science answers against the supplied
  text or experimental description.
- Mapped each item to the current official catalog taxonomy.
- Added stable IDs and every required instructional/metadata field.
- Ran schema, choice, answer-key, exact-duplicate, structural-duplicate, and
  near-duplicate validation.

### Findings

All 45 answer keys are defensible, and no exact or near duplicates were found.
The old schema lacked domains, skills, hints, step-by-step guides, individual
distractor rationales, timing, policy, provenance, and review metadata. The
migration supplies these fields without changing the original stem, choices,
answer, or concise explanation.

The bank is not representative of an official blueprint: it is small, SAT Math
has no hard item, several official domains are absent, and correct answer
positions are not balanced at section level. These are expected baseline gaps,
not accepted final distributions. Completion generation must hit the catalog
manifests exactly.

The migrated records are tagged `legacy-audited` and remain
`pending-editorial`. Automated validation confirms structure and internally
consistent keys; it is not a substitute for independent human copyediting.

## SAT Reading and Writing completion batch — 2026-07-29

Starting accepted records: 10  
New records accepted: 490  
Section total: 500  
Rejected provisional batches: 3 (repetitive generator output; not retained)  
Pending human editorial review: 500

The first provisional output failed exact, structural, and near-duplicate gates.
Two revisions also failed the near-duplicate threshold. None were accepted.
The final revision passes the schema, taxonomy, metadata, answer-key, exact
duplicate, structural duplicate, and 0.90 Jaccard near-duplicate checks.

Final manifest:

- Information and Ideas: 130
- Craft and Structure: 140
- Expression of Ideas: 100
- Standard English Conventions: 130
- Easy: 150; Medium: 225; Hard: 125
- Correct answer positions A/B/C/D: 125/125/125/125

A manual sample of 12 records spanning every domain and difficulty was checked
for a uniquely defensible answer, grammatical context, choice alignment, and
explanation accuracy. Template-level article and context defects found during
sampling were fixed before acceptance and the bank was regenerated. The 490 new
records are `automated-verified`; all 500 remain subject to independent human
editorial review.

## ACT English completion batch — 2026-07-29

Starting accepted records: 5  
New records accepted: 495  
Section total: 500  
Rejected provisional batches: 1 (23 near-duplicate pairs; not retained)  
Pending human editorial review: 500

Final manifest:

- Production of Writing: 205
- Knowledge of Language: 105
- Conventions of Standard English: 190
- Easy: 150; Medium: 225; Hard: 125
- Correct answer positions A/B/C/D: 125/125/125/125

The accepted bank passes schema, taxonomy, answer-key, explanation-metadata,
exact/structural/near-duplicate, distribution, and choice checks. A 12-record
manual sample covered all three reporting domains. Sampling found article and
outcome phrasing defects in the introduction family; the family was corrected,
the entire bank regenerated, and validation rerun. All records still require
independent human editorial review.

## ACT Reading completion batch — 2026-07-29

Starting accepted records: 5  
New records accepted: 495  
Section total: 500  
Rejected provisional batches: 2 (132, then 1 near-duplicate findings)  
Pending human editorial review: 500

Final manifest:

- Key Ideas and Details: 240
- Craft and Structure: 140
- Integration of Knowledge and Ideas: 120
- Easy: 150; Medium: 225; Hard: 125
- Correct answer positions A/B/C/D: 125/125/125/125

The accepted bank passes all schema, taxonomy, answer, metadata, duplicate, and
distribution gates. A 12-record sample spanning all reporting domains found
article handling, outcome-clause, and narrator-explanation defects. Those
families were repaired and regenerated before acceptance. Every passage is
invented; the records remain subject to independent human editorial review.

## ACT Writing completion batch — 2026-07-29

Starting accepted records: 0  
New records accepted: 500  
Section total: 500  
Rejected records: 0 (one accepted batch was revised after sample review)  
Pending human editorial review: 500

Final manifest:

- Ideas and Analysis primary focus: 125
- Development and Support primary focus: 125
- Organization primary focus: 125
- Language Use and Conventions primary focus: 125
- Easy: 150; Medium: 225; Hard: 125
- Response format: 500 open-ended essays

Every prompt addresses all four ACT writing domains; the primary domain records
the instructional emphasis. Each guide includes a qualified sample thesis,
five-part outline, four-domain review checklist, and a 40-minute pacing
strategy. A nine-prompt sample found an ungrammatical risk phrase and a
sentence-initial capitalization defect in perspective templates. Both were
fixed before regeneration. Automated checks do not score student prose, and all
prompts remain subject to independent human editorial review.

## SAT Math completion batch — 2026-07-29

Starting accepted records: 15

New records accepted: 485

Section total: 500

Rejected provisional batches: 2 (structural repetition, then 5 near duplicates)

Pending human editorial review: 500

Final manifest:

- Algebra: 175
- Advanced Math: 175
- Problem-Solving and Data Analysis: 75
- Geometry and Trigonometry: 75
- Easy: 150; Medium: 225; Hard: 125
- Multiple choice: 400; student-produced numeric response: 100
- Multiple-choice answer positions A/B/C/D: 100/100/100/100
- Records with independent parameter recomputation: 84

The accepted bank passes schema, taxonomy, answer, metadata, exact/structural/
near-duplicate, and distribution gates. A 12-record sample covered all domains
and both response formats. Sampling and count review exposed an incorrect
numeric-response selection cycle (194 instead of 100); the cycle was replaced
with a coprime deterministic sequence, producing the intended 100 numeric
items. The questions are not calibrated to official scaled scores and all
remain subject to independent human editorial review.
