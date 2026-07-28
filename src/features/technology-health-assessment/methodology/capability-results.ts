import type { AssessmentAnswer, AssessmentCategory, CategoryScore } from '../types.ts';
import { averageConfidence } from '../lib/confidence.ts';
import { scoreQuestion } from '../lib/scoring-core.ts';
import type { AssessmentCapability, AssessmentQuestion, AssessmentVersion, CapabilityResult } from './types.ts';

export function scoreCapability(
  capability: AssessmentCapability,
  questions: AssessmentQuestion[],
  answers: Record<string, AssessmentAnswer>,
  findings = 0,
): CapabilityResult {
  const ownedQuestions = questions.filter((question) => capability.questionIds.includes(question.id));
  const scores = ownedQuestions.map((question) => ({ question, score: scoreQuestion(question, answers[question.id]) })).filter((item) => item.score.applicable);
  const questionWeight = scores.reduce((total, item) => total + item.question.importance, 0);
  const weightedScore = scores.reduce((total, item) => total + item.score.normalizedScore * item.question.importance, 0);
  const score = questionWeight > 0 ? Math.round(weightedScore / questionWeight) : 0;

  return {
    capabilityId: capability.id,
    score,
    maturityScore: score / 20,
    confidence: averageConfidence(scores.map((item) => item.score.confidence)),
    answered: ownedQuestions.filter((question) => answers[question.id]).length,
    applicable: scores.length,
    questionWeight,
    findings,
    foundational: capability.foundational === true,
  };
}

export function calculateCapabilityResults(
  version: AssessmentVersion,
  answers: Record<string, AssessmentAnswer>,
  findingsByCapability: Record<string, number> = {},
): CapabilityResult[] {
  return version.capabilities.map((capability) => scoreCapability(capability, version.questions, answers, findingsByCapability[capability.id] ?? 0));
}

/** Aggregate each capability exactly once through its primary category. */
export function aggregateCapabilityResults(
  categories: AssessmentCategory[],
  capabilities: AssessmentCapability[],
  results: CapabilityResult[],
): CategoryScore[] {
  return categories.map((category) => {
    const primaryResults = results.filter((result) => capabilities.find((capability) => capability.id === result.capabilityId)?.primaryCategoryId === category.id && result.applicable > 0);
    const totalWeight = primaryResults.reduce((total, result) => total + result.questionWeight, 0);
    const weightedScore = primaryResults.reduce((total, result) => total + result.score * result.questionWeight, 0);
    return {
      categoryId: category.id,
      score: totalWeight > 0 ? Math.round(weightedScore / totalWeight) : 0,
      maturityScore: totalWeight > 0 ? Math.round(weightedScore / totalWeight) / 20 : 0,
      confidence: totalWeight > 0 ? primaryResults.reduce((total, result) => total + result.confidence * result.questionWeight, 0) / totalWeight : 0,
      answered: primaryResults.reduce((total, result) => total + result.answered, 0),
      applicable: primaryResults.reduce((total, result) => total + result.applicable, 0),
      findings: primaryResults.reduce((total, result) => total + result.findings, 0),
    };
  });
}
