import type { AssessmentCapability } from '../../types.ts';

export const technologyAssetInventoryCapability: AssessmentCapability = {
  id: 'technology-asset-inventory',
  name: 'Technology Asset Inventory',
  description: 'Visibility into the devices, systems, applications, and services that make up the business technology environment.',
  businessOutcome: 'The business can identify what it depends on, who owns it, and where unmanaged technology creates risk.',
  domainId: 'device-endpoint-management',
  primaryCategoryId: 'technology-operations',
  secondaryCategoryIds: ['cybersecurity'],
  scoringModel: 'process-maturity',
  foundational: true,
  questionIds: ['technology-asset-coverage', 'technology-asset-ownership', 'technology-asset-review'],
  findingIds: ['technology-asset-visibility-gap', 'technology-asset-ownership-gap', 'technology-asset-review-gap'],
  recommendationIds: ['establish-technology-asset-inventory', 'assign-technology-asset-owners', 'review-technology-asset-inventory'],
  standardMappingIds: ['technology-inventory-cis', 'technology-inventory-nist', 'technology-inventory-itil'],
};
