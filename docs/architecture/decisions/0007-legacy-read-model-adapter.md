# 0007: Legacy flat read-model adapter

- Status: Accepted, transitional
- Date: 2026-07-27

## Decision

Expose modular methodology through `createAssessmentReadModel()` until the current flat question UI is replaced.

## Consequences

Migration can proceed capability by capability and stable question IDs are preserved. The adapter can lose semantics when translating conditions and should be removed only after a capability-native runtime exists.

