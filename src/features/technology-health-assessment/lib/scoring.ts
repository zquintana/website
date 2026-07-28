import { assessmentCategories } from '../data/categories.ts';
import { assessmentQuestions } from '../data/questions.ts';
import type { AssessmentAnswer, AssessmentCategory, AssessmentQuestion, AssessmentScores, CategoryScore } from '../types.ts';
import {
  calculatePriorityScore,
  calculateScores as calculateScoresCore,
  getMaturityLabel,
  normalizeMaturityScore,
  scoreCategory as scoreCategoryCore,
  scoreQuestion,
  severityMultiplier,
} from './scoring-core.ts';

export { calculatePriorityScore, getMaturityLabel, normalizeMaturityScore, scoreQuestion, severityMultiplier } from './scoring-core.ts';

export function scoreCategory(category: AssessmentCategory, answers: Record<string, AssessmentAnswer>, findingsCount = 0, questions: AssessmentQuestion[] = assessmentQuestions): CategoryScore {
  return scoreCategoryCore(category, answers, questions, findingsCount);
}

export function calculateScores(
  answers: Record<string, AssessmentAnswer>,
  findingsByCategory: Record<string, number> = {},
  questions: AssessmentQuestion[] = assessmentQuestions,
  categories: AssessmentCategory[] = assessmentCategories,
): AssessmentScores {
  return calculateScoresCore(answers, findingsByCategory, questions, categories);
}
