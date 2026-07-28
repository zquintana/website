import type { AssessmentCapability } from '../../types.ts';

export const identityInventoryCapability: AssessmentCapability = {
  id: 'identity-inventory',
  name: 'Identity Inventory',
  description: 'Visibility into the people, administrators, service accounts, and external identities that can access business technology.',
  businessOutcome: 'The business can identify who and what has access, who owns those identities, and where access visibility is incomplete.',
  domainId: 'identity-access-management',
  primaryCategoryId: 'identity-access',
  secondaryCategoryIds: ['cybersecurity'],
  scoringModel: 'process-maturity',
  foundational: true,
  questionIds: ['identity-inventory-coverage', 'identity-inventory-ownership', 'identity-inventory-review'],
  findingIds: ['identity-inventory-visibility-gap', 'identity-inventory-ownership-gap', 'identity-inventory-review-gap'],
  recommendationIds: ['establish-identity-inventory', 'assign-identity-owners', 'review-identity-inventory'],
  standardMappingIds: ['identity-inventory-cis', 'identity-inventory-nist', 'identity-inventory-entra'],
};
