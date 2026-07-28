import type { CapabilityRecommendation } from '../../types.ts';

export const criticalDataInventoryRecommendations: CapabilityRecommendation[] = [
  {
    id: 'establish-critical-data-inventory',
    capabilityId: 'critical-data-inventory',
    title: 'Establish a critical-data inventory',
    summary: 'Create a practical record of the data sets the business must protect, recover, and keep available.',
    actions: ['Start with data supporting the most critical business services.', 'Record business purpose, storage locations, processing vendors, and criticality.', 'Connect the inventory to backup, recovery, access, and retention reviews.'],
    expectedOutcome: 'Protection and recovery decisions include the data that matters most to the business.',
    effort: 'moderate',
    targetWindow: '30-days',
    standardMappingIds: ['critical-data-cis', 'critical-data-nist'],
  },
  {
    id: 'assign-critical-data-owners',
    capabilityId: 'critical-data-inventory',
    title: 'Assign critical-data owners',
    summary: 'Assign business owners who can make decisions about access, protection, retention, and recovery.',
    actions: ['Identify critical data without accountable owners.', 'Assign ownership to business leaders rather than only technical custodians.', 'Include ownership review in major process, vendor, and system changes.'],
    expectedOutcome: 'Important data decisions have accountable business sponsorship.',
    effort: 'low',
    targetWindow: '30-days',
    standardMappingIds: ['critical-data-cis', 'critical-data-iso27001'],
  },
  {
    id: 'review-critical-data-inventory',
    capabilityId: 'critical-data-inventory',
    title: 'Review critical-data locations and copies',
    summary: 'Review the inventory for new storage locations, duplicate copies, and changes in business importance.',
    actions: ['Set a recurring review schedule.', 'Compare known data locations with major platforms, vendors, and business processes.', 'Track unresolved copies, ownership gaps, and protection actions.'],
    expectedOutcome: 'The data inventory stays useful as the business, technology, and vendors change.',
    effort: 'moderate',
    targetWindow: '90-days',
    standardMappingIds: ['critical-data-cis', 'critical-data-nist'],
  },
];
