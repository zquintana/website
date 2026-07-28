import type { StandardMapping } from '../../types.ts';

export const businessServiceCriticalityStandardMappings: StandardMapping[] = [
  { id: 'business-criticality-iso22301', capabilityId: 'business-service-criticality', standardId: 'iso-22301', reference: 'Business impact analysis and continuity priorities', relationship: 'direct' },
  { id: 'business-criticality-nist', capabilityId: 'business-service-criticality', standardId: 'nist-csf-2', reference: 'Organizational context, critical objectives, and risk-informed prioritization', relationship: 'supporting' },
  { id: 'business-criticality-itil', capabilityId: 'business-service-criticality', standardId: 'itil', reference: 'Service value, service continuity, and business relationship practices', relationship: 'supporting' },
];
