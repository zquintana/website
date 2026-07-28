import type { FindingDefinition } from '../../types.ts';

export const recoveryRequirementsFindings: FindingDefinition[] = [
  {
    id: 'recovery-objectives-undefined',
    capabilityId: 'recovery-requirements',
    title: 'Recovery objectives are not clearly defined',
    summary: 'The business has not consistently documented how quickly critical services must recover or how much data loss is acceptable.',
    businessImpact: 'Recovery investments may not match actual business needs, increasing either outage impact or unnecessary cost.',
    severity: 'high',
    conditions: [{ questionId: 'recovery-objectives-documented', operator: 'in', values: ['unknown', 'informal'] }],
    recommendationIds: ['document-recovery-objectives'],
  },
  {
    id: 'recovery-objectives-unvalidated',
    capabilityId: 'recovery-requirements',
    title: 'Recovery objectives have not been demonstrated',
    summary: 'Approved recovery targets have not been compared with actual restore, failover, or provider performance.',
    businessImpact: 'The business may believe it can recover within an acceptable window without evidence that the target is achievable.',
    severity: 'high',
    conditions: [{ questionId: 'recovery-objectives-validated', operator: 'in', values: ['unknown', 'informal'] }],
    recommendationIds: ['validate-recovery-objectives'],
  },
];
