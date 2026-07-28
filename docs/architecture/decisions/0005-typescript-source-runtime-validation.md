# 0005: TypeScript source with runtime validation

- Status: Accepted
- Date: 2026-07-27

## Decision

Author methodology as TypeScript modules, assemble typed versions, and validate structure/references with Zod and explicit checks.

## Consequences

Editors get types and tests get imports; runtime/build failures catch invalid manifests. Validation depth must continue to grow.

