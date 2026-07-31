# Content Authoring and Review

## Source of truth

Canonical records live in `content/banks/<section-key>.json`. The catalog in
`content/catalog.json` defines the allowed sections, domains, skills,
subskills, response types, calculator policies, and exact coverage targets.
`content/schema.md` defines every required field.

Files in `content/generated/` are browser-ready derivatives. Never edit them by
hand.

## Add or revise a batch

1. Confirm the current official structure in `docs/OFFICIAL_STRUCTURE.md`.
2. Choose one section/domain/skill and a coherent batch size.
3. Preserve existing stable IDs. New IDs use `<section-key>-NNNN`.
4. Write original, self-contained material. Do not adapt an identifiable
   official or commercial question.
5. Supply every instructional and metadata field.
6. Run the validator before building browser output:

   ```sh
   npm run validate:content
   ```

7. Inspect a representative sample across difficulties and formats.
8. Build and run the complete suite:

   ```sh
   npm run build:content
   npm run check
   npm run report:content:write
   ```

9. Record accepted, rejected, and awaiting-review counts in
   `docs/CONTENT_AUDIT.md`.

The deterministic section generators in `scripts/generate-*.js` preserve the
accepted legacy prefix and recreate a complete section from fixed seeds. Their
atomic writer stages output in the target directory before replacing a bank, so
an interrupted process does not leave partial JSON. Regeneration is resumable
because stable inputs produce stable IDs and records.

## Editorial checklist

Automated validation is necessary but insufficient. A reviewer should verify:

- the stem and supplied context support exactly one answer;
- the keyed answer is correct and units, rounding, and accepted numeric form are
  explicit;
- every distractor reflects a plausible, accurately described error;
- the concise explanation and each solution step agree;
- the hint helps without giving away the answer;
- the suggested approach is actually reliable under time pressure;
- the trap and principles are specific to the item;
- invented passages, data, and scenarios are coherent and inclusive;
- no wording closely imitates a published question;
- difficulty and estimated time are reasonable;
- equations, tables, punctuation, and passage formatting render correctly.

Review each response format and every affected domain/difficulty stratum, not
just the first records in a bank. For quantitative items, independently
recompute the result. A declared `verification` object is recomputed by the
validator but does not remove the need for human review.

## Review statuses

- `pending-editorial`: migrated or drafted; basic automated checks may pass.
- `automated-verified`: full automated gates pass; human approval is still
  outstanding.
- `editorial-reviewed`: an independent reviewer completed the checklist and the
  review is recorded in `docs/CONTENT_AUDIT.md`.

Do not bulk-change statuses without performing and documenting the review.

## Validation gates

The validator checks required and unknown fields, catalog taxonomy, stable IDs,
content version, response shape, answer keys, distractor coverage, explanation
metadata, provenance, exact duplicates, structural duplicates, 0.90 Jaccard
near duplicates, domain/difficulty coverage, answer-position balance, and
supported mathematical verification records.

Complete mode additionally requires exactly `targetPerSection` (currently 575)
accepted records in every section:

```sh
node scripts/validate-content.js --complete
```

The generated coverage report records counts, distributions, and remaining
human-review work:

```sh
npm run report:content
```

## Generator limitations

The current banks use deterministic families with varied invented settings,
parameters, passages, tasks, and distractor logic. Duplicate gates prevent exact
and high-similarity items, but they cannot measure pedagogical novelty,
psychometric calibration, cultural bias, or prose quality. All 4,025 current
items therefore remain awaiting independent human editorial review.
