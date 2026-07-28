import type { FindingDefinition } from '../../types.ts';

export const backupRecoveryFindings: FindingDefinition[] = [
  {
    id: 'backup-restore-untested',
    capabilityId: 'recovery-capability',
    title: 'Critical business data does not have tested backups',
    summary: 'Recovery capability has not been demonstrated through a successful restore test.',
    businessImpact: 'Confirms the business can recover data before an outage or ransomware event forces the issue.',
    severity: 'critical',
    conditionMode: 'any',
    conditions: [
      { questionId: 'bcdr-backup-test', operator: 'equals', value: 'never' },
      { questionId: 'bcdr-backup-test', operator: 'unknown' },
    ],
    recommendationIds: ['establish-recovery-testing'],
  },
  {
    id: 'recovery-ownership-undefined',
    capabilityId: 'recovery-capability',
    title: 'Recovery ownership is not clearly defined',
    summary: 'Critical systems lack clear recovery ownership or documented first steps.',
    businessImpact: 'Improves decision speed and accountability during outages.',
    severity: 'high',
    conditions: [{ questionId: 'bcdr-recovery-owner', operator: 'in', values: ['partial', 'no'] }],
    recommendationIds: ['document-recovery-ownership'],
  },
];
