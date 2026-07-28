import type { CapabilityQuestion } from '../../types.ts';

export const backupRecoveryQuestions: CapabilityQuestion[] = [
  {
    id: 'bcdr-backup-test',
    capabilityId: 'recovery-capability',
    prompt: 'When was the last successful test of restoring critical business data from backup?',
    responseType: 'single-choice',
    options: [
      { id: 'never', label: 'Never', maturityScore: 0 },
      { id: 'over-year', label: 'More than a year ago', maturityScore: 1 },
      { id: 'year', label: 'Within the last year', maturityScore: 3 },
      { id: 'quarter', label: 'Within the last quarter', maturityScore: 4 },
      { id: 'routine', label: 'Tested routinely with documented results', maturityScore: 5 },
    ],
    allowUnknown: true,
    unknownBehavior: { type: 'visibility-finding', findingId: 'backup-restore-untested' },
    importance: 5,
    severity: 'critical',
    foundational: true,
    standardMappingIds: ['recovery-capability-iso-22301', 'recovery-capability-aws-wa'],
  },
  {
    id: 'bcdr-recovery-owner',
    capabilityId: 'recovery-capability',
    prompt: 'Is there a named owner and written recovery process for your most critical systems?',
    responseType: 'single-choice',
    options: [
      { id: 'yes', label: 'Yes', maturityScore: 4 },
      { id: 'partial', label: 'Partially', maturityScore: 2 },
      { id: 'no', label: 'No', maturityScore: 0 },
    ],
    allowUnknown: true,
    unknownBehavior: { type: 'provisional-score', score: 1, rationale: 'Unknown ownership can slow recovery during an incident.' },
    importance: 4,
    severity: 'high',
    standardMappingIds: ['recovery-capability-iso-22301', 'recovery-capability-itil'],
  },
];
