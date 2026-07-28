import type { FindingDefinition } from '../../types.ts';

export const identityInventoryFindings: FindingDefinition[] = [
  {
    id: 'identity-inventory-visibility-gap',
    capabilityId: 'identity-inventory',
    title: 'Identity access is not fully visible',
    summary: 'The business cannot reliably identify all people and non-human identities that can access important systems.',
    businessImpact: 'Unknown identities can increase account takeover, insider, and recovery risk.',
    severity: 'high',
    conditions: [{ questionId: 'identity-inventory-coverage', operator: 'in', values: ['unknown', 'informal'] }],
    recommendationIds: ['establish-identity-inventory'],
  },
  {
    id: 'identity-inventory-ownership-gap',
    capabilityId: 'identity-inventory',
    title: 'Identity ownership is not clearly assigned',
    summary: 'Important identities or identity systems do not have consistently recorded owners.',
    businessImpact: 'Access decisions and incident response may stall because accountability is unclear.',
    severity: 'high',
    conditions: [{ questionId: 'identity-inventory-ownership', operator: 'in', values: ['unknown', 'informal'] }],
    recommendationIds: ['assign-identity-owners'],
  },
  {
    id: 'identity-inventory-review-gap',
    capabilityId: 'identity-inventory',
    title: 'Identity inventory is not routinely reviewed',
    summary: 'Dormant, orphaned, duplicate, or unexpected identities are not consistently identified and addressed.',
    businessImpact: 'Unnecessary access may persist until it becomes a security or operational problem.',
    severity: 'high',
    conditions: [{ questionId: 'identity-inventory-review', operator: 'in', values: ['unknown', 'informal'] }],
    recommendationIds: ['review-identity-inventory'],
  },
];
