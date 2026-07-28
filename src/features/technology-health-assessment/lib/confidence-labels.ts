import type { EvidenceLevel, ExecutiveConfidenceLabel } from '../types.ts';

/** Maps detailed evidence identifiers to executive-facing report language. */
export const executiveConfidenceLabels: Record<EvidenceLevel, ExecutiveConfidenceLabel> = {
  'self-reported': 'reported',
  'documentation-reviewed': 'observed',
  'manually-verified': 'observed',
  'automatically-verified': 'verified',
};

export function getExecutiveConfidenceLabel(evidenceLevel: EvidenceLevel): ExecutiveConfidenceLabel {
  return executiveConfidenceLabels[evidenceLevel];
}
