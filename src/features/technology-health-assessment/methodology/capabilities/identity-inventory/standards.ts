import type { StandardMapping } from '../../types.ts';

export const identityInventoryStandardMappings: StandardMapping[] = [
  { id: 'identity-inventory-cis', capabilityId: 'identity-inventory', standardId: 'cis-controls', reference: 'Account management and inventory of authorized accounts', relationship: 'direct' },
  { id: 'identity-inventory-nist', capabilityId: 'identity-inventory', standardId: 'nist-csf-2', reference: 'Identity management, authentication, and access control context', relationship: 'supporting' },
  { id: 'identity-inventory-entra', capabilityId: 'identity-inventory', standardId: 'microsoft-entra', reference: 'Identity governance and account visibility recommendations', relationship: 'supporting' },
];
