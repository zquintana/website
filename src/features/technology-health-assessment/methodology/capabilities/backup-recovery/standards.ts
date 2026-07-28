import type { StandardMapping } from '../../types.ts';

export const backupRecoveryStandardMappings: StandardMapping[] = [
  { id: 'recovery-capability-iso-22301', capabilityId: 'recovery-capability', standardId: 'iso-22301', reference: 'Business continuity and recovery planning concepts', relationship: 'direct' },
  { id: 'recovery-capability-aws-wa', capabilityId: 'recovery-capability', standardId: 'aws-well-architected', reference: 'Reliability pillar backup and recovery practices', relationship: 'supporting' },
  { id: 'recovery-capability-itil', capabilityId: 'recovery-capability', standardId: 'itil', reference: 'Service continuity and ownership practices', relationship: 'supporting' },
];
