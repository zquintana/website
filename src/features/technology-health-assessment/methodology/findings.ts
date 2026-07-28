import type { AssessmentAnswer } from '../types.ts';
import type { AssessmentVersion, FindingCondition, FindingDefinition } from './types.ts';

function answerValues(answer: AssessmentAnswer): Array<string | number> {
  if (Array.isArray(answer.value)) return answer.value.filter((value): value is string | number => typeof value === 'string' || typeof value === 'number');
  return typeof answer.value === 'string' || typeof answer.value === 'number' ? [answer.value] : [];
}

function numericAnswerValues(answer: AssessmentAnswer): number[] {
  return answerValues(answer).filter((value): value is number => typeof value === 'number');
}

/**
 * Evaluate one authored condition against persisted answers.
 * Missing answers are treated as unknown so visibility findings can surface
 * when a respondent has not supplied enough information.
 */
export function evaluateFindingCondition(condition: FindingCondition, answers: Record<string, AssessmentAnswer>): boolean {
  const answer = answers[condition.questionId];

  if (condition.operator === 'unknown') return !answer || answer.isUnknown === true;
  if (condition.operator === 'not-applicable') return answer?.isNotApplicable === true;
  if (!answer || answer.isUnknown || answer.isNotApplicable) return false;

  const values = answerValues(answer);
  if (condition.operator === 'equals') return values.includes(condition.value as string | number);
  if (condition.operator === 'in') return values.some((value) => (condition.values ?? []).includes(value));

  const numericValues = numericAnswerValues(answer);
  if (condition.operator === 'lte' && typeof condition.value === 'number') return numericValues.some((value) => value <= condition.value);
  if (condition.operator === 'gte' && typeof condition.value === 'number') return numericValues.some((value) => value >= condition.value);
  return false;
}

export function evaluateFindingDefinition(finding: FindingDefinition, answers: Record<string, AssessmentAnswer>): boolean {
  const results = finding.conditions.map((condition) => evaluateFindingCondition(condition, answers));
  if (results.length === 0) return false;
  return finding.conditionMode === 'all' ? results.every(Boolean) : results.some(Boolean);
}

/** Return authored findings triggered by the current assessment answers. */
export function evaluateMethodologyFindings(version: AssessmentVersion, answers: Record<string, AssessmentAnswer>): FindingDefinition[] {
  return version.findings.filter((finding) => evaluateFindingDefinition(finding, answers));
}
