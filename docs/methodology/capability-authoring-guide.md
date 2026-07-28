# Capability authoring guide

Add or refine one capability as an independently reviewable module. The required sections are: stable ID; name; definition; business outcome; applicability; foundational status and rationale; primary category; secondary relationships; scoring model; questions; evidence requirements; findings; recommendations; standards mappings; and tests.

Questions must test one concept, use observable answer states, avoid compound controls and company-size assumptions, distinguish unknown from absent, support N/A when genuinely applicable, produce an actionable interpretation, be understandable to business respondents, and be verifiable by evidence where practical. Prefer “When was the last successful restore test?” over “Do you have secure backups and a recovery plan?” The latter combines backup coverage, security, recovery planning, and test evidence while leaving “secure” undefined. A better sequence tests critical-system coverage, restore testing, what was restored, verification, and demonstrated recovery time.

Choose `control-status` for presence/coverage of a safeguard, `process-maturity` for repeatability and management of a process, and `business-capability` for the ability to produce a business outcome. Do not use a model merely because its labels sound useful; document the interpretation and score anchors.

Implementation sequence:

1. Add or confirm the catalog entry and stable relationships.
2. Create `capability.ts`, `questions.ts`, `findings.ts`, `recommendations.ts`, `standards.ts`, and `index.ts`.
3. Keep all IDs capability-scoped and cross-reference only existing IDs.
4. Add the module to the version assembly and validate it.
5. Add unit/contract tests and worked scoring examples.
6. Update taxonomy status, active-version notes, limitations, traceability, and the change checklist.

Never embed finding or recommendation semantics in an Astro component. Never silently rename a question used by saved responses.

