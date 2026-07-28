import type { CapabilityRecommendation } from '../../types.ts';

export const identityInventoryRecommendations: CapabilityRecommendation[] = [
  {
    id: 'establish-identity-inventory',
    capabilityId: 'identity-inventory',
    title: 'Establish an identity inventory',
    summary: 'Create one practical view of human, administrative, service, guest, and external identities.',
    actions: ['Identify the main identity providers and business systems.', 'Export or record relevant identity populations and account types.', 'Reconcile the inventory against systems that contain sensitive or critical information.'],
    expectedOutcome: 'Leaders and technology teams can see who and what can access important business systems.',
    effort: 'moderate',
    targetWindow: '30-days',
    standardMappingIds: ['identity-inventory-cis', 'identity-inventory-nist'],
  },
  {
    id: 'assign-identity-owners',
    capabilityId: 'identity-inventory',
    title: 'Assign identity ownership',
    summary: 'Assign accountable owners for identity providers, administrative accounts, service accounts, and access decisions.',
    actions: ['Identify identities and identity systems without owners.', 'Assign business and operational accountability.', 'Use ownership records during access reviews, incidents, and personnel changes.'],
    expectedOutcome: 'Identity decisions have clear accountability and do not depend on undocumented individual knowledge.',
    effort: 'low',
    targetWindow: '30-days',
    standardMappingIds: ['identity-inventory-cis', 'identity-inventory-entra'],
  },
  {
    id: 'review-identity-inventory',
    capabilityId: 'identity-inventory',
    title: 'Review and reconcile identities',
    summary: 'Perform scheduled reviews for dormant, orphaned, duplicate, and unexpected identities.',
    actions: ['Set a review schedule appropriate to identity risk.', 'Compare identity provider records with important business systems.', 'Track removals, exceptions, and unresolved ownership gaps.'],
    expectedOutcome: 'Unnecessary or unexplained access is identified before it creates a business incident.',
    effort: 'moderate',
    targetWindow: '90-days',
    standardMappingIds: ['identity-inventory-cis', 'identity-inventory-nist'],
  },
];
