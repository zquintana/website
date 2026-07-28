import type { AssessmentQuestion, RecommendationDefinition } from '../../types.ts';
import type { FindingDefinition } from '../types.ts';

export type LegacyFindingRecord = {
  finding: FindingDefinition;
  question: AssessmentQuestion;
  recommendation: RecommendationDefinition;
};

/**
 * Convert an unmigrated question's existing recommendation behavior into the
 * shared finding-condition contract. This preserves legacy content while
 * removing its separate finding execution path.
 */
export function createLegacyFindingRecords(questions: AssessmentQuestion[]): LegacyFindingRecord[] {
  return questions.flatMap((question) => {
    if (!question.recommendation) return [];

    const lowMaturityOptionIds = (question.options ?? [])
      .filter((option) => typeof option.maturityScore === 'number' && option.maturityScore < 4)
      .map((option) => option.id);
    const conditions = [
      ...(lowMaturityOptionIds.length > 0 ? [{ questionId: question.id, operator: 'in' as const, values: lowMaturityOptionIds }] : []),
      ...(question.allowUnknown || question.unknownBehavior ? [{ questionId: question.id, operator: 'unknown' as const }] : []),
    ];

    if (conditions.length === 0) return [];

    return [{
      finding: {
        id: `legacy-${question.id}`,
        capabilityId: `legacy-${question.categoryId}`,
        title: question.recommendation.title,
        summary: question.recommendation.action,
        businessImpact: question.recommendation.businessImpact || question.businessImpact || 'This issue can increase business risk or reduce operating resilience.',
        severity: question.severity,
        conditions,
        conditionMode: 'any',
        recommendationIds: [],
      },
      question,
      recommendation: question.recommendation,
    } satisfies LegacyFindingRecord];
  });
}
