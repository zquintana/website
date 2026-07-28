import type { StandardMapping } from '../../types.ts';

export const recoveryRequirementsStandardMappings: StandardMapping[] = [
  { id: 'recovery-requirements-iso22301', capabilityId: 'recovery-requirements', standardId: 'iso-22301', reference: 'Business continuity objectives, impact analysis, and recovery strategies', relationship: 'direct' },
  { id: 'recovery-requirements-nist', capabilityId: 'recovery-requirements', standardId: 'nist-csf-2', reference: 'Recovery planning and risk-informed organizational objectives', relationship: 'supporting' },
  { id: 'recovery-requirements-itil', capabilityId: 'recovery-requirements', standardId: 'itil', reference: 'Service continuity, availability, and service-level practices', relationship: 'supporting' },
];
