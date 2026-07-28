# Assessment platform remediation roadmap

This roadmap covers the complete documented taxonomy: all 142 capability catalog entries across 14 domains. It does not imply that all capabilities should be activated at once. Every capability must pass the same readiness gates before it can become customer-facing methodology.

The product direction is an executive-first Technology Maturity Platform whose initial commercial purpose is qualified consulting lead generation. The first production milestone is a trustworthy baseline assessment; repeat assessments, benchmarking, and continuous monitoring must be supported by the architecture but should not block that milestone.

## Capability readiness states

Each catalog capability should progress independently:

```text
Proposed
  → Structured
  → Draft questions
  → Pilot
  → Active
  → Deprecated
```

The readiness record for every capability must track:

- Stable capability ID and name
- Domain and primary/secondary category relationships
- Definition and business outcome
- Applicability rules
- Foundational status and rationale
- Scoring model and score anchors
- Questions and answer-state design
- Evidence requirements and confidence treatment
- Findings, criticality rationale, and recommendations
- Standards mappings with version, source, and review date
- Tests and compatibility fixtures
- Methodology version, owner, reviewer, and last-reviewed date
- Customer activation status

The existing `capabilities/catalog.ts` remains the capability inventory source, and each entry now carries executable readiness metadata. `methodology/readiness.ts` provides the status vocabulary, summary, and activation gate. A future generated matrix can add richer review fields without creating a second, manually divergent taxonomy.

## Phase 0: Establish governance and shared contracts

Apply to all 142 capabilities before expanding customer activation.

- Add capability readiness metadata and review ownership.
- Define authoritative terminology and executive report language.
- Add internal-to-executive evidence mapping: Reported, Observed, Verified. (Implemented in `lib/confidence-labels.ts`.)
- Define evidence provenance: source, date, reviewer, artifact reference, and contradiction state. (Source/date/reference/reviewer are now optional answer fields; collection policy and contradiction state remain.)
- Define capability ID, question ID, finding ID, recommendation ID, and mapping ID stability rules.
- Define version, hash, migration, deprecation, and historical-report requirements.
- Define a baseline capability completion gate and PR checklist enforcement.
- Define the first production methodology status separately from demonstration `0.1.0`.

Exit criteria: every catalog entry has an owner, status, primary category, scoring model, foundational decision, and explicit “not yet active” or readiness rationale.

## Phase 1: Make the runtime methodology-native

Implement the architecture required for every capability module.

- Replace the flat question-first findings path with a capability-aware runtime.
- Evaluate modular finding condition operators and `all`/`any` modes.
- Attach findings and recommendations through stable IDs.
- Implement capability-level health, risk, and confidence results. (Implemented in `methodology/capability-results.ts` and exposed in the browser report.)
- Define one primary-category aggregation rule and prevent secondary double counting. (Implemented for capability results and browser report calculations.)
- Decide and test foundational capability effects. (Active version explicitly uses `metadata-only`; score floors and automatic penalties remain intentionally unimplemented.)
- Add applicability and conditional-question evaluation. (The evaluator is wired into questionnaire and scoring paths; authored rules remain to be added.)
- Remove or isolate the temporary legacy read-model adapter.
- Make browser and library scoring use one shared implementation. (Implemented through `scoring-core.ts`; integration tests remain.)

Exit criteria: a capability module can be assembled, validated, scored, evaluated, and reported without embedding methodology semantics in Astro UI code.

## Phase 2: Complete capability content

Apply the authoring process to all 142 capabilities, prioritizing dependencies and business risk rather than vendor popularity.

For each capability:

1. Confirm the boundary against neighboring capabilities.
2. Write a business-readable definition and measurable business outcome.
3. Define applicability and foundational rationale.
4. Select control-status, process-maturity, or business-capability scoring.
5. Author single-concept questions with observable options.
6. Define unknown and not-applicable behavior.
7. Define evidence expectations and executive confidence treatment.
8. Author findings with justified severity and critical thresholds.
9. Author actionable recommendations and roadmap windows.
10. Add specific, versioned standards mappings.
11. Add unit, manifest, scoring, finding, and compatibility tests.
12. Review with a methodology owner and, where appropriate, a subject-matter reviewer.

