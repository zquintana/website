# Reporting architecture

Current transformation is: persisted answers → question scores → category scores → overall score/confidence → question-derived findings/strengths → inline HTML results and printable view. The report shows score, maturity label, confidence, category cards, critical findings, recommendations/timeframes, strengths, assessment ID, and a consultation mailto action.

The future boundary should be a typed `ReportModel` containing capability health, risk findings, confidence, category aggregation, executive summary, priority recommendations, and roadmap items. It should be executive-first: every report must answer what the biggest risks are, why they matter, and what to do next. Raw respondent claims, observed facts, inferences, provisional assumptions, and recommendations must use distinct language. “The respondent reported MFA is enabled” is not the same as “MFA was verified.”

Current report limitations: no typed report model, no capability-level report, no evidence artifact provenance, no executive confidence vocabulary, no export file, no server report persistence, and no independent contradiction treatment. Print is browser `window.print()`; report/export links are not a separate serialization format.
