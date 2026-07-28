import type { FindingDefinition } from '../../types.ts';

export const privilegedAccessFindings: FindingDefinition[] = [
  {
    id: 'admin-mfa-missing',
    capabilityId: 'privileged-access',
    title: 'Administrative accounts are not protected by MFA',
    summary: 'Administrative access lacks a foundational safeguard against stolen passwords.',
    businessImpact: 'Reduces the likelihood that a stolen password becomes a major incident.',
    severity: 'critical',
    conditions: [{ questionId: 'cyber-admin-mfa', operator: 'equals', value: 'no' }],
    recommendationIds: ['require-admin-mfa'],
  },
  {
    id: 'admin-mfa-visibility',
    capabilityId: 'privileged-access',
    title: 'Administrative MFA coverage is not verified',
    summary: 'The assessment could not confirm whether administrative accounts use multi-factor authentication.',
    businessImpact: 'Creates a visibility gap around a high-impact account compromise path.',
    severity: 'high',
    conditions: [{ questionId: 'cyber-admin-mfa', operator: 'unknown' }],
    recommendationIds: ['require-admin-mfa'],
  },
  {
    id: 'shared-admin-accounts-used',
    capabilityId: 'privileged-access',
    title: 'Shared administrator accounts are in use',
    summary: 'Administrative activity may not be attributable to named people.',
    businessImpact: 'Improves accountability and reduces broad password-sharing risk.',
    severity: 'high',
    conditions: [{ questionId: 'iam-shared-admin', operator: 'equals', value: 'yes' }],
    recommendationIds: ['eliminate-shared-admin-accounts'],
  },
  {
    id: 'shared-admin-visibility',
    capabilityId: 'privileged-access',
    title: 'Shared administrator account use is not verified',
    summary: 'The assessment could not confirm whether administrative activity is attributable to named people.',
    businessImpact: 'Creates a visibility gap around accountability and emergency access practices.',
    severity: 'moderate',
    conditions: [{ questionId: 'iam-shared-admin', operator: 'unknown' }],
    recommendationIds: ['eliminate-shared-admin-accounts'],
  },
];
