# Traceability matrix

| Requirement | Authoritative document | Implementation | Validation/test | Status |
| --- | --- | --- | --- | --- |
| Capabilities are primary methodology unit | [Methodology overview](../methodology/methodology-overview.md) | `methodology/types.ts`, capability modules | `tests/methodology.test.ts` | Implemented structurally |
| Categories are separate and total 100 | [Scoring model](../methodology/scoring-model.md) | `framework/categories.ts`, `lib/scoring.ts` | category-weight test | Implemented |
| Cross-category relationships do not duplicate scoring | [ADR 0006](../architecture/decisions/0006-cross-category-relationships-do-not-duplicate-scoring.md) | primary category read model | no dedicated cross-category test | Partial |
| Unknown differs from absent | [Evidence/confidence](../methodology/evidence-and-confidence.md) | `scoreQuestion()` and browser runtime | unknown behavior test | Implemented, duplicated |
| N/A is excluded only when allowed | [Scoring model](../methodology/scoring-model.md) | `scoreQuestion()` | N/A category test | Implemented |
| Health, risk, confidence remain separate | [ADR 0003](../architecture/decisions/0003-separate-health-risk-confidence.md) | `QuestionScore`, `Finding`, confidence library | scoring/finding tests | Partial |
| Manifest references are valid | [Data model](../architecture/assessment-data-model.md) | `validation.ts` | duplicate/reference/weight tests | Implemented |
| Published versions are immutable/reproducible | [Versioning](../methodology/methodology-versioning.md) | `v0.1.0` assembly | no hash/history tests | Missing |
| Saved sessions retain compatible version | [Persistence](../architecture/persistence-and-compatibility.md) | `storage.ts`, inline browser storage | parse/serialization test | Partial; exact reject only |
| Modular finding conditions execute | [Risk/findings](../methodology/risk-and-findings.md) | `methodology/findings.ts` | operator, all/any, unknown, N/A, and methodology finding tests | Partial; report wiring remains |
| Evidence dates/sources are retained | [Evidence/confidence](../methodology/evidence-and-confidence.md) | answer level/notes only | none | Missing |
| Report distinguishes claims and verification | [Reporting architecture](../architecture/reporting-architecture.md) | inline report language | no report contract test | Partial |
| Capability changes are reviewable | [Change checklist](../development/assessment-change-checklist.md) | PR template, AGENTS.md | reviewer process | Implemented as guidance |
| All catalog capabilities have explicit readiness status | [Assessment platform roadmap](../development/assessment-platform-roadmap.md) | `methodology/types.ts`, `capabilities/catalog.ts`, `methodology/readiness.ts` | readiness coverage and activation-gate tests | Implemented |
| Internal evidence maps to executive confidence language | [Evidence and confidence](../methodology/evidence-and-confidence.md) | `lib/confidence-labels.ts`, answer types | confidence mapping tests | Implemented |
