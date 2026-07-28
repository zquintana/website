# Evidence and confidence

Evidence levels currently map to confidence as follows: self-reported/unverified 0.40, documentation reviewed 0.65, manually verified 0.80, automatically verified 1.00 (the last is hidden in the MVP UI). The target executive-facing vocabulary is Reported, Observed, and Verified. The mapping is implemented in `lib/confidence-labels.ts`: self-reported maps to Reported; documentation-reviewed and manually-verified map to Observed; automatically-verified maps to Verified. Answers retain the detailed `evidenceLevel` for compatibility and now have optional provenance fields for source, capture date, reference, and reviewer. The current UI does not collect those optional fields yet.

Unknown is not automatically absent. It can lower confidence and use question-specific provisional scoring or create a visibility finding. Lack of visibility may itself be a finding, especially for recovery testing, access removal, and administrative MFA. Health and confidence remain separate: “Fully implemented / low confidence” is valid when based only on a respondent statement.

Current confidence is an arithmetic mean of applicable question confidence values, then category means are averaged for overall confidence. Missing answers have confidence 0. There is no threshold that suppresses a health score, although findings request verification below 0.65. Future evidence should carry source, date, reviewer, scope, and contradiction state.

Example: `Health: Fully implemented; Confidence: Low; Reason: respondent statement only.` Another valid result is `Health: Unverified; Risk treatment: provisional high risk; Reason: nobody confirmed whether critical backups have been restored.`
