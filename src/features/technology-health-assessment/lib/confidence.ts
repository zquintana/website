import type { AssessmentAnswer, EvidenceLevel } from '../types.ts';

export const evidenceConfidence: Record<EvidenceLevel, number> = {
  'self-reported': 0.4,
  'documentation-reviewed': 0.65,
  'manually-verified': 0.8,
  'automatically-verified': 1,
};

export function getAnswerConfidence(answer?: AssessmentAnswer): number {
  if (!answer) return 0;
  return evidenceConfidence[answer.evidenceLevel] ?? evidenceConfidence['self-reported'];
}

export function averageConfidence(values: number[]): number {
  const applicable = values.filter((value) => Number.isFinite(value));
  if (applicable.length === 0) return 0;
  return applicable.reduce((total, value) => total + value, 0) / applicable.length;
}
