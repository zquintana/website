# Assessment implementation guidance

Before changing assessment behavior, read [the methodology overview](docs/methodology/methodology-overview.md), [the architecture overview](docs/architecture/system-overview.md), and [the assessment change checklist](docs/development/assessment-change-checklist.md).

- Treat capabilities as the primary methodology unit; report categories are aggregation/presentation constructs.
- Preserve stable capability, question, finding, recommendation, and mapping IDs. Add a migration map before replacing persisted identifiers.
- Preserve historical methodology versions and keep health, risk, evidence, and confidence separate.
- Prefer observable, single-concept answer states. Keep unknown distinct from absent and support not-applicable where appropriate.
- Keep findings and recommendations in methodology modules, not UI components.
- Run `npm test` and `npm run build`; manifest validation happens during methodology import. Update docs and tests when behavior changes.
- Use the assessment change checklist and record significant architectural decisions in `docs/architecture/decisions/`.
- Treat demonstration questions as provisional, never as finalized methodology. Never imply compliance certification.
- The public `/health-check` is a separate short self-reported screening; keep its executive-friendly content and scoring separate from the deferred capability-based assessment track.
- For health-check changes, preserve question IDs, keep AI readiness separate from general health, test conditional branches and stale-answer removal, and update [the health-check model](docs/methodology/health-check-model.md).

See [development guidance](docs/development/development-guide.md) for the complete workflow.
