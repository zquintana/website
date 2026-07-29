# Technology Health Check Model

The executable source for the free check is `src/features/technology-health-check/data/questions.ts`, with scoring in `src/features/technology-health-check/lib/scoring.ts` and conditional behavior in `src/features/technology-health-check/lib/engine.ts`. This document describes the current provisional model; it is not the authoritative methodology for the deferred in-depth assessment.

## Dimensions

Each answer may score independently on:

- **Technology Health** — overall operational health and management effectiveness.
- **Business Risk** — concern points for weaknesses that could materially affect the business. Higher raw risk points mean more concern.
- **Operational Resilience** — ability to continue and recover after disruption.
- **Assessment Confidence** — how much certainty the answers provide. “Not sure” has zero confidence and limited risk/health points; it is not automatically treated as absence.
- **AI Readiness** — safe, purposeful preparedness for AI. It is deliberately separate from the Technology Health Score.

Each applicable answer uses a 0–4 scale for the dimensions it affects. The engine calculates a weighted normalized result:

`dimension score = round(sum(answer score × question weight) / sum(4 × question weight) × 100)`

Questions that do not affect a dimension do not contribute to that dimension’s denominator. The overall health score uses only the `health` dimension, so AI adoption cannot improve or collapse general health by itself. AI-related security or data-handling risk can still affect the Business Risk rating.

## Ratings

Technology Health uses: 80–100 Healthy Foundation; 65–79 Generally Healthy, With Gaps; 45–64 Needs Attention; 25–44 Elevated Risk; 0–24 High Risk. Business Risk uses Low, Moderate, Elevated, and High. Resilience uses Strong, Adequate, Fragile, and High Concern. Confidence uses High, Medium, and Low. AI readiness uses Governed and Advancing, Ready to Experiment, Emerging Opportunity, Unmanaged Adoption, and Foundational Work Needed.

These thresholds are directional, not scientifically precise, and must be revised with representative response data before claiming benchmarking.

## Conditional logic

The engine evaluates conditions before rendering and removes answers for questions that become unreachable. Administrative MFA follow-up appears only for broad MFA claims. Password-manager ownership appears when a password manager is reported. Restore validation appears unless backups are described as regularly tested, including when the respondent is unsure. AI data handling appears when AI is in use, and interruption cause appears for monthly-or-more interruptions.

## Findings and recommendations

Risk signals create plain-language findings; recommendation signals are deduplicated and sorted by configured priority before the top three are shown. Findings may remain provisional because they are based on self-report. High-consequence signals such as missing administrative MFA, untested backups, prolonged recovery, insecure password sharing, or no disruption plan should be prominent, but the free screening should not call an answer “catastrophic” without evidence and context.

Technology planning is intentionally represented by one question about anticipating needs, replacements, and expenses before they become urgent. The former separate spending-behavior question was removed because it measured substantially the same proactive-versus-reactive signal. The selected priority area influences recommendation ordering through an explicit mapping; it does not manufacture a finding or change the health score.

## Authoring and tests

Keep question content, scoring, risk signals, and recommendation signals in the data module. Questions should test one observable concept, include a separate “Not sure” state where uncertainty is meaningful, and use conditional follow-ups rather than compound wording. Add or update fixtures in `tests/health-check.test.ts` for scoring, branches, stale-answer removal, confidence, recommendation ordering, and representative personas. Update this document whenever score semantics change.
