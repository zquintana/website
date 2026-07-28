# Release and migration guide

Before release, assemble the new version, validate it, run tests/build, review score and finding diffs, update the active-version page, and freeze the previous published manifest. A real content hash and immutable artifact are required before calling a version published.

Saved sessions currently identify `mvp-1`, not methodology `0.1.0`, and exact-version parsing rejects other values. Therefore there is no supported migration path today: changing the active question set can make an existing record unreadable. The next implementation should persist both session format and methodology version/hash, provide explicit ID migration maps, retain historical manifests, and test successful, failed, and rollback migrations.

Historical reports must retain the version and hash used to calculate them. Score changes should be communicated as methodology changes, not silently recomputed. Capability/question deprecation means retain old IDs for historical loading and stop adding them to new versions; replacement requires a map and compatibility test. Failed migration should preserve the original record, surface a recoverable error, and never partially overwrite it.

