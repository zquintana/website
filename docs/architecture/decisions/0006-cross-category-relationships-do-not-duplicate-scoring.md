# 0006: Cross-category relationships do not duplicate scoring

- Status: Accepted
- Date: 2026-07-27

## Decision

Secondary category relationships and contribution metadata must not cause the same capability health penalty to be counted repeatedly.

## Consequences

Aggregation remains interpretable. Any future contribution model must define one allocation rule and regression tests.

