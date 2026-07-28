import type { AssessmentCapability } from '../../types.ts';

export const backupRecoveryCapability: AssessmentCapability = {
  id: 'recovery-capability',
  name: 'Recovery Capability',
  description: 'Ability to restore critical business data and systems after loss, outage, or corruption.',
  businessOutcome: 'The business can recover critical information and resume operations within acceptable timeframes.',
  domainId: 'data-protection-information-management',
  primaryCategoryId: 'business-continuity',
  secondaryCategoryIds: ['technology-operations', 'governance-risk'],
  categoryContributions: [
    { categoryId: 'technology-operations', contribution: 0.3 },
    { categoryId: 'governance-risk', contribution: 0.2 },
  ],
  scoringModel: 'business-capability',
  questionIds: ['bcdr-backup-test', 'bcdr-recovery-owner'],
  findingIds: ['backup-restore-untested', 'recovery-ownership-undefined'],
  recommendationIds: ['establish-recovery-testing', 'document-recovery-ownership'],
  standardMappingIds: ['recovery-capability-iso-22301', 'recovery-capability-aws-wa', 'recovery-capability-itil'],
};
