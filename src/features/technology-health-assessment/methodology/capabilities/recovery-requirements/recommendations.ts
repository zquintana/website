import type { CapabilityRecommendation } from '../../types.ts';

export const recoveryRequirementsRecommendations: CapabilityRecommendation[] = [
  {
    id: 'document-recovery-objectives',
    capabilityId: 'recovery-requirements',
    title: 'Document recovery objectives',
    summary: 'Translate business impact into recovery time and data-loss tolerances for the most critical services.',
    actions: ['Start with the top three critical services.', 'Have business owners approve recovery time and data-loss tolerances.', 'Review objectives when services, vendors, or business priorities change.'],
    expectedOutcome: 'Recovery and continuity investments are tied to explicit business tolerances.',
    effort: 'moderate',
    targetWindow: '30-days',
    standardMappingIds: ['recovery-requirements-iso22301', 'recovery-requirements-nist'],
  },
  {
    id: 'validate-recovery-objectives',
    capabilityId: 'recovery-requirements',
    title: 'Validate recovery objectives through evidence',
    summary: 'Compare approved recovery targets with restore tests, failover exercises, and provider commitments.',
    actions: ['Choose a representative critical service.', 'Run or review a recovery test and record elapsed time and data restored.', 'Track gaps between demonstrated results and approved targets.'],
    expectedOutcome: 'Leaders know which recovery targets are demonstrated, provisional, or currently unattainable.',
    effort: 'high',
    targetWindow: '90-days',
    standardMappingIds: ['recovery-requirements-iso22301', 'recovery-requirements-itil'],
  },
];
