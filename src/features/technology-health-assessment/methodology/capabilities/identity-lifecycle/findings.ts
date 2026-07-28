import type { FindingDefinition } from '../../types.ts';

export const identityLifecycleFindings: FindingDefinition[] = [
  {
    id: 'access-offboarding-delayed',
    capabilityId: 'identity-lifecycle',
    title: 'Former employees or contractors may retain access',
    summary: 'Access removal is not tracked or may be delayed after a person leaves.',
    businessImpact: 'Reduces insider and account takeover risk after role changes or departures.',
    severity: 'critical',
    conditions: [{ questionId: 'iam-offboarding', operator: 'in', values: ['manual'] }],
    recommendationIds: ['tighten-access-offboarding'],
  },
  {
    id: 'access-offboarding-visibility',
    capabilityId: 'identity-lifecycle',
    title: 'Access-offboarding practice is not verified',
    summary: 'The assessment could not confirm how quickly former workers lose access to business systems.',
    businessImpact: 'Creates a visibility gap around a common account takeover and insider-risk path.',
    severity: 'high',
    conditions: [{ questionId: 'iam-offboarding', operator: 'unknown' }],
    recommendationIds: ['tighten-access-offboarding'],
  },
];
