import type { StandardMapping } from '../../types.ts';

export const criticalDataInventoryStandardMappings: StandardMapping[] = [
  { id: 'critical-data-cis', capabilityId: 'critical-data-inventory', standardId: 'cis-controls', reference: 'Data management and protection inventory practices', relationship: 'direct' },
  { id: 'critical-data-nist', capabilityId: 'critical-data-inventory', standardId: 'nist-csf-2', reference: 'Data security, asset management, and organizational context', relationship: 'supporting' },
  { id: 'critical-data-iso27001', capabilityId: 'critical-data-inventory', standardId: 'iso-27001-concepts', reference: 'Information asset ownership and protection concepts', relationship: 'supporting' },
];
