import type { FindingDefinition } from '../../types.ts';

export const identityLifecycleFindings: FindingDefinition[] = [
  {
    id: 'access-offboarding-delayed',
    capabilityId: 'identity-lifecycle',
    title: 'Former employees or contractors may retain access',
    summary: 'Access removal is not tracked or may be delayed after a person leaves.',
    businessImpact: 'Reduces insider and account takeover risk after role changes or departures.',
    severity: 'critical',
    conditionMode: 'any',
    conditions: [
      { questionId: 'iam-offboarding', operator: 'in', values: ['unknown', 'manual'] },
      { questionId: 'iam-offboarding', operator: 'unknown' },
    ],
    recommendationIds: ['tighten-access-offboarding'],
  },
];
