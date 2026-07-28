# Documentation audit

Audited 2026-07-27 against the working tree, TypeScript modules, Astro client runtime, tests, and recent Git history. Commit messages were used only as context; executable types, active modules, and tests are authoritative for current behavior.

## Summary

| Topic | Status | Existing source | What it explains / gap | Implementation agreement | Action |
| --- | --- | --- | --- | --- | --- |
| Contributor and agent guidance | Partially complete | `CLAUDE.md`, feature READMEs | Site commands and modular intent existed; no root agent rules or review checklist | Partial | Added `AGENTS.md` and PR template; retained `CLAUDE.md` and linked detailed docs |
| Product purpose and scope | Partially complete | Assessment UI copy, root page | MVP positioning and disclaimer existed; no durable business goals, product requirements, or non-goals | Partial | Added business goals, product overview, journey, scope docs |
| Methodology hierarchy and taxonomy | Partially complete | `methodology/README.md`, `framework/`, `catalog.ts` | Capability architecture and 142-entry catalog exist; semantics, statuses, and category rules were scattered | Yes for structure | Added methodology overview, taxonomy, authoring guide, terminology |
| Scoring | Partially complete | `lib/scoring.ts`, inline browser code, tests | Formula and constants are executable, but not documented and duplicated between server/module code and browser code | Yes, with risk | Added scoring reference and recorded duplication as limitation |
| Findings and risk | Partially complete | `lib/findings.ts`, capability finding modules | Current UI derives findings per question; versioned finding conditions are not evaluated by the runtime | Contradictory/partial | Documented current behavior versus intended modular behavior |
| Evidence and confidence | Partially complete | `lib/confidence.ts`, framework evidence levels | Confidence values exist; evidence is only a level/notes, with no evidence artifact model or confidence suppression | Yes for current MVP | Added evidence/confidence reference and limitations |
| Versioning | Contradictory | `versions/v0.1.0.ts`, `lib/storage.ts`, `manifest.ts` | Methodology says `0.1.0`; persistence uses `mvp-1`; hash is a placeholder; old versions are rejected | No | Documented both identities and compatibility gap; no silent code migration |
| Persistence | Partially complete | `lib/storage.ts`, inline browser runtime | localStorage key, shape, timestamps, reset, and exact version rejection exist; no migration or hash persistence | Partial | Added persistence contract and migration guide |
| Reporting | Partially complete | `AssessmentPage.astro` inline runtime | Results, findings, confidence, printable view, and mailto lead capture exist; no typed `ReportModel`, export, or server report | Partial | Added reporting architecture with current/future boundaries |
| Architecture decisions | Missing | None | No ADR structure | N/A | Added seven ADRs |
| Development/testing workflow | Partially complete | `package.json`, tests, `CLAUDE.md` | `test` and `build` are real; no lint/typecheck scripts or methodology CLI | Yes | Added development and testing guides without inventing commands |
| Active version and limitations | Missing | Feature README and tests | Facts were scattered and not release-oriented | Yes | Added active version, limitations, traceability |

## Contradictions and resolutions

1. The modular methodology is `0.1.0`, while persisted UI state uses `mvp-1`. Documentation now treats `0.1.0` as the methodology version and `mvp-1` as the legacy session format. This is not resolved in code; a migration/version contract is still required.
2. `AssessmentVersion` contains versioned findings and condition modes, but `lib/findings.ts` and the browser runtime use legacy question-level recommendation/critical rules. Documentation distinguishes authored modular intent from current runtime behavior.
3. `getMethodologyHash()` returns a placeholder string. Documentation calls the hash an identifier only and marks historical reproducibility as unimplemented.
4. `AssessmentPage.astro` duplicates scoring, findings, persistence, and version constants instead of calling the exported TypeScript libraries. Documentation records the browser bundle as the current executable path and the duplication as a risk.
5. The framework has 142 catalog entries but only three implemented modules and 20 UI questions. Documentation distinguishes taxonomy inclusion, implementation, validation, and activation.

## Existing documents retained

- `CLAUDE.md` remains the site-level development/deployment guide.
- Feature READMEs remain useful local orientation for methodology and content adapters; they now complement, rather than replace, `/docs`.
- `src/features/technology-health-assessment/data/README.md` remains the adapter-specific explanation.

## New and substantially updated documents

The required product, methodology, architecture, development, reference, ADR, agent, and PR documents are listed in the repository tree. The most important authoritative references are [business goals](product/business-goals.md), [assessment platform roadmap](development/assessment-platform-roadmap.md), [methodology overview](methodology/methodology-overview.md), [scoring model](methodology/scoring-model.md), [persistence contract](architecture/persistence-and-compatibility.md), [active version](reference/active-methodology-version.md), and [traceability matrix](reference/traceability-matrix.md).

## Remaining gaps

- No real methodology hash or published immutable artifact store.
- No migration functions, historical version loader, or hash in persisted state.
- No applicability engine, evidence artifact collection, typed report model, server persistence, export format, or standards source URLs/review dates.
- Modular finding conditions are validated but not used by the current scoring/findings runtime.
- No dedicated typecheck/lint/format scripts; no component or browser end-to-end test suite.
- `npx astro check` is available but currently fails with 23 existing diagnostics; the successful build does not constitute a clean type check.
