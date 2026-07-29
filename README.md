# Zach Quintana Consulting site

Astro and TypeScript site for Zach Quintana Consulting. The site includes the preserved implementation of a future in-depth Technology Health Assessment track alongside the consulting site.

## Status

The public assessment entry is currently disabled while the product is narrowed to a simpler executive-first experience. The existing capability-based assessment remains in the repository as a future in-depth advisory track; its methodology is `0.1.0` with status `demonstration` and is not the current customer offering. Do not describe its results as certification, compliance attestation, penetration testing, or an independent audit.

## Stack and commands

- Astro 5, TypeScript 5, Zod 3, and Node’s built-in test runner.
- `npm ci` — install dependencies.
- `npm run dev` — start local development.
- `npm test` — run the repository tests, including methodology validation and scoring behavior.
- `npm run build` — build the static site into `dist/`.
- `npm run preview` — preview the build.

There are currently no dedicated `lint`, `format`, or `typecheck` scripts. `npx astro check` is available through the installed dependency but currently reports 23 existing diagnostics in the assessment Astro/client code; it is not a passing gate yet. Manifest validation runs when the active methodology module is imported and is covered by `npm test`.

## Repository map

- `src/pages/` — Astro routes; `/assessment/*` is a deferred future-track entry.
- `src/features/technology-health-assessment/` — assessment UI, types, methodology modules, compatibility adapters, scoring, findings, confidence, and local persistence.
- `src/features/technology-health-assessment/methodology/` — authoritative authored methodology and version assembly.
- `tests/` — scoring, persistence, methodology, validation, and adapter tests.
- `static/` — public assets.
- `docs/` — product, methodology, architecture, development, and reference governance.
- `CLAUDE.md` and `AGENTS.md` — agent/contributor instructions.

Read [the business goals](docs/product/business-goals.md), [the assessment track status](docs/product/assessment-track-status.md), [the assessment platform roadmap](docs/development/assessment-platform-roadmap.md), [the documentation index](docs/documentation-audit.md), [the methodology overview](docs/methodology/methodology-overview.md), and [the change checklist](docs/development/assessment-change-checklist.md) before changing assessment behavior. The executable TypeScript types and runtime validation are the structural source of truth; published methodology modules and tests establish active configuration and verified behavior.
