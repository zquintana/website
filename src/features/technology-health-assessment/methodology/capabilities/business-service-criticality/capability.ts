import type { AssessmentCapability } from '../../types.ts';

export const businessServiceCriticalityCapability: AssessmentCapability = {
  id: 'business-service-criticality',
  name: 'Business Service Criticality',
  description: 'Identification and prioritization of the services whose disruption would materially affect the business.',
  businessOutcome: 'Leaders and technology teams agree which services must be protected and recovered first.',
  domainId: 'business-alignment',
  primaryCategoryId: 'governance-risk',
  secondaryCategoryIds: ['business-continuity', 'technology-operations'],
  scoringModel: 'business-capability',
  foundational: true,
  questionIds: ['business-critical-services', 'business-service-dependencies', 'business-recovery-priorities'],
  findingIds: ['critical-services-unidentified', 'critical-service-dependencies-unclear', 'business-recovery-priorities-undefined'],
  recommendationIds: ['identify-critical-business-services', 'document-service-dependencies', 'define-business-recovery-priorities'],
  standardMappingIds: ['business-criticality-iso22301', 'business-criticality-nist', 'business-criticality-itil'],
};
