import type { AssessmentState, BusinessProfile } from '../types.ts';

export const assessmentVersion = 'mvp-1';
export const storageKey = 'technology-health-assessment:v1';

const emptyProfile: BusinessProfile = {
  businessName: '',
  respondentName: '',
  respondentEmail: '',
};

export function createAssessmentState(profile: Partial<BusinessProfile> = {}): AssessmentState {
  const now = new Date().toISOString();
  return {
    assessmentId: `tha-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    version: assessmentVersion,
    startedAt: now,
    lastUpdatedAt: now,
    status: 'in-progress',
    businessProfile: { ...emptyProfile, ...profile },
    answers: {},
  };
}

export function serializeAssessment(state: AssessmentState): string {
  return JSON.stringify({ ...state, lastUpdatedAt: new Date().toISOString() });
}

export function parseAssessment(raw: string | null): AssessmentState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as AssessmentState;
    if (!parsed || parsed.version !== assessmentVersion || !parsed.assessmentId || !parsed.answers || !parsed.businessProfile) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function loadAssessment(): AssessmentState | null {
  if (typeof localStorage === 'undefined') return null;
  return parseAssessment(localStorage.getItem(storageKey));
}

export function saveAssessment(state: AssessmentState): AssessmentState {
  const next = { ...state, lastUpdatedAt: new Date().toISOString() };
  if (typeof localStorage !== 'undefined') localStorage.setItem(storageKey, serializeAssessment(next));
  return next;
}

export function clearAssessment(): void {
  if (typeof localStorage !== 'undefined') localStorage.removeItem(storageKey);
}
