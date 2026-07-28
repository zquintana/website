import type { CapabilityQuestion } from '../../types.ts';

export const identityLifecycleQuestions: CapabilityQuestion[] = [
  {
    id: 'iam-offboarding',
    capabilityId: 'identity-lifecycle',
    prompt: 'How quickly are former employees and contractors removed from business systems?',
    responseType: 'single-choice',
    evidenceRequirements: [
      { id: 'offboarding-sample', label: 'Offboarding sample', description: 'A recent deprovisioning record showing timing and systems covered, with personal information redacted.', preferredSource: 'documentation' },
      { id: 'lifecycle-process', label: 'Lifecycle process', description: 'Joiner, mover, and leaver procedure or workflow description.', preferredSource: 'documentation' },
    ],
    options: [
      { id: 'manual', label: 'Manual, often delayed', maturityScore: 2 },
      { id: 'same-week', label: 'Usually within the same week', maturityScore: 3 },
      { id: 'same-day', label: 'Same day for core systems', maturityScore: 4 },
      { id: 'automated', label: 'Checklist or automation with verification', maturityScore: 5 },
    ],
    allowUnknown: true,
    unknownBehavior: { type: 'visibility-finding', findingId: 'access-offboarding-visibility' },
    importance: 5,
    severity: 'critical',
    foundational: true,
    standardMappingIds: ['identity-lifecycle-cis', 'identity-lifecycle-entra', 'identity-lifecycle-google'],
  },
];
