import type { StandardMapping } from '../../types.ts';

export const identityLifecycleStandardMappings: StandardMapping[] = [
  { id: 'identity-lifecycle-cis', capabilityId: 'identity-lifecycle', standardId: 'cis-controls', reference: 'Account management and access removal practices', relationship: 'direct' },
  { id: 'identity-lifecycle-entra', capabilityId: 'identity-lifecycle', standardId: 'microsoft-entra', reference: 'User lifecycle and access review recommendations', relationship: 'supporting' },
  { id: 'identity-lifecycle-google', capabilityId: 'identity-lifecycle', standardId: 'google-workspace-security', reference: 'User lifecycle and account security recommendations', relationship: 'supporting' },
];
