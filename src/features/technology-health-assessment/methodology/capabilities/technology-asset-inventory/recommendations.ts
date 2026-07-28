import type { CapabilityRecommendation } from '../../types.ts';

export const technologyAssetInventoryRecommendations: CapabilityRecommendation[] = [
  {
    id: 'establish-technology-asset-inventory',
    capabilityId: 'technology-asset-inventory',
    title: 'Establish a technology asset inventory',
    summary: 'Create one practical inventory of the technology and services the business depends on.',
    actions: ['Start with critical endpoints, applications, cloud services, vendors, and infrastructure.', 'Record business purpose, owner, lifecycle status, and criticality.', 'Reconcile the inventory against available provider or management reports.'],
    expectedOutcome: 'Leaders and technology teams can see the technology environment that supports the business.',
    effort: 'moderate',
    targetWindow: '30-days',
    standardMappingIds: ['technology-inventory-cis', 'technology-inventory-nist'],
  },
  {
    id: 'assign-technology-asset-owners',
    capabilityId: 'technology-asset-inventory',
    title: 'Assign accountable technology owners',
    summary: 'Assign business and operational owners for important technology assets and services.',
    actions: ['Identify assets without a clear owner.', 'Assign a business owner and an operational contact where they differ.', 'Review ownership during renewals, changes, and incidents.'],
    expectedOutcome: 'Technology decisions and incidents have clear accountability.',
    effort: 'low',
    targetWindow: '30-days',
    standardMappingIds: ['technology-inventory-cis', 'technology-inventory-itil'],
  },
  {
    id: 'review-technology-asset-inventory',
    capabilityId: 'technology-asset-inventory',
    title: 'Use inventory reviews to manage lifecycle risk',
    summary: 'Review the inventory for unsupported, duplicate, unmanaged, and unnecessary technology.',
    actions: ['Schedule a quarterly or semiannual inventory review.', 'Record unsupported or unmanaged assets as risks with owners and dates.', 'Use findings to guide renewals, modernization, and security priorities.'],
    expectedOutcome: 'Technology lifecycle and investment decisions are based on current evidence.',
    effort: 'moderate',
    targetWindow: '90-days',
    standardMappingIds: ['technology-inventory-cis', 'technology-inventory-nist'],
  },
];
