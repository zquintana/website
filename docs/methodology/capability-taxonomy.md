# Capability taxonomy

The taxonomy is authored in [`capabilities/catalog.ts`](../../src/features/technology-health-assessment/methodology/capabilities/catalog.ts). It contains 142 stable capability IDs across 14 stable domains. Catalog inclusion is not implementation completion, methodology validation, or customer activation.

## Domain IDs

| ID | Name |
| --- | --- |
| `business-alignment` | Business Alignment and Service Criticality |
| `identity-access-management` | Identity and Access Management |
| `device-endpoint-management` | Device and Endpoint Management |
| `data-protection-information-management` | Data Protection and Information Management |
| `infrastructure-platform-management` | Infrastructure and Platform Management |
| `security-operations` | Security Operations |
| `technology-operations-service-management` | Technology Operations and Service Management |
| `business-continuity-resilience` | Business Continuity and Resilience |
| `productivity-collaboration-knowledge` | Productivity, Collaboration, and Knowledge |
| `governance-risk-compliance` | Governance, Risk, and Compliance |
| `vendor-third-party-management` | Vendor and Third-Party Management |
| `technology-financial-management` | Technology Financial Management |
| `application-software-management` | Application and Software Management |
| `ai-governance-enablement` | AI Governance and Enablement |

## Status model

The source retains `cataloged` or `implemented` for compatibility and now also carries executable readiness metadata. Documentation uses the richer review vocabulary: Proposed, Structured, Draft questions, Pilot, Active, Deprecated. A catalog entry without a module is `Structured` at most. The eight implemented modules are Pilot/Demonstration, not Active production methodology. Readiness status, ownership fields, review date, and notes are stored on each catalog entry; summary and activation checks live in `methodology/readiness.ts`.

Each catalog entry defines a stable ID, name, domain, scoring model, primary category, optional secondary categories, and foundational marker. The complete ID/name/definition/outcome inventory is executable in the catalog; use it as the source for reviews rather than copying a second mutable list here. Implemented module details are in [backup and recovery](../../src/features/technology-health-assessment/methodology/capabilities/backup-recovery/README.md), [identity lifecycle](../../src/features/technology-health-assessment/methodology/capabilities/identity-lifecycle/README.md), and [privileged access](../../src/features/technology-health-assessment/methodology/capabilities/privileged-access/README.md).

| Capability status | Meaning |
| --- | --- |
| Proposed | Candidate concept; not part of approved structure |
| Structured | Stable taxonomy entry, no complete question set |
| Draft questions | Questions exist but require methodology review |
| Pilot | Implemented for demonstration or limited validation |
| Active | Approved for the published customer methodology |
| Deprecated | Retained for historical compatibility, not new use |

Primary category mappings are in the catalog and active modules. Secondary relationships are explanatory/reporting relationships only; they do not duplicate score penalties. Category weights are defined separately in `framework/categories.ts`.
