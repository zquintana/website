# Assessment runtime

Intended sequence: load a methodology version; validate it; build the compatibility read model; create/resume a session; determine applicability; render questions; persist responses; calculate health; evaluate findings; calculate confidence; aggregate categories; generate a report model.

Current sequence differs: Astro serializes the active read model; browser code loads exact `mvp-1` localStorage state, renders category pages, writes answers after each category, calculates directly from flat questions, and builds HTML results. Applicability is metadata-only. Recalculation occurs when results render, not as a separately persisted result.

Skipped/missing questions are treated as unknown and score question-specific default behavior with confidence 0. Unknown uses the same behavior. N/A is excluded only when a question explicitly allows it. Conditional questions are not implemented. Validation failures occur during module import/test/build and are thrown; there is no user-facing methodology error screen. Scoring and findings occur in the browser; exported TypeScript functions are also available to tests but not shared into the inline runtime.

