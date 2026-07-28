import type { AssessmentCapability } from '../../types.ts';

export const recoveryRequirementsCapability: AssessmentCapability = {
  id: 'recovery-requirements',
  name: 'Recovery Requirements',
  description: 'Translation of business recovery priorities into measurable service, data, and technology requirements.',
  businessOutcome: 'Technology recovery investments are sized against approved business tolerances rather than guesses or vendor defaults.',
  domainId: 'business-continuity-resilience',
  primaryCategoryId: 'business-continuity',
  secondaryCategoryIds: ['governance-risk', 'technology-operations'],
  scoringModel: 'business-capability',
  foundational: true,
  questionIds: ['recovery-objectives-documented', 'recovery-objectives-validated'],
  findingIds: ['recovery-objectives-undefined', 'recovery-objectives-unvalidated'],
  recommendationIds: ['document-recovery-objectives', 'validate-recovery-objectives'],
  standardMappingIds: ['recovery-requirements-iso22301', 'recovery-requirements-nist', 'recovery-requirements-itil'],
};
