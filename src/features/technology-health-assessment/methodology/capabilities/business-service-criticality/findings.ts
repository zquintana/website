import type { FindingDefinition } from '../../types.ts';

export const businessServiceCriticalityFindings: FindingDefinition[] = [
  {
    id: 'critical-services-unidentified',
    capabilityId: 'business-service-criticality',
    title: 'Critical business services are not clearly identified',
    summary: 'The business cannot consistently identify which services should receive priority during a disruption.',
    businessImpact: 'Technology and recovery decisions may protect the wrong systems or delay restoration of services that matter most.',
    severity: 'high',
    conditions: [{ questionId: 'business-critical-services', operator: 'in', values: ['unknown', 'informal'] }],
    recommendationIds: ['identify-critical-business-services'],
  },
  {
    id: 'critical-service-dependencies-unclear',
    capabilityId: 'business-service-criticality',
    title: 'Critical service dependencies are not sufficiently documented',
    summary: 'Important services cannot be traced reliably to their major technology, vendor, people, and data dependencies.',
    businessImpact: 'Recovery planning and incident decisions may miss a dependency that prevents the service from operating.',
    severity: 'high',
    conditions: [{ questionId: 'business-service-dependencies', operator: 'in', values: ['unknown', 'informal'] }],
    recommendationIds: ['document-service-dependencies'],
  },
  {
    id: 'business-recovery-priorities-undefined',
    capabilityId: 'business-service-criticality',
    title: 'Business recovery priorities are not defined',
    summary: 'Acceptable interruption times and recovery priorities are not consistently approved for critical services.',
    businessImpact: 'Teams may disagree about what to restore first or accept avoidable business impact during an outage.',
    severity: 'high',
    conditions: [{ questionId: 'business-recovery-priorities', operator: 'in', values: ['unknown', 'informal'] }],
    recommendationIds: ['define-business-recovery-priorities'],
  },
];
