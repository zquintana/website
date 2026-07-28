import assert from 'node:assert/strict';
import test from 'node:test';

import { assessmentCategories, categoryWeightTotal } from '../src/features/technology-health-assessment/data/categories.ts';
import { assessmentQuestions } from '../src/features/technology-health-assessment/data/questions.ts';
import { evidenceConfidence } from '../src/features/technology-health-assessment/lib/confidence.ts';
import { getExecutiveConfidenceLabel } from '../src/features/technology-health-assessment/lib/confidence-labels.ts';
import { evaluateApplicability } from '../src/features/technology-health-assessment/lib/applicability.ts';
import { generateFindings } from '../src/features/technology-health-assessment/lib/findings.ts';
import { calculatePriorityScore, calculateScores, scoreQuestion } from '../src/features/technology-health-assessment/lib/scoring.ts';
import { parseAssessment, serializeAssessment, createAssessmentState } from '../src/features/technology-health-assessment/lib/storage.ts';
import { activeAssessmentVersion } from '../src/features/technology-health-assessment/methodology/index.ts';
import type { AssessmentAnswer } from '../src/features/technology-health-assessment/types.ts';

test('category weights total 100', () => {
  assert.equal(categoryWeightTotal, 100);
});

test('question score calculation normalizes maturity to 100-point score', () => {
  const question = assessmentQuestions.find((item) => item.id === 'cyber-admin-mfa');
  assert.ok(question);
  const score = scoreQuestion(question, {
    questionId: question.id,
    value: 'yes',
    evidenceLevel: 'manually-verified',
  });

  assert.equal(score.maturityScore, 4);
  assert.equal(score.normalizedScore, 80);
  assert.equal(score.confidence, evidenceConfidence['manually-verified']);
});

test('not-applicable answers are excluded from category calculations', () => {
  const answers: Record<string, AssessmentAnswer> = {
    'cost-cloud-budget': {
      questionId: 'cost-cloud-budget',
      isNotApplicable: true,
      evidenceLevel: 'self-reported',
    },
    'cost-software-review': {
      questionId: 'cost-software-review',
      value: 'managed',
      evidenceLevel: 'documentation-reviewed',
    },
  };

  const scores = calculateScores(answers);
  const costScore = scores.categoryScores.find((item) => item.categoryId === 'cost-optimization');

  assert.ok(costScore);
  assert.equal(costScore.applicable, 1);
  assert.equal(costScore.score, 100);
});

test('unknown answers use question-specific maturity behavior', () => {
  const question = assessmentQuestions.find((item) => item.id === 'bcdr-backup-test');
  assert.ok(question);

  const score = scoreQuestion(question, {
    questionId: question.id,
    isUnknown: true,
    evidenceLevel: 'self-reported',
  });

  assert.equal(score.unknown, true);
  assert.equal(score.maturityScore, 0);
  assert.equal(score.normalizedScore, 0);
});

test('overall weighted score uses category weights', () => {
  const answers: Record<string, AssessmentAnswer> = {};
  for (const question of assessmentQuestions) {
    const strongestOption = question.options?.reduce((best, option) => (option.maturityScore ?? 0) > (best.maturityScore ?? 0) ? option : best, question.options[0]);
    answers[question.id] = {
      questionId: question.id,
      value: strongestOption?.id,
      evidenceLevel: 'automatically-verified',
    };
  }

  const scores = calculateScores(answers);

  assert.ok(scores.overallScore >= 80);
  assert.equal(Math.round(scores.overallConfidence * 100), 100);
});

test('shared scoring accepts the serialized runtime read model', () => {
  const question = assessmentQuestions.find((item) => item.id === 'cyber-admin-mfa');
  const category = assessmentCategories.find((item) => item.id === question?.categoryId);
  assert.ok(question);
  assert.ok(category);

  const scores = calculateScores({
    [question.id]: { questionId: question.id, value: 'yes', evidenceLevel: 'manually-verified' },
  }, {}, [question], [{ ...category, weight: 100 }]);

  assert.equal(scores.overallScore, 80);
  assert.equal(scores.categoryScores[0].score, 80);
  assert.equal(scores.overallConfidence, evidenceConfidence['manually-verified']);
});

