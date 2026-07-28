import type { StandardMapping } from '../../types.ts';

export const technologyAssetInventoryStandardMappings: StandardMapping[] = [
  { id: 'technology-inventory-cis', capabilityId: 'technology-asset-inventory', standardId: 'cis-controls', reference: 'Enterprise asset inventory and software asset inventory practices', relationship: 'direct' },
  { id: 'technology-inventory-nist', capabilityId: 'technology-asset-inventory', standardId: 'nist-csf-2', reference: 'Asset management and technology resource visibility', relationship: 'supporting' },
  { id: 'technology-inventory-itil', capabilityId: 'technology-asset-inventory', standardId: 'itil', reference: 'Service configuration, ownership, and lifecycle practices', relationship: 'supporting' },
];
