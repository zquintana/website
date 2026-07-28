import type { CapabilityRecommendation } from '../../types.ts';

export const privilegedAccessRecommendations: CapabilityRecommendation[] = [
  {
    id: 'require-admin-mfa',
    capabilityId: 'privileged-access',
    title: 'Require MFA for administrative access',
    summary: 'Require strong multi-factor authentication for accounts with administrative privileges.',
    actions: ['Enable MFA for all administrative accounts.', 'Review and document exceptions monthly.', 'Prioritize cloud, email, finance, and remote access administrators.'],
    expectedOutcome: 'Administrative access is less likely to be compromised through a stolen password.',
    effort: 'low',
    targetWindow: 'immediate',
    standardMappingIds: ['privileged-access-cis', 'privileged-access-entra'],
  },
  {
    id: 'eliminate-shared-admin-accounts',
    capabilityId: 'privileged-access',
    title: 'Eliminate shared administrator accounts',
    summary: 'Move administrative activity to named accounts with appropriate emergency access controls.',
    actions: ['Identify shared administrator accounts.', 'Move administrators to named accounts.', 'Retain emergency access separately and monitor its use.'],
    expectedOutcome: 'Administrative actions are attributable and broad password-sharing risk is reduced.',
    effort: 'moderate',
    targetWindow: '30-days',
    standardMappingIds: ['privileged-access-cis', 'privileged-access-iso27001'],
  },
];
