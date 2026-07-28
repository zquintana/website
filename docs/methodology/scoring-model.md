# Scoring model

Current behavior is implemented in [`lib/scoring.ts`](../../src/features/technology-health-assessment/lib/scoring.ts) and duplicated in the inline browser runtime in `AssessmentPage.astro`.

For a selected answer, option maturity scores are averaged (multi-select), clamped to 0–5, and normalized as:

```text
normalized question score = round((maturity score / 5) × 100)
```

Missing answers use the question’s unknown maturity score, defaulting to 1, are applicable, marked unknown, and have confidence 0. An explicit unknown uses the same question-specific behavior. N/A is excluded only if `allowNotApplicable` is true. Current questions do not expose N/A. Unknown is therefore not automatically absent, but the default/provisional score can reduce health.

For category `c`:

```text
category score = round(sum(applicable question normalized score × importance)
                        / sum(applicable question importance))
```

The overall score is the weighted average of category scores using the ten category weights totaling 100. Overall maturity is score/20. Labels are Critical (<20), Reactive (<40), Developing (<60), Managed (<80), Resilient (≥80). Category and overall confidence are arithmetic means of included question/category confidence values. There is no low-confidence score suppression.

Priority is separate from health:

```text
priority = (5 − maturity) × importance × severity multiplier × category weight
```

Severity multipliers are low 1, moderate 1.5, high 2, critical 3. Finding levels are critical when a critical rule triggers, otherwise high at ≥240, medium at ≥120, and low below 120. Category weights are used for priority and overall aggregation, not to score a capability once for each secondary relationship. Current code scores the flat read-model questions by primary category; capability `categoryContributions` are not applied.

Example: a maturity-4 answer normalizes to 80. A manually verified answer has confidence 0.8. A critical MFA question at maturity 0 in cybersecurity has priority `(5×5×3×18)=1350`, which is critical if its rule triggers.

Foundational flags are metadata today. They do not suppress an overall score, impose a floor, or automatically add a finding. Such semantics require a versioned decision and tests.

