# Zach Quintana Consulting site

Astro and TypeScript site for Zach Quintana Consulting. The site includes a public executive-friendly Technology Health Check and the preserved implementation of a future in-depth Technology Health Assessment track.

## Status

The public `/health-check` is a self-reported screening tool for executive-level technology health, risk, resilience, confidence, and AI readiness. It is not a security audit, compliance determination, vulnerability scan, or comprehensive roadmap. The existing capability-based `/assessment/*` track remains in the repository as a future in-depth advisory track; its methodology is `0.1.0` with status `demonstration` and is not the current customer offering.

## Stack and commands

- Astro 5, TypeScript 5, Zod 3, and Node’s built-in test runner.
- `npm ci` — install dependencies.
- `npm run dev` — start local development.
- `npm test` — run the repository tests, including methodology validation and scoring behavior.
- `npm run build` — build the static site into `dist/`.
- `npm run preview` — preview the build.

There are currently no dedicated `lint`, `format`, or `typecheck` scripts. `npx astro check` is available through the installed dependency but currently reports 23 existing diagnostics in the assessment Astro/client code; it is not a passing gate yet. Manifest validation runs when the active methodology module is imported and is covered by `npm test`.

## Repository map

- `src/pages/` — Astro routes; `/health-check` is the public screening and `/assessment/*` is a deferred future-track entry.
- `src/features/technology-health-check/` — public screening questions, branching engine, scoring, recommendations, and results UI.
- `src/features/technology-health-assessment/` — assessment UI, types, methodology modules, compatibility adapters, scoring, findings, confidence, and local persistence.
- `src/features/technology-health-assessment/methodology/` — authoritative authored methodology and version assembly.
- `tests/` — scoring, persistence, methodology, validation, and adapter tests.
- `static/` — public assets.
- `docs/` — product, methodology, architecture, development, and reference governance.
- `CLAUDE.md` and `AGENTS.md` — agent/contributor instructions.

Read [the business goals](docs/product/business-goals.md), [the free health-check product boundary](docs/product/technology-health-check.md), [the health-check model](docs/methodology/health-check-model.md), [the assessment track status](docs/product/assessment-track-status.md), [the assessment platform roadmap](docs/development/assessment-platform-roadmap.md), [the methodology overview](docs/methodology/methodology-overview.md), and [the change checklist](docs/development/assessment-change-checklist.md) before changing assessment behavior. The executable TypeScript types and tests are the source of truth for the public check’s current behavior.
