import type { CapabilityRecommendation } from '../../types.ts';

export const identityLifecycleRecommendations: CapabilityRecommendation[] = [
  {
    id: 'tighten-access-offboarding',
    capabilityId: 'identity-lifecycle',
    title: 'Tighten access offboarding',
    summary: 'Create a reliable same-day access removal process for workers who leave or change roles.',
    actions: ['Create a same-day offboarding checklist.', 'Include email, productivity, finance, cloud, and line-of-business systems.', 'Verify completion and retain evidence.'],
    expectedOutcome: 'Former employees and contractors do not retain unnecessary access to business systems.',
    effort: 'moderate',
    targetWindow: 'immediate',
    standardMappingIds: ['identity-lifecycle-cis', 'identity-lifecycle-entra', 'identity-lifecycle-google'],
  },
];
