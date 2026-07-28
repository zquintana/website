# Persistence and compatibility

The current browser record uses localStorage key `technology-health-assessment:v1` and session `version: "mvp-1"`. A representative record is:

```json
{
  "assessmentId": "tha-lx1abc-def456",
  "version": "mvp-1",
  "startedAt": "2026-07-27T18:00:00.000Z",
  "lastUpdatedAt": "2026-07-27T18:05:00.000Z",
  "status": "in-progress",
  "businessProfile": {"businessName":"Example Co","respondentName":"Alex Example","respondentEmail":"alex@example.com"},
  "answers": {"cyber-admin-mfa":{"questionId":"cyber-admin-mfa","value":"yes","evidenceLevel":"self-reported","notes":""}},
  "currentCategoryId":"cybersecurity"
}
```

`serializeAssessment()` refreshes `lastUpdatedAt`; `parseAssessment()` rejects malformed JSON, missing identity/profile/answers, or any version other than `mvp-1`; `clearAssessment()` removes the one key. No methodology hash is persisted. The compatibility adapter is `createAssessmentReadModel()`: it is a temporary internal bridge from modular capability data to the flat legacy UI shape, not a stable public API.

There are no migrations, historical loaders, corruption recovery beyond returning null, server backup, encryption, evidence-file storage, or multi-assessment storage. The target data model must support repeat assessments and prior-assessment relationships even though the baseline MVP currently supports only one local record. The profile includes an email and free-text business context, so privacy messaging and a retention policy are needed before production. Reset is destructive to the one local record and is initiated by the user.