The three existing modules—`recovery-capability`, `identity-lifecycle`, and `privileged-access`—should be used as pilots for this process, but must still pass the production readiness gate. Catalog entries with generic generated descriptions are not complete until their content is reviewed.

## Phase 3: Build the executive baseline experience

The first customer-facing release should present business value first:

- Business profile and critical-service context
- Applicability-aware assessment flow
- Clear health, risk, and confidence separation
- Executive summary answering what, why, and next action
- Capability and category results with no duplicate scoring
- Reported/Observed/Verified confidence language
- Evidence follow-up requests without requiring technical expertise
- Prioritized recommendations and consulting conversation CTA
- Printable/exportable baseline report

Technical evidence and implementation detail should be available as supporting report sections. IT manager and MSP workflows remain later views over the same underlying model.

## Phase 4: Persistence and repeat assessments

Implement before calling the platform subscription-ready, while keeping it out of the critical path for the initial baseline pilot if necessary.

- Persist customer/organization identity separately from assessment instances.
- Store methodology version and real content hash with every assessment.
- Support multiple assessments per customer and prior-assessment relationships.
- Add migration maps and historical manifest loading.
- Preserve historical reports without silent recalculation.
- Add evidence history and changed-answer tracking.
- Handle corrupt data, failed migrations, rollback, reset, retention, and privacy.
- Move from one localStorage record to an appropriate server persistence boundary.

## Phase 5: Verification, reporting, and integrations

- Add documentation, screenshot, interview, manual-review, and integration evidence sources.
- Map technical provenance to executive confidence labels.
- Add contradiction handling and evidence age rules.
- Add optional automated integrations without making integrations mandatory for baseline use.
- Add typed `ReportModel` and stable report serialization.
- Add trend analysis and customer maturity deltas.
- Add benchmarking only after a trustworthy comparison population exists.
- Add continuous monitoring only after ownership, privacy, and alert semantics are defined.

## Phase 6: Quality and commercial measurement

Required test layers:

- Manifest/schema validation for all 142 entries
- Unit tests for scoring, applicability, findings, evidence, confidence, and aggregation
- Contract tests for historical versions, migrations, and report shape
- Component tests for executive question/report behavior
- End-to-end tests for complete, interrupted, resumed, repeated, and printed assessments
- Documentation/link/command checks

Instrument the initial commercial funnel:

```text
Assessment started
  → Profile completed
  → Assessment completed
  → Consultation offered
  → Qualified conversation generated
  → Consultation booked
  → Consulting engagement converted
```

The primary MVP metric is qualified consulting conversations generated from completed assessments. Completion, booking, and conversion are secondary. Long-term, track measurable customer maturity improvement across repeat assessments.

## Release gates

### Demonstration gate

The current `0.1.0` demonstration may continue to use legacy questions and local storage, but must display its provisional status and limitations.

### Baseline production gate

Requires a reviewed subset of active capabilities, shared runtime scoring, modular finding evaluation, executive reporting, evidence/confidence terminology, stable persistence contracts, migration strategy, and mandatory tests. Unfinished catalog capabilities remain visible as Structured or Draft, not silently implied to be active.

### Platform gate

Requires repeat-assessment persistence, historical reproducibility, evidence provenance, server boundaries, access/privacy controls, trend reporting, and validated commercial instrumentation.

## Immediate next implementation sequence

1. Add capability readiness tracking for all 142 entries.
2. Add evidence provenance and Reported/Observed/Verified mapping.
3. Implement capability-native finding evaluation.
4. Unify browser and library scoring.
5. Define applicability and foundational behavior.
6. Select and complete the first baseline capability cohort.
7. Add repeat-assessment-compatible persistence contracts and fixtures.
8. Add executive report and funnel tests.
