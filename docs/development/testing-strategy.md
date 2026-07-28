# Testing strategy

## Current layers

- Schema/manifest validation: duplicate IDs, missing references, category weights, question score ranges, ownership, and mapping references are covered by `validation.ts` and methodology tests. Condition/operator semantics are not fully validated.
- Unit tests: scoring, unknown behavior, N/A exclusion, priority, critical legacy findings, confidence, and storage parsing exist in `tests/assessment.test.ts`.
- Contract tests: active version assembly, catalog/module correspondence, stable IDs, and read-model shape exist in `tests/methodology.test.ts`. Historical versions and migrations are missing.
- Component/browser E2E: not currently present. These should cover rendering, unknown/N/A, progress, results, print, and save/resume.
- Documentation: internal links, command checks, examples, and active-version references should be checked during release; no automated doc checker exists.

Methodology changes must include manifest validation, affected scoring/finding tests, stable-ID/compatibility review, updated worked examples, and documentation. A new published version must add historical-load and migration tests. A finding severity change needs explicit threshold/wording tests. A category weight change needs overall-score regression tests. A question change needs answer-state and unknown/N/A tests. Browser component/E2E tests remain important for verifying the shared core is wired to the rendered report.
