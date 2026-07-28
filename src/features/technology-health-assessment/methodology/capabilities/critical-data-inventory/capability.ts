import type { AssessmentCapability } from '../../types.ts';

export const criticalDataInventoryCapability: AssessmentCapability = {
  id: 'critical-data-inventory',
  name: 'Critical Data Inventory',
  description: 'Visibility into the information the business must protect, recover, and keep available to operate.',
  businessOutcome: 'The business knows which data matters most, where it resides, who owns it, and how it connects to critical services.',
  domainId: 'data-protection-information-management',
  primaryCategoryId: 'governance-risk',
  secondaryCategoryIds: ['cybersecurity'],
  scoringModel: 'process-maturity',
  foundational: true,
  questionIds: ['critical-data-coverage', 'critical-data-ownership', 'critical-data-review'],
  findingIds: ['critical-data-visibility-gap', 'critical-data-ownership-gap', 'critical-data-review-gap'],
  recommendationIds: ['establish-critical-data-inventory', 'assign-critical-data-owners', 'review-critical-data-inventory'],
  standardMappingIds: ['critical-data-cis', 'critical-data-nist', 'critical-data-iso27001'],
};
