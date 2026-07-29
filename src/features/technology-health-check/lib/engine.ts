import type { HealthCheckAnswer, HealthCheckQuestion } from '../types.ts';

export function isQuestionVisible(question: HealthCheckQuestion, answers: Record<string, HealthCheckAnswer>): boolean {
  if (!question.condition) return true;
  const selected = answers[question.condition.questionId]?.optionId;
  const matches = Boolean(selected && question.condition.answerIds?.includes(selected));
  return question.condition.unless ? !matches : matches;
}

export function getVisibleQuestions(questions: HealthCheckQuestion[], answers: Record<string, HealthCheckAnswer>): HealthCheckQuestion[] {
  return questions.filter((question) => isQuestionVisible(question, answers));
}

export function removeStaleAnswers(questions: HealthCheckQuestion[], answers: Record<string, HealthCheckAnswer>): Record<string, HealthCheckAnswer> {
  const visibleIds = new Set(getVisibleQuestions(questions, answers).map((question) => question.id));
  return Object.fromEntries(Object.entries(answers).filter(([questionId]) => visibleIds.has(questionId)));
}
