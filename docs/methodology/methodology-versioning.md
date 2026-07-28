# Methodology versioning

The project uses semantic-looking versions for authored methodology (`0.1.0`) and a separate legacy local-session format (`mvp-1`). They must not be conflated. Published versions should be immutable, loadable by exact version, and reproducible from their content and a real content hash. The current hash is `methodology-0.1.0-hash-placeholder`, so historical reproducibility is not yet implemented.

Recommended policy: patch for wording/typographical corrections that do not change interpretation; minor for additive optional capabilities, recommendations, or evidence guidance; major for scoring semantics, category weights, interpretation changes, or replacement/renaming of existing IDs. Draft and demonstration versions may change, but a customer-facing published version may not.

Question, capability, finding, recommendation, and mapping IDs remain stable across compatible versions. Replacements require an explicit migration map. Saved sessions must retain methodology version and hash; loading an old session must either load its exact historical manifest or run a tested migration. Today `parseAssessment()` accepts only `mvp-1` and rejects other versions; no migration function exists.

Changing `0.1.0` content without changing its version is therefore unsafe once results are customer-facing. Before publishing, freeze the manifest, generate a real hash, add fixture loading and migration tests, communicate score changes, and retain old reports.

