# Question quality review

Reviewed the active assessment set after the foundational pilot cohort was assembled. The active read model contains 19 modular questions and 14 legacy questions; one additional legacy question, `ops-system-inventory`, remains in historical source data but is retired from the active read model because it duplicates Technology Asset Inventory coverage.

## Resolved in this review

- Modular questions no longer expose `unknown` as a normal answer option when they already support the explicit unknown status. Older saved values of `unknown` are normalized to `isUnknown: true`.
- `business-recovery-priorities` now asks about business-impact priority tiers. `recovery-objectives-documented` owns measurable recovery-time and data-loss tolerances.
- Findings that previously matched an `unknown` option now use an explicit unknown condition, preserving visibility behavior after the option cleanup.
- The legacy system-inventory question is retired from the active read model without deleting its historical source record.

## Remaining review items

These are intentional follow-up items rather than silent duplicates:

- `bcdr-recovery-owner` combines a named owner and a written recovery process. Split it in a future methodology version if separate scoring is needed.
- `business-service-dependencies` covers technology, vendor, people, and data dependencies. Keep it as a high-level dependency-map question only; detailed inventories remain separate capabilities.
- `cloud-critical-owner` overlaps with general technology ownership but is retained for domains, DNS, cloud accounts, and hosting control.
- The remaining legacy yes/partial/no questions need modular replacements before a production methodology is published.

## Authoring rule

Each new question must have one coherent subject, a distinct answer interpretation, explicit unknown handling, and a documented boundary against neighboring capabilities. A semantic duplicate requires either a narrower boundary, a migration plan, or retirement from the active read model.
