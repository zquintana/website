import type { AssessmentCapability } from '../../types.ts';

export const privilegedAccessCapability: AssessmentCapability = {
  id: 'privileged-access',
  name: 'Privileged Access Management',
  description: 'Protection and accountability for accounts that can administer critical systems.',
  businessOutcome: 'Administrative access is strongly protected, attributable, and less likely to become a business-wide incident path.',
  domainId: 'identity-access-management',
  primaryCategoryId: 'identity-access',
  secondaryCategoryIds: ['cybersecurity', 'governance-risk', 'business-continuity'],
  categoryContributions: [
    { categoryId: 'cybersecurity', contribution: 0.5 },
    { categoryId: 'governance-risk', contribution: 0.2 },
    { categoryId: 'business-continuity', contribution: 0.2 },
  ],
  scoringModel: 'control-status',
  questionIds: ['cyber-admin-mfa', 'iam-shared-admin'],
  findingIds: ['admin-mfa-missing', 'shared-admin-accounts-used'],
  recommendationIds: ['require-admin-mfa', 'eliminate-shared-admin-accounts'],
  standardMappingIds: ['privileged-access-cis', 'privileged-access-entra', 'privileged-access-iso27001'],
};
