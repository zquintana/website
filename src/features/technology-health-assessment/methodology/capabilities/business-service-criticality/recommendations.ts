import type { CapabilityRecommendation } from '../../types.ts';

export const businessServiceCriticalityRecommendations: CapabilityRecommendation[] = [
  {
    id: 'identify-critical-business-services',
    capabilityId: 'business-service-criticality',
    title: 'Create a critical-service register',
    summary: 'Facilitate a short leadership workshop to identify and rank the services the business must protect first.',
    actions: ['List revenue-producing, customer-facing, safety, legal, and essential internal services.', 'Assign a business owner and relative priority to each service.', 'Review the register at least annually and after major business changes.'],
    expectedOutcome: 'Leaders and technology teams share a practical definition of what must be protected and recovered first.',
    effort: 'moderate',
    targetWindow: '30-days',
    standardMappingIds: ['business-criticality-iso22301', 'business-criticality-nist'],
  },
  {
    id: 'document-service-dependencies',
    capabilityId: 'business-service-criticality',
    title: 'Map critical-service dependencies',
    summary: 'Document the major applications, vendors, data, infrastructure, and people required by each critical service.',
    actions: ['Start with the top three critical services.', 'Record owners and single points of failure.', 'Use the map to guide recovery testing and technology investment decisions.'],
    expectedOutcome: 'Incident and recovery decisions account for the dependencies that can prevent a service from operating.',
    effort: 'high',
    targetWindow: '90-days',
    standardMappingIds: ['business-criticality-iso22301', 'business-criticality-itil'],
  },
  {
    id: 'define-business-recovery-priorities',
    capabilityId: 'business-service-criticality',
    title: 'Approve recovery priorities and interruption tolerances',
    summary: 'Have business owners define which services recover first and how long each can be unavailable.',
    actions: ['Set practical recovery priority tiers.', 'Document acceptable interruption times with business owners.', 'Validate priorities during continuity exercises or major changes.'],
    expectedOutcome: 'Recovery investments and incident decisions are tied to explicit business impact.',
    effort: 'moderate',
    targetWindow: '30-days',
    standardMappingIds: ['business-criticality-iso22301', 'business-criticality-nist'],
  },
];