test('priority calculation accounts for maturity gap, importance, severity, and category weight', () => {
  const question = assessmentQuestions.find((item) => item.id === 'cyber-admin-mfa');
  const category = assessmentCategories.find((item) => item.id === 'cybersecurity');
  assert.ok(question);
  assert.ok(category);

  assert.equal(calculatePriorityScore(question, 0, category.weight), 1350);
});

test('critical finding generation supports override rules', () => {
  const findings = generateFindings({
    'cyber-admin-mfa': {
      questionId: 'cyber-admin-mfa',
      value: 'no',
      evidenceLevel: 'self-reported',
    },
  });

  const critical = findings.find((finding) => finding.questionId === 'cyber-admin-mfa');
  assert.ok(critical);
  assert.equal(critical.critical, true);
  assert.equal(critical.priorityLevel, 'critical');
  assert.equal(critical.timeframe, 'Immediate Attention');
});

test('local-storage serialization and recovery handle invalid data safely', () => {
  const state = createAssessmentState({ businessName: 'Acme Co', respondentName: 'Alex', respondentEmail: 'alex@example.com' });
  const parsed = parseAssessment(serializeAssessment(state));

  assert.equal(parsed?.assessmentId, state.assessmentId);
  assert.equal(parseAssessment('{not-json'), null);
  assert.equal(parseAssessment(JSON.stringify({ version: 'old' })), null);
});

test('technical evidence levels map to executive confidence labels', () => {
  assert.equal(getExecutiveConfidenceLabel('self-reported'), 'reported');
  assert.equal(getExecutiveConfidenceLabel('documentation-reviewed'), 'observed');
  assert.equal(getExecutiveConfidenceLabel('manually-verified'), 'observed');
  assert.equal(getExecutiveConfidenceLabel('automatically-verified'), 'verified');
});

test('applicability rules evaluate business profile context', () => {
  const profile = { businessName: 'Example Co', respondentName: 'Alex', respondentEmail: 'alex@example.com', employeeCount: '11-50', productivityPlatform: 'Microsoft 365' };
  assert.equal(evaluateApplicability(undefined, profile), true);
  assert.equal(evaluateApplicability({ type: 'always' }, profile), true);
  assert.equal(evaluateApplicability({ type: 'business-profile', field: 'employeeCount', operator: 'exists' }, profile), true);
  assert.equal(evaluateApplicability({ type: 'business-profile', field: 'employeeCount', operator: 'equals', value: '11-50' }, profile), true);
  assert.equal(evaluateApplicability({ type: 'business-profile', field: 'productivityPlatform', operator: 'in', values: ['Google Workspace', 'Microsoft 365'] }, profile), true);
  assert.equal(evaluateApplicability({ type: 'business-profile', field: 'productivityPlatform', operator: 'equals', value: 'Other' }, profile), false);
});

test('answer applicability distinguishes answered, unknown, and not-applicable states', () => {
  const profile = { businessName: 'Example Co', respondentName: 'Alex', respondentEmail: 'alex@example.com' };
  const answers: Record<string, AssessmentAnswer> = {
    trigger: { questionId: 'trigger', value: 'yes', evidenceLevel: 'self-reported' },
    unknown: { questionId: 'unknown', isUnknown: true, evidenceLevel: 'self-reported' },
    excluded: { questionId: 'excluded', isNotApplicable: true, evidenceLevel: 'self-reported' },
  };
  assert.equal(evaluateApplicability({ type: 'answer', questionId: 'trigger', operator: 'equals', value: 'yes' }, profile, answers), true);
  assert.equal(evaluateApplicability({ type: 'answer', questionId: 'trigger', operator: 'in', values: ['no', 'yes'] }, profile, answers), true);
  assert.equal(evaluateApplicability({ type: 'answer', questionId: 'unknown', operator: 'unknown' }, profile, answers), true);
  assert.equal(evaluateApplicability({ type: 'answer', questionId: 'excluded', operator: 'not-applicable' }, profile, answers), true);
  assert.equal(evaluateApplicability({ type: 'answer', questionId: 'trigger', operator: 'unknown' }, profile, answers), false);
});

test('active methodology declares foundational treatment explicitly', () => {
  assert.equal(activeAssessmentVersion.foundationalTreatment, 'metadata-only');
  assert.equal(activeAssessmentVersion.capabilityCatalog.some((item) => item.foundational), true);
});
