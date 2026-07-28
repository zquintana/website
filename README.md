# Zach Quintana Consulting site

Astro and TypeScript site for Zach Quintana Consulting. The site includes a Technology Health Assessment MVP for business owners and leadership teams who need a preliminary view of technology health, business risk, resilience, and priorities.

## Status

The assessment is a working demonstration, not a finalized professional methodology. The active methodology is `0.1.0` with status `demonstration`; only three capabilities are modularized and the remaining 15 questions are legacy demonstration content. Do not describe results as certification, compliance attestation, penetration testing, or an independent audit.

## Stack and commands

- Astro 5, TypeScript 5, Zod 3, and Node’s built-in test runner.
- `npm ci` — install dependencies.
- `npm run dev` — start local development.
- `npm test` — run the repository tests, including methodology validation and scoring behavior.
- `npm run build` — build the static site into `dist/`.
- `npm run preview` — preview the build.

There are currently no dedicated `lint`, `format`, or `typecheck` scripts. `npx astro check` is available through the installed dependency but currently reports 23 existing diagnostics in the assessment Astro/client code; it is not a passing gate yet. Manifest validation runs when the active methodology module is imported and is covered by `npm test`.

## Repository map

- `src/pages/` — Astro routes, including `/assessment/*`.
- `src/features/technology-health-assessment/` — assessment UI, types, methodology modules, compatibility adapters, scoring, findings, confidence, and local persistence.
- `src/features/technology-health-assessment/methodology/` — authoritative authored methodology and version assembly.
- `tests/` — scoring, persistence, methodology, validation, and adapter tests.
- `static/` — public assets.
- `docs/` — product, methodology, architecture, development, and reference governance.
- `CLAUDE.md` and `AGENTS.md` — agent/contributor instructions.

Read [the business goals](docs/product/business-goals.md), [the assessment platform roadmap](docs/development/assessment-platform-roadmap.md), [the documentation index](docs/documentation-audit.md), [the methodology overview](docs/methodology/methodology-overview.md), and [the change checklist](docs/development/assessment-change-checklist.md) before changing assessment behavior. The executable TypeScript types and runtime validation are the structural source of truth; published methodology modules and tests establish active configuration and verified behavior.
