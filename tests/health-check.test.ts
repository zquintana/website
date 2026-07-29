import test from 'node:test';
import assert from 'node:assert/strict';
import { healthCheckQuestions } from '../src/features/technology-health-check/data/questions.ts';
import { getVisibleQuestions, removeStaleAnswers } from '../src/features/technology-health-check/lib/engine.ts';
import { calculateHealthCheckResult } from '../src/features/technology-health-check/lib/scoring.ts';
import type { HealthCheckAnswer } from '../src/features/technology-health-check/types.ts';

const answer = (questionId: string, optionId: string): HealthCheckAnswer => ({ questionId, optionId });
const answerMap = (entries: Array<[string, string]>): Record<string, HealthCheckAnswer> => Object.fromEntries(entries.map(([questionId, optionId]) => [questionId, answer(questionId, optionId)]));

test('health check content has stable unique question IDs', () => {
  assert.equal(healthCheckQuestions.length, 27);
  assert.equal(new Set(healthCheckQuestions.map((question) => question.id)).size, healthCheckQuestions.length);
});

test('planning question measures anticipation without a redundant spending question', () => {
  const planning = healthCheckQuestions.find((question) => question.id === 'technology-planning');
  assert.equal(planning?.question, 'Does your organization identify technology needs, replacements, and expected expenses before they become urgent?');
  assert.deepEqual(planning?.options.map((option) => option.label), [
    'Yes, through a regular review and budgeting process.',
    'Usually, but the process is informal.',
    'Sometimes.',
    'Rarely.',
    'Not sure',
  ]);
  assert.equal(healthCheckQuestions.some((question) => question.id === 'spending-behavior'), false);
  assert.equal(planning?.options[0].strengthSignal, 'Technology needs are anticipated before they become urgent');
  assert.equal(planning?.options[3].riskSignal, 'Technology spending is largely reactive');
});

test('conditional questions appear only when their parent answers require them', () => {
  const allMfa = answerMap([['mfa-coverage', 'all']]);
  assert.ok(getVisibleQuestions(healthCheckQuestions, allMfa).some((question) => question.id === 'admin-mfa'));
  assert.ok(!getVisibleQuestions(healthCheckQuestions, answerMap([['mfa-coverage', 'none']])).some((question) => question.id === 'admin-mfa'));
  assert.ok(getVisibleQuestions(healthCheckQuestions, answerMap([['backup-assurance', 'not-sure']])).some((question) => question.id === 'restore-validation'));
  assert.ok(!getVisibleQuestions(healthCheckQuestions, answerMap([['backup-assurance', 'tested']])).some((question) => question.id === 'restore-validation'));
  assert.ok(getVisibleQuestions(healthCheckQuestions, answerMap([['ai-use', 'independent']])).some((question) => question.id === 'ai-data-handling'));
  assert.ok(!getVisibleQuestions(healthCheckQuestions, answerMap([['ai-use', 'not-used']])).some((question) => question.id === 'ai-data-handling'));
  assert.ok(getVisibleQuestions(healthCheckQuestions, answerMap([['technology-interruptions', 'monthly']])).some((question) => question.id === 'interruption-cause'));
});

test('stale conditional answers are removed after a branch changes', () => {
  const answers = answerMap([['mfa-coverage', 'all'], ['admin-mfa', 'none']]);
  answers['mfa-coverage'] = answer('mfa-coverage', 'none');
  const cleaned = removeStaleAnswers(healthCheckQuestions, answers);
  assert.equal(cleaned['admin-mfa'], undefined);
  assert.ok(cleaned['mfa-coverage']);
});

test('healthy responses produce a strong foundation and separate AI result', () => {
  const entries: Array<[string, string]> = healthCheckQuestions.map((question) => [question.id, question.options[0].id]);
  const result = calculateHealthCheckResult(healthCheckQuestions, answerMap(entries));
  assert.ok(result.healthScore >= 80);
  assert.equal(result.healthRating, 'Healthy Foundation');
  assert.equal(result.risk, 'Low');
  assert.equal(result.resilience, 'Strong');
  assert.equal(result.confidence, 'High');
  assert.equal(result.aiReadiness, 'Governed and Advancing');
});

test('false confidence answers surface high-consequence findings', () => {
  const result = calculateHealthCheckResult(healthCheckQuestions, answerMap([
    ['mfa-coverage', 'all'], ['admin-mfa', 'none'], ['backup-assurance', 'never-tested'], ['restore-validation', 'never'],
    ['security-incidents', 'none-known'], ['recovery-time', 'one-day'], ['disruption-plan', 'exercised'],
  ]));
  assert.ok(result.findings.some((finding) => finding.title.includes('Administrative accounts')));
  assert.ok(result.findings.some((finding) => finding.title.includes('Backups')));
  assert.ok(result.recommendationIds.includes('mfa'));
  assert.ok(result.recommendationIds.includes('recovery'));
});

test('unmanaged AI use does not determine the general health score', () => {
  const core = healthCheckQuestions.filter((question) => question.id !== 'ai-use' && question.id !== 'ai-data-handling' && question.id !== 'ai-opportunity');
  const answers = answerMap(core.map((question) => [question.id, question.options[0].id]));
  answers['ai-use'] = answer('ai-use', 'independent');
  answers['ai-data-handling'] = answer('ai-data-handling', 'no');
  answers['ai-opportunity'] = answer('ai-opportunity', 'not-evaluated');
  const result = calculateHealthCheckResult(healthCheckQuestions, answers);
  assert.equal(result.aiReadiness, 'Unmanaged Adoption');
  assert.ok(result.healthScore >= 80);
  assert.ok(result.findings.some((finding) => finding.title.includes('AI')));
});
