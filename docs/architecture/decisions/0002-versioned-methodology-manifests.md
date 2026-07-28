# 0002: Versioned methodology manifests

- Status: Accepted, incomplete implementation
- Date: 2026-07-27

## Context

Scores and interpretations must remain explainable after methodology changes.

## Decision

Assemble an explicit `AssessmentVersion` module and select the active version in `methodology/index.ts`.

## Alternatives considered

Mutable global configuration and database-only configuration.

## Consequences

Version selection is reviewable and testable. The hash and historical loader still need real implementation.

