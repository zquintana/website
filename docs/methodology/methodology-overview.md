# Methodology overview

The methodology serves the business goal in [Business goals](../product/business-goals.md): measure technology maturity in business terms and turn the result into an improvement roadmap. It must remain understandable to the target SMB leadership audience while preserving enough structure for repeatable review.

The authoritative conceptual hierarchy is:

```text
Assessment Version
  Domains
    Capabilities
      Questions
      Evidence
      Health State
      Findings
      Recommendations
      Standards Mappings
```

Capabilities are the primary methodology unit. A capability states a coherent business outcome and owns its questions, evidence guidance, findings, recommendations, and standards relationships. Domains organize the taxonomy. Customer-facing report categories are presentation and aggregation constructs, not capabilities. A capability has one primary category and may relate secondarily to others; its score must not be counted once per relationship.

Controls are specific safeguards or practices that may be tested by a question. Questions collect observable answers. Findings describe a risk or visibility condition. Recommendations describe actions and expected outcomes. Evidence describes how an answer is supported. Health describes implementation/maturity; risk describes business consequence and likelihood treatment; confidence describes how strongly the result is supported. Applicability answers whether the subject belongs in scope and may be based on the business profile or a prior answer. Foundational capabilities are prerequisites or high-leverage capabilities. In active version `0.1.0`, foundational treatment is explicitly `metadata-only`: the flag is reported and available to future policy, but does not change score weighting or impose a score floor.

Vendor products are implementation details. A capability such as privileged access management must remain meaningful across Microsoft, Google, AWS, self-hosted, and mixed environments.

The authored source is under `src/features/technology-health-assessment/methodology/`; the active assembled version is `methodology/versions/v0.1.0.ts`. The UI consumes `createAssessmentReadModel()`, which deliberately flattens modular content and appends legacy demonstration questions.

Related authority: [types and validation](../../src/features/technology-health-assessment/methodology/types.ts), [validation](../../src/features/technology-health-assessment/methodology/validation.ts), [scoring](scoring-model.md), and [terminology](../reference/terminology.md).
