import type { StandardMapping } from '../../types.ts';

export const privilegedAccessStandardMappings: StandardMapping[] = [
  { id: 'privileged-access-cis', capabilityId: 'privileged-access', standardId: 'cis-controls', reference: 'Account management and access control safeguards', relationship: 'direct' },
  { id: 'privileged-access-entra', capabilityId: 'privileged-access', standardId: 'microsoft-entra', reference: 'Administrative MFA and privileged access recommendations', relationship: 'supporting' },
  { id: 'privileged-access-iso27001', capabilityId: 'privileged-access', standardId: 'iso-27001-concepts', reference: 'Privileged access and accountability concepts', relationship: 'supporting' },
];
