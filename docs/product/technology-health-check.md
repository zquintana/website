# Free Technology Health Check

The Technology Health Check is the current public assessment at [`/health-check`](/health-check). It is a short, executive-friendly lead-generation screening for growing businesses. It helps a business leader answer: “Should I be concerned about how technology is being managed, and what should we focus on first?”

It is designed for owners, CEOs, COOs, office managers, and other decision makers who understand the business but do not need technical expertise. It takes approximately 5–7 minutes and shows results without requiring contact information.

## Product boundary

The check identifies self-reported indicators across technology leadership, daily operations, security basics, recovery and continuity, technology lifecycle, business alignment, and AI readiness. It provides a directional health score, qualitative risk and resilience ratings, an assessment-confidence rating, strengths, warning signs, and practical next priorities.

It does not prove that an organization is secure, validate configurations, determine compliance, replace a penetration test or legal advice, or produce a complete technology roadmap. It is not the comprehensive Technology Maturity Assessment preserved under `src/features/technology-health-assessment/`; that deeper track is deferred for future advisory work. The screening limitation is shown again on the results page.

## Commercial role

The primary MVP outcome is a qualified consulting conversation. The user receives useful results before the consultation CTA. The CTA offers a Technology Health Review or a comprehensive assessment to validate the screening and build a roadmap; it must not use fear-based claims or imply that the score is a certification.

## Trust and privacy

Scoring is deterministic and happens in the browser. Answers are stored only in the browser’s local storage to support resume and are not required for results. The implementation emits assessment lifecycle events using the site’s browser event pattern; it sends question IDs and aggregate result metadata, not answer text. Do not add third-party answer-level tracking without a documented privacy purpose.

See [the health-check model](../methodology/health-check-model.md), [the active track status](assessment-track-status.md), and [the deep assessment boundary](../methodology/methodology-overview.md).
