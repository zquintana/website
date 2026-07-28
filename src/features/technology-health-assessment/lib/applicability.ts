import type { ApplicabilityRule, AssessmentAnswer, BusinessProfile } from '../types.ts';

/** Evaluate authored applicability against the captured business profile. */
export function evaluateApplicability(rule: ApplicabilityRule | undefined, profile: BusinessProfile, answers: Record<string, AssessmentAnswer> = {}): boolean {
  if (!rule || rule.type === 'always') return true;

  if (rule.type === 'answer') {
    const answer = answers[rule.questionId];
    if (rule.operator === 'unknown') return !answer || answer.isUnknown === true;
    if (rule.operator === 'not-applicable') return answer?.isNotApplicable === true;
    if (!answer || answer.isUnknown || answer.isNotApplicable) return false;
    const values = Array.isArray(answer.value) ? answer.value : [answer.value];
    return rule.operator === 'equals' ? values.includes(rule.value) : values.some((value) => (rule.values ?? []).includes(value));
  }

  const value = profile[rule.field];
  if (rule.operator === 'exists') return typeof value === 'string' ? value.trim().length > 0 : value !== undefined;
  if (rule.operator === 'equals') return value === rule.value;
  if (rule.operator === 'in') return typeof value === 'string' && (rule.values ?? []).includes(value);
  return false;
}
