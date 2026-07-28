# Assessment data model

The executable structural source of truth is [`methodology/types.ts`](../../src/features/technology-health-assessment/methodology/types.ts), [`types.ts`](../../src/features/technology-health-assessment/types.ts), and Zod/reference validation in [`validation.ts`](../../src/features/technology-health-assessment/methodology/validation.ts).

| Entity | Required identity/relationship | Current notes |
| --- | --- | --- |
| AssessmentVersion | version, status, methodologyHash, domains, categories, catalog, standards, modules, legacy set | Assembled immutable intent; hash placeholder |
| Domain | stable `id`, name, description, order | 14 taxonomy domains |
| ReportCategory | stable `id`, name, explanations, positive weight, order | 10 categories; weights total 100 |
| Capability | id, name, definition, outcome, domain, primary category, scoring model, applicability, owned IDs, readiness metadata | Seven implemented; catalog has 142; readiness is executable |
| Question | id, capability, prompt, response type, applicability, options, importance, severity, evidence requirements | 31 read-model questions; pilot module questions include evidence guidance; legacy shape at UI boundary |
| Option | id, label, optional maturity score | Score range 0–5 when present |
| Evidence requirement | stable ID, label, description, preferred source | Typed question-level guidance; not a persisted evidence artifact or collected UI entity |
| Finding | id, capability/question relation, conditions, severity, impact, recommendation IDs | Conditions are validated and evaluated; legacy findings use a compatibility adapter |
| Recommendation | id, capability, title, actions, outcome | Flattened to legacy text for UI |
| Standard | id, name, optional version/publisher/source | Source and review date missing in current type |
| StandardMapping | id, capability, standard, relationship | Referential integrity validated |
| BusinessProfile | business/respondent fields and optional context | Stored in session; email is sensitive personal data |
| AssessmentSession | assessment ID, customer/subject identity, methodology version, timestamps, status, profile, answers, prior-assessment relationship | Current implementation is local-only and one key; the model should support repeat baseline/follow-up assessments |
| AssessmentResponse | question ID, value/status, evidence level, optional evidence source/date/reference/reviewer, notes | Record keyed by question ID; provenance fields are typed but not yet collected by the MVP UI |
| CapabilityResult | capability ID, score/maturity, confidence, counts, question weight, findings, foundational flag | Implemented in `methodology/capability-results.ts` and exposed in the browser report |
| CategoryResult | category ID, score, maturity, confidence, counts, findings | `CategoryScore` is current analogue |
| ReportModel | intended stable report projection | Current report is assembled inline in browser |

IDs are stable keys. Validation checks duplicates, category total, references, question ownership, score bounds, and mapping references. It does not yet validate all duplicate category relationships, finding operator/value semantics, legacy collisions, or catalog-to-domain completeness. Customer identity, assessment sequence, and historical comparison are future persistence concerns, not current localStorage behavior.
