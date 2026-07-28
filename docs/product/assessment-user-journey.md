# Assessment user journey

| Step | Expected behavior | Current status |
| --- | --- | --- |
| 1. Start | Landing page explains purpose and disclaimer; user starts or resumes | Implemented |
| 2. Business profile | Capture required identity/contact and optional company, technology, concern, and critical-system context | Implemented |
| 3. Applicability | Determine whether a capability/question applies | Planned; no applicability engine |
| 4. Important services | Identify critical business services and recovery needs | Planned; currently free-text critical systems only |
| 5. Capability questions | Present category-ordered read-model questions | Implemented, with migrated and legacy questions |
| 6. Unknown/N/A | Capture unknown and N/A statuses where question metadata allows | UI supports both paths, but active questions do not currently enable N/A |
| 7. Evidence | Select evidence level and enter notes | Implemented; no evidence artifacts |
| 8. Health | Calculate question, category, and overall scores | Implemented in browser and exported library |
| 9. Findings/risk | Generate prioritized findings and recommendations | Implemented through legacy question rules; modular condition engine is not wired |
| 10. Confidence | Average evidence confidence | Implemented; no low-confidence score suppression |
| 11. Report categories | Aggregate by primary category and category weight | Implemented; cross-category capability contributions are not used |
| 12. Roadmap | Show recommendations/timeframes and strengths | Implemented as finding timeframes; no separate roadmap entity |
| 13. Save/resume/export | Save locally, resume, print, and send consultation email | Local save/resume and print implemented; no file export or server save |

Edge cases: missing answers score as unknown with confidence 0; unknown behavior is question-specific; N/A is excluded only when allowed; interruption is recoverable from localStorage; a version mismatch is rejected and cannot be migrated; contradictory evidence is not automatically resolved; multiple findings may be emitted independently; foundational metadata exists but does not alter aggregation in current code.

