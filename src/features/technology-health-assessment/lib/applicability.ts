import type { ApplicabilityRule, BusinessProfile } from '../types.ts';

/** Evaluate authored applicability against the captured business profile. */
export function evaluateApplicability(rule: ApplicabilityRule | undefined, profile: BusinessProfile): boolean {
  if (!rule || rule.type === 'always') return true;

  const value = profile[rule.field];
  if (rule.operator === 'exists') return typeof value === 'string' ? value.trim().length > 0 : value !== undefined;
  if (rule.operator === 'equals') return value === rule.value;
  if (rule.operator === 'in') return typeof value === 'string' && (rule.values ?? []).includes(value);
  return false;
}
