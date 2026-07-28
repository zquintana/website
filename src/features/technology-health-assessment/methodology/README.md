# Technology Health Assessment Methodology

This folder contains the versioned methodology that powers the assessment.

The methodology is organized around measurable technology capabilities, not report categories. Report categories are presentation constructs used to summarize results for clients. A capability owns its questions, findings, recommendations, standard mappings, and category relationships.

Current architecture:
- `framework/` defines shared concepts such as report categories, evidence levels, severity levels, maturity levels, and standards.
- `framework/domains.ts` defines the 14 capability domains used by the taxonomy.
- `capabilities/catalog.ts` defines the stable capability taxonomy, including domain IDs, primary report-category mappings, secondary relationships, foundational flags, scoring model, and implementation status.
- `capabilities/` contains independently reviewable implemented capability modules.
- `legacy/` keeps the remaining MVP demonstration questions that have not been migrated yet.
- `versions/` assembles a published methodology version from framework, capability, and legacy modules.
- `read-model.ts` adapts the modular methodology into the flat shape currently consumed by the assessment UI.
- `validation.ts` validates assembled methodology versions with Zod and reference checks.

The current version is still a demonstration methodology. It should not be described as a certification, compliance audit, attestation, penetration test, or finalized professional standard.

When refining methodology, prefer changing one capability module at a time. Keep question IDs stable when possible because saved assessment answers are keyed by question ID.

Do not create a capability folder until that capability has migrated questions/findings/recommendations. Capabilities that are only cataloged belong in `capabilities/catalog.ts`.
