import type { FindingDefinition } from '../../types.ts';

export const technologyAssetInventoryFindings: FindingDefinition[] = [
  {
    id: 'technology-asset-visibility-gap',
    capabilityId: 'technology-asset-inventory',
    title: 'Technology dependencies are not fully visible',
    summary: 'The business cannot reliably identify the technology it depends on.',
    businessImpact: 'Unknown or unmanaged technology can create security exposure, recovery gaps, duplicate spending, and avoidable operational surprises.',
    severity: 'high',
    conditions: [{ questionId: 'technology-asset-coverage', operator: 'in', values: ['unknown', 'informal'] }],
    recommendationIds: ['establish-technology-asset-inventory'],
  },
  {
    id: 'technology-asset-ownership-gap',
    capabilityId: 'technology-asset-inventory',
    title: 'Important technology lacks accountable ownership',
    summary: 'Important technology assets or services do not have reliably recorded business or operational owners.',
    businessImpact: 'Incidents, renewals, changes, and risk decisions may stall because nobody is clearly accountable.',
    severity: 'high',
    conditions: [{ questionId: 'technology-asset-ownership', operator: 'in', values: ['unknown', 'informal'] }],
    recommendationIds: ['assign-technology-asset-owners'],
  },
  {
    id: 'technology-asset-review-gap',
    capabilityId: 'technology-asset-inventory',
    title: 'Technology inventory is not driving lifecycle decisions',
    summary: 'Unsupported, duplicate, or unmanaged technology is not consistently identified and addressed.',
    businessImpact: 'The business may carry avoidable cost and risk or discover lifecycle problems only after they cause disruption.',
    severity: 'moderate',
    conditions: [{ questionId: 'technology-asset-review', operator: 'in', values: ['unknown', 'informal'] }],
    recommendationIds: ['review-technology-asset-inventory'],
  },
];
