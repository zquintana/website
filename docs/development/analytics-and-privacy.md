# Analytics and Privacy

The site uses an optional, consent-gated Google Analytics 4 integration. It is disabled unless `PUBLIC_GA_MEASUREMENT_ID` is configured at build time. Copy `.env.example` to the deployment environment and replace the placeholder with the GA4 measurement ID when the property is ready.

## Consent behavior

No Google Analytics script is loaded before the visitor makes an explicit choice. **Accept analytics** stores an `accepted` choice in local storage and loads GA4. **Decline** stores `rejected` and does not load GA4. The Privacy settings button lets the visitor reopen the choice. The banner and storage key are versioned so the consent behavior can be revised later.

GA4 is configured with Google signals and ad personalization disabled. The site forwards only page views and a small allowlist of health-check lifecycle events. It does not send assessment answer text, free-form messages, contact details, or evidence to analytics. Form submissions go to Formspree separately and include only the documented result summary metadata.

## Events

The health-check UI emits internal `health-check:event` events. The consent component forwards these after acceptance:

- `health_check_started`
- `health_check_resumed`
- `health_check_question_reached` with a question ID
- `health_check_completed` with an answer count
- `health_check_results_viewed` with rating and confidence
- `health_check_cta_selected` with rating and confidence
- `health_check_contact_form_opened` with rating
- `health_check_contact_submitted` with rating and confidence

Question IDs and result labels are operational metadata, not answer content. Do not add raw answers, names, email addresses, message text, or evidence to analytics events.

## Operational checklist

Before enabling production tracking:

1. Create or confirm the GA4 property and measurement ID.
2. Set `PUBLIC_GA_MEASUREMENT_ID` in the deployment environment; do not commit a secret or local `.env` file.
3. Confirm the privacy notice, retention settings, and applicable consent requirements for the intended audience.
4. Test Accept, Decline, and Privacy settings in a clean browser profile.
5. Confirm events in GA4 DebugView without submitting personal information.

The current implementation is intentionally lightweight. If legal requirements or audience geography require a consent-management platform, replace this banner with the approved platform before enabling tracking.
