# Active methodology version

- Version: `0.1.0`
- Status: `demonstration`
- Release date: not formally released
- Runtime export: `activeAssessmentVersion` in `src/features/technology-health-assessment/methodology/index.ts`
- Hash: `methodology-0.1.0-hash-placeholder` (placeholder, not reproducibility-grade)
- Catalog: 142 capabilities across 14 domains
- Implemented modules: `business-service-criticality`, `recovery-requirements`, `technology-asset-inventory`, `identity-inventory`, `critical-data-inventory`, `recovery-capability`, `identity-lifecycle`, `privileged-access`
- UI/read-model questions: 33 total, 19 modular and 14 legacy; `ops-system-inventory` is retained in the historical source but retired from the active read model because it duplicates Technology Asset Inventory coverage
- Intended use: pilot/demo advisory workflow only
- Foundational treatment: `metadata-only`; foundational flags are displayed as metadata and do not alter scoring or automatically create findings

The question set, scoring weights, confidence values, and legacy adapter remain provisional. Results are not production certification or independent verification. Compatibility notes: local sessions use format `mvp-1`, are stored under `technology-health-assessment:v1`, and are rejected if their version differs; no migration exists.
