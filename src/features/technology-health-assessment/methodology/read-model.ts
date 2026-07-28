import type { AssessmentQuestion, CriticalFindingRule } from '../types.ts';
import type { AssessmentReadModel, AssessmentVersion, CapabilityQuestion, FindingDefinition } from './types.ts';
import { recommendationToLegacy, standardsToLegacy } from './types.ts';

function legacyUnknownBehavior(question: CapabilityQuestion): AssessmentQuestion['unknownBehavior'] {
  if (!question.unknownBehavior) return undefined;
  if (question.unknownBehavior.type === 'confidence-only') return { maturityScore: 2, note: 'Unknown answer lowers confidence but does not assert health.' };
  if (question.unknownBehavior.type === 'provisional-score') return { maturityScore: question.unknownBehavior.score, note: question.unknownBehavior.rationale };
  return { maturityScore: 0, note: 'Unknown answer indicates a visibility gap requiring follow-up.' };
}

function legacyCriticalRule(question: CapabilityQuestion, findings: FindingDefinition[]): CriticalFindingRule | undefined {
  const finding = findings.find((item) => item.capabilityId === question.capabilityId && item.conditions.some((condition) => condition.questionId === question.id) && item.severity === 'critical');
  if (!finding) return undefined;
  const optionIds = finding.conditions.flatMap((condition) => {
    if (condition.questionId !== question.id) return [];
    if (condition.operator === 'equals' && typeof condition.value === 'string') return [condition.value];
    if (condition.operator === 'in') return (condition.values ?? []).filter((value): value is string => typeof value === 'string');
    return [];
  });
  const hasUnknownCondition = finding.conditions.some((condition) => condition.questionId === question.id && condition.operator === 'unknown');
  return {
    optionIds: optionIds.length > 0 ? optionIds : undefined,
    maturityAtOrBelow: hasUnknownCondition ? 1 : undefined,
    findingTitle: finding.title,
  };
}

export function createAssessmentReadModel(version: AssessmentVersion): AssessmentReadModel {
  const migratedQuestions: AssessmentQuestion[] = version.questions.map((question) => {
    const capability = version.capabilities.find((item) => item.id === question.capabilityId);
    const mappings = version.standardMappings.filter((mapping) => question.standardMappingIds?.includes(mapping.id));
    const finding = version.findings.find((item) => item.capabilityId === question.capabilityId && item.conditions.some((condition) => condition.questionId === question.id));
    const recommendation = version.recommendations.find((item) => finding?.recommendationIds.includes(item.id));

    return {
      ...question,
      categoryId: capability?.primaryCategoryId ?? 'technology-operations',
      standards: standardsToLegacy(mappings, version.standards),
      unknownBehavior: legacyUnknownBehavior(question),
      criticalFindingRule: legacyCriticalRule(question, version.findings),
      recommendation: recommendation ? recommendationToLegacy(recommendation) : undefined,
    };
  });

  return {
    version: version.version,
    methodologyHash: version.methodologyHash,
    questionSetLabel: version.legacyQuestionSet.label,
    categories: version.categories,
    questions: [...migratedQuestions, ...version.legacyQuestionSet.questions.filter((question) => !version.legacyQuestionSet.retiredQuestionIds?.includes(question.id))],
  };
}
