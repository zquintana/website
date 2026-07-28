import type { CapabilityRecommendation } from '../../types.ts';

export const backupRecoveryRecommendations: CapabilityRecommendation[] = [
  {
    id: 'establish-recovery-testing',
    capabilityId: 'recovery-capability',
    title: 'Test backup restoration',
    summary: 'Demonstrate that critical business data can be restored from backup.',
    actions: ['Run and document a restore test for critical systems.', 'Schedule recurring restore tests.', 'Record owners, evidence, and remediation items.'],
    expectedOutcome: 'The business has evidence that critical data can be recovered when needed.',
    effort: 'moderate',
    targetWindow: 'immediate',
    standardMappingIds: ['recovery-capability-iso-22301', 'recovery-capability-aws-wa'],
  },
  {
    id: 'document-recovery-ownership',
    capabilityId: 'recovery-capability',
    title: 'Document recovery ownership',
    summary: 'Assign clear recovery owners and capture the initial recovery process.',
    actions: ['Assign recovery owners for critical systems.', 'Capture a first-hour recovery checklist.', 'Review ownership during business or vendor changes.'],
    expectedOutcome: 'Recovery decisions and responsibilities are clear before an incident occurs.',
    effort: 'low',
    targetWindow: '30-days',
    standardMappingIds: ['recovery-capability-iso-22301', 'recovery-capability-itil'],
  },
];
