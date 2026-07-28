import type { StandardDefinition } from '../types.ts';

export const standards: StandardDefinition[] = [
  { id: 'nist-csf-2', name: 'NIST Cybersecurity Framework', version: '2.0', publisher: 'NIST' },
  { id: 'cis-controls', name: 'CIS Controls', publisher: 'Center for Internet Security' },
  { id: 'cis-benchmarks', name: 'CIS Benchmarks', publisher: 'Center for Internet Security' },
  { id: 'microsoft-secure-score', name: 'Microsoft Secure Score', publisher: 'Microsoft' },
  { id: 'microsoft-entra', name: 'Microsoft Entra security recommendations', publisher: 'Microsoft' },
  { id: 'google-workspace-security', name: 'Google Workspace security recommendations', publisher: 'Google' },
  { id: 'aws-well-architected', name: 'AWS Well-Architected Framework', publisher: 'AWS' },
  { id: 'azure-well-architected', name: 'Azure Well-Architected Framework', publisher: 'Microsoft' },
  { id: 'gcp-architecture', name: 'Google Cloud Architecture Framework', publisher: 'Google' },
  { id: 'itil', name: 'ITIL' },
  { id: 'iso-22301', name: 'ISO 22301' },
  { id: 'iso-27001-concepts', name: 'ISO 27001 concepts' },
  { id: 'finops', name: 'FinOps Framework' },
  { id: 'owasp', name: 'OWASP' },
];
