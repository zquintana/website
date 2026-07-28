import { assessmentCategories } from '../data/categories.ts';
import { assessmentQuestions } from '../data/questions.ts';
import type { AssessmentAnswer, Finding } from '../types.ts';
import { calculatePriorityScore, scoreQuestion } from './scoring.ts';

function getPriorityLevel(priorityScore: number, critical: boolean): Finding['priorityLevel'] {
  if (critical) return 'critical';
  if (priorityScore >= 240) return 'high';
  if (priorityScore >= 120) return 'medium';
  return 'low';
}

function getTimeframe(priorityLevel: Finding['priorityLevel']): Finding['timeframe'] {
  if (priorityLevel === 'critical') return 'Immediate Attention';
  if (priorityLevel === 'high') return 'Next 30 Days';
  if (priorityLevel === 'medium') return 'Next 90 Days';
  return 'Longer-Term Improvements';
}

function triggersCritical(answer: AssessmentAnswer | undefined, maturityScore: number, questionId: string): boolean {
  const question = assessmentQuestions.find((item) => item.id === questionId);
  const rule = question?.criticalFindingRule;
  if (!rule || !answer || answer.isNotApplicable) return false;
  const selected = Array.isArray(answer.value) ? answer.value : [answer.value];
  const optionMatch = rule.optionIds?.some((optionId) => selected.includes(optionId)) ?? false;
  const maturityMatch = typeof rule.maturityAtOrBelow === 'number' && maturityScore <= rule.maturityAtOrBelow;
  return optionMatch || maturityMatch;
}

export function generateFindings(answers: Record<string, AssessmentAnswer>): Finding[] {
  return assessmentQuestions.flatMap((question) => {
    const answer = answers[question.id];
    const score = scoreQuestion(question, answer);
    if (!score.applicable || score.maturityScore >= 4 || !question.recommendation) return [];

    const category = assessmentCategories.find((item) => item.id === question.categoryId);
    const priorityScore = calculatePriorityScore(question, score.maturityScore, category?.weight ?? 1);
    const critical = triggersCritical(answer, score.maturityScore, question.id);
    const priorityLevel = getPriorityLevel(priorityScore, critical);

    return [{
      id: `finding-${question.id}`,
      questionId: question.id,
      categoryId: question.categoryId,
      title: critical ? question.criticalFindingRule?.findingTitle ?? question.recommendation.title : question.recommendation.title,
      businessImpact: question.recommendation.businessImpact || question.businessImpact || 'This issue can increase business risk or reduce operating resilience.',
      currentMaturity: score.maturityScore,
      recommendedAction: question.recommendation.action,
      priorityScore,
      priorityLevel,
      timeframe: getTimeframe(priorityLevel),
      standards: question.standards,
      requiresVerification: score.confidence < 0.65 || score.unknown,
      critical,
    }];
  }).sort((a, b) => Number(b.critical) - Number(a.critical) || b.priorityScore - a.priorityScore);
}

export function generateStrengths(answers: Record<string, AssessmentAnswer>): Finding[] {
  return assessmentQuestions.flatMap((question) => {
    const score = scoreQuestion(question, answers[question.id]);
    if (!score.applicable || score.maturityScore < 4) return [];
    return [{
      id: `strength-${question.id}`,
      questionId: question.id,
      categoryId: question.categoryId,
      title: question.prompt,
      businessImpact: question.businessImpact || 'This area appears to have a mature operating practice.',
      currentMaturity: score.maturityScore,
      recommendedAction: 'Maintain the current practice and periodically verify it remains effective.',
      priorityScore: 0,
      priorityLevel: 'strength' as const,
      timeframe: 'Longer-Term Improvements' as const,
      standards: question.standards,
      requiresVerification: score.confidence < 0.65,
      critical: false,
    }];
  }).slice(0, 5);
}
