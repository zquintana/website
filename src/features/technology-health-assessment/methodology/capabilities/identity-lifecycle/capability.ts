import type { AssessmentCapability } from '../../types.ts';

export const identityLifecycleCapability: AssessmentCapability = {
  id: 'identity-lifecycle',
  name: 'Identity Lifecycle Management',
  description: 'Management of access when people join, move within, or leave the business.',
  businessOutcome: 'Only appropriate current workers retain access to business systems.',
  domainId: 'identity-access-management',
  primaryCategoryId: 'identity-access',
  secondaryCategoryIds: ['cybersecurity', 'governance-risk'],
  categoryContributions: [
    { categoryId: 'cybersecurity', contribution: 0.4 },
    { categoryId: 'governance-risk', contribution: 0.3 },
  ],
  scoringModel: 'process-maturity',
  questionIds: ['iam-offboarding'],
  findingIds: ['access-offboarding-delayed'],
  recommendationIds: ['tighten-access-offboarding'],
  standardMappingIds: ['identity-lifecycle-cis', 'identity-lifecycle-entra', 'identity-lifecycle-google'],
};
