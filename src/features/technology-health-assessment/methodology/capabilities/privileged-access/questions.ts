import type { CapabilityQuestion } from '../../types.ts';

export const privilegedAccessQuestions: CapabilityQuestion[] = [
  {
    id: 'cyber-admin-mfa',
    capabilityId: 'privileged-access',
    prompt: 'Are administrators required to use multi-factor authentication when accessing critical systems?',
    description: 'Include cloud consoles, email administration, finance systems, and remote access tools.',
    businessImpact: 'Administrator accounts are high-value targets. Missing MFA can turn one stolen password into a business-wide incident.',
    responseType: 'single-choice',
    options: [
      { id: 'yes', label: 'Yes', maturityScore: 4 },
      { id: 'partial', label: 'Partially', maturityScore: 2 },
      { id: 'no', label: 'No', maturityScore: 0 },
    ],
    allowUnknown: true,
    unknownBehavior: { type: 'visibility-finding', findingId: 'admin-mfa-visibility' },
    importance: 5,
    severity: 'critical',
    foundational: true,
    standardMappingIds: ['privileged-access-cis', 'privileged-access-entra'],
  },
  {
    id: 'iam-shared-admin',
    capabilityId: 'privileged-access',
    prompt: 'Do people use shared administrator accounts for important systems?',
    responseType: 'single-choice',
    options: [
      { id: 'yes', label: 'Yes', maturityScore: 0 },
      { id: 'some', label: 'Only in a few systems', maturityScore: 2 },
      { id: 'no', label: 'No, admins use named accounts', maturityScore: 4 },
      { id: 'controlled', label: 'No, with privileged access controls', maturityScore: 5 },
    ],
    allowUnknown: true,
    unknownBehavior: { type: 'visibility-finding', findingId: 'shared-admin-visibility' },
    importance: 4,
    severity: 'high',
    standardMappingIds: ['privileged-access-cis', 'privileged-access-iso27001'],
  },
];
