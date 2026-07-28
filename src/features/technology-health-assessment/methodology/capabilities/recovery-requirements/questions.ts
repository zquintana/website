import type { CapabilityQuestion } from '../../types.ts';

export const recoveryRequirementsQuestions: CapabilityQuestion[] = [
  {
    id: 'recovery-objectives-documented',
    capabilityId: 'recovery-requirements',
    prompt: 'Are recovery time and data-loss tolerances documented for the most critical business services?',
    description: 'Recovery time is how quickly a service should return. Data-loss tolerance is how much recent work the business can afford to lose.',
    responseType: 'single-choice',
    evidenceRequirements: [{ id: 'recovery-objectives-record', label: 'Recovery objectives record', description: 'Business-approved recovery time and data-loss tolerances for the most critical services.', preferredSource: 'documentation' }],
    options: [
      { id: 'informal', label: 'Discussed informally without written targets', maturityScore: 2 },
      { id: 'partial', label: 'Written for some critical services', maturityScore: 3 },
      { id: 'reviewed', label: 'Written and approved by business owners', maturityScore: 4 },
      { id: 'managed', label: 'Approved, reviewed after change, and used for investment decisions', maturityScore: 5 },
    ],
    allowUnknown: true,
    unknownBehavior: { type: 'visibility-finding', findingId: 'recovery-objectives-undefined' },
    importance: 5,
    severity: 'high',
    foundational: true,
    standardMappingIds: ['recovery-requirements-iso22301', 'recovery-requirements-nist'],
  },
  {
    id: 'recovery-objectives-validated',
    capabilityId: 'recovery-requirements',
    prompt: 'Have actual recovery capabilities been compared with the approved recovery objectives?',
    description: 'Consider restore tests, failover exercises, service-provider commitments, and known gaps between targets and demonstrated results.',
    responseType: 'single-choice',
    evidenceRequirements: [{ id: 'recovery-validation-record', label: 'Recovery validation record', description: 'A restore, failover, or service review showing actual results compared with approved recovery targets.', preferredSource: 'documentation' }],
    options: [
      { id: 'informal', label: 'Assumed based on vendor or technical expectations', maturityScore: 2 },
      { id: 'partial', label: 'Compared for some critical services', maturityScore: 3 },
      { id: 'reviewed', label: 'Compared through documented testing or review', maturityScore: 4 },
      { id: 'managed', label: 'Regularly validated with gaps tracked to closure', maturityScore: 5 },
    ],
    allowUnknown: true,
    unknownBehavior: { type: 'visibility-finding', findingId: 'recovery-objectives-unvalidated' },
    importance: 5,
    severity: 'high',
    foundational: true,
    standardMappingIds: ['recovery-requirements-iso22301', 'recovery-requirements-itil'],
  },
];
