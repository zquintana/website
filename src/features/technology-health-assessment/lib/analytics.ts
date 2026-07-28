export type AssessmentEventName =
  | 'Assessment started'
  | 'Business profile completed'
  | 'Category started'
  | 'Category completed'
  | 'Assessment abandoned'
  | 'Assessment completed'
  | 'Report viewed'
  | 'Consultation requested';

export function trackAssessmentEvent(eventName: AssessmentEventName, metadata: Record<string, string | number | boolean> = {}): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('assessment:event', { detail: { eventName, metadata } }));
}
