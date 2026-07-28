import type { AssessmentAnswer, AssessmentCategory, AssessmentQuestion, AssessmentScores, BusinessProfile, CategoryScore, QuestionScore, Severity } from '../types.ts';
import { averageConfidence, getAnswerConfidence } from './confidence.ts';
import { evaluateApplicability } from './applicability.ts';

export const severityMultiplier: Record<Severity, number> = {
  low: 1,
  moderate: 1.5,
  high: 2,
  critical: 3,
};

export function getMaturityLabel(score: number): string {
  if (score < 20) return 'Critical';
  if (score < 40) return 'Reactive';
  if (score < 60) return 'Developing';
  if (score < 80) return 'Managed';
  return 'Resilient';
}

export function normalizeMaturityScore(maturityScore: number): number {
  return Math.round((Math.max(0, Math.min(5, maturityScore)) / 5) * 100);
}

export function calculatePriorityScore(question: AssessmentQuestion, maturityScore: number, categoryWeight: number): number {
  return (5 - maturityScore) * question.importance * severityMultiplier[question.severity] * categoryWeight;
}

export function scoreQuestion(question: AssessmentQuestion, answer?: AssessmentAnswer): QuestionScore {
  if (!answer) {
    return {
      questionId: question.id,
      categoryId: question.categoryId,
      maturityScore: question.unknownBehavior?.maturityScore ?? 1,
      normalizedScore: normalizeMaturityScore(question.unknownBehavior?.maturityScore ?? 1),
      confidence: 0,
      applicable: true,
      unknown: true,
    };
  }

  if (answer.isNotApplicable && question.allowNotApplicable) {
    return {
      questionId: question.id,
      categoryId: question.categoryId,
      maturityScore: 0,
      normalizedScore: 0,
      confidence: getAnswerConfidence(answer),
      applicable: false,
      unknown: false,
    };
  }

  if (answer.isUnknown) {
    const maturityScore = question.unknownBehavior?.maturityScore ?? 1;
    return {
      questionId: question.id,
      categoryId: question.categoryId,
      maturityScore,
      normalizedScore: normalizeMaturityScore(maturityScore),
      confidence: getAnswerConfidence(answer),
      applicable: true,
      unknown: true,
    };
  }

  const selected = Array.isArray(answer.value) ? answer.value : [answer.value];
  const maturityScores = (question.options ?? [])
    .filter((option) => selected.includes(option.id))
    .map((option) => option.maturityScore)
    .filter((value): value is number => typeof value === 'number');
  const maturityScore = maturityScores.length > 0 ? maturityScores.reduce((total, value) => total + value, 0) / maturityScores.length : 0;

  return {
    questionId: question.id,
    categoryId: question.categoryId,
    maturityScore,
    normalizedScore: normalizeMaturityScore(maturityScore),
    confidence: getAnswerConfidence(answer),
    applicable: true,
    unknown: false,
  };
}

export function scoreCategory(category: AssessmentCategory, answers: Record<string, AssessmentAnswer>, questions: AssessmentQuestion[], findingsCount = 0, profile?: BusinessProfile): CategoryScore {
  const questionScores = questions
    .filter((question) => question.categoryId === category.id && evaluateApplicability(question.applicability, profile ?? { businessName: '', respondentName: '', respondentEmail: '' }, answers))
    .map((question) => scoreQuestion(question, answers[question.id]))
    .filter((score) => score.applicable);

  const weightedTotal = questionScores.reduce((total, score) => {
    const question = questions.find((item) => item.id === score.questionId);
    return total + score.normalizedScore * (question?.importance ?? 1);
  }, 0);
  const weightTotal = questionScores.reduce((total, score) => {
    const question = questions.find((item) => item.id === score.questionId);
    return total + (question?.importance ?? 1);
  }, 0);
  const categoryScore = weightTotal > 0 ? Math.round(weightedTotal / weightTotal) : 0;

  return {
    categoryId: category.id,
    score: categoryScore,
    maturityScore: categoryScore / 20,
    confidence: averageConfidence(questionScores.map((score) => score.confidence)),
    answered: questions.filter((question) => question.categoryId === category.id && evaluateApplicability(question.applicability, profile ?? { businessName: '', respondentName: '', respondentEmail: '' }, answers) && answers[question.id]).length,
    applicable: questionScores.length,
    findings: findingsCount,
  };
}

export function calculateScores(
  answers: Record<string, AssessmentAnswer>,
  findingsByCategory: Record<string, number>,
  questions: AssessmentQuestion[],
  categories: AssessmentCategory[],
  profile?: BusinessProfile,
): AssessmentScores {
  const applicableQuestions = questions.filter((question) => evaluateApplicability(question.applicability, profile ?? { businessName: '', respondentName: '', respondentEmail: '' }, answers));
  const questionScores = applicableQuestions.map((question) => scoreQuestion(question, answers[question.id]));
  const categoryScores = categories.map((category) => scoreCategory(category, answers, applicableQuestions, findingsByCategory[category.id] ?? 0, profile));
  const weightedOverall = categoryScores.reduce((total, score) => {
    const category = categories.find((item) => item.id === score.categoryId);
    return total + score.score * (category?.weight ?? 0);
  }, 0);
  const totalWeight = categories.reduce((total, category) => total + category.weight, 0);
  const overallScore = totalWeight > 0 ? Math.round(weightedOverall / totalWeight) : 0;

  return {
    overallScore,
    overallMaturityScore: overallScore / 20,
    overallConfidence: averageConfidence(categoryScores.map((score) => score.confidence)),
    categoryScores,
    questionScores,
  };
}
