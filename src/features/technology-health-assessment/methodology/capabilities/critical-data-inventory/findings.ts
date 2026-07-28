import type { FindingDefinition } from '../../types.ts';

export const criticalDataInventoryFindings: FindingDefinition[] = [
  {
    id: 'critical-data-visibility-gap',
    capabilityId: 'critical-data-inventory',
    title: 'Critical business data is not fully visible',
    summary: 'The business cannot reliably identify the data it must protect, recover, or keep available.',
    businessImpact: 'Important data may be missed by backup, recovery, security, retention, or modernization decisions.',
    severity: 'high',
    conditions: [{ questionId: 'critical-data-coverage', operator: 'in', values: ['unknown', 'informal'] }],
    recommendationIds: ['establish-critical-data-inventory'],
  },
  {
    id: 'critical-data-ownership-gap',
    capabilityId: 'critical-data-inventory',
    title: 'Critical data lacks clear business ownership',
    summary: 'Important data sets do not have consistently recorded business owners.',
    businessImpact: 'Access, protection, retention, and recovery decisions may be delayed or made without accountable business input.',
    severity: 'high',
    conditions: [{ questionId: 'critical-data-ownership', operator: 'in', values: ['unknown', 'informal'] }],
    recommendationIds: ['assign-critical-data-owners'],
  },
  {
    id: 'critical-data-review-gap',
    capabilityId: 'critical-data-inventory',
    title: 'Critical data inventory is not routinely reviewed',
    summary: 'New data locations, duplicate copies, and changing business needs are not consistently identified.',
    businessImpact: 'The business may protect outdated locations while missing new or unmanaged copies of important information.',
    severity: 'moderate',
    conditions: [{ questionId: 'critical-data-review', operator: 'in', values: ['unknown', 'informal'] }],
    recommendationIds: ['review-critical-data-inventory'],
  },
];
