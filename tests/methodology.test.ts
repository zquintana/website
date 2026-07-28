import assert from 'node:assert/strict';
import test from 'node:test';

import { backupRecoveryModule } from '../src/features/technology-health-assessment/methodology/capabilities/backup-recovery/index.ts';
import { activeAssessmentVersion, aggregateCapabilityResults, assessmentReadModel, calculateCapabilityResults, createAssessmentReadModel, createLegacyFindingRecords, evaluateFindingCondition, evaluateFindingDefinition, evaluateMethodologyFindings, getCapabilityReadinessSummary, isCapabilityReadyForActivation, validateAssessmentVersion } from '../src/features/technology-health-assessment/methodology/index.ts';
import type { AssessmentAnswer } from '../src/features/technology-health-assessment/types.ts';
import type { FindingDefinition } from '../src/features/technology-health-assessment/methodology/types.ts';

test('modular methodology assembles into the active assessment version', () => {
  assert.equal(activeAssessmentVersion.version, '0.1.0');
  assert.equal(activeAssessmentVersion.status, 'demonstration');
  assert.ok(activeAssessmentVersion.methodologyHash.includes('0.1.0'));
  assert.equal(activeAssessmentVersion.domains.length, 14);
  assert.ok(activeAssessmentVersion.capabilities.some((capability) => capability.id === 'recovery-capability'));
});

test('capability taxonomy includes stable domains, foundational markers, and recommended build-order capabilities', () => {
  const capabilityIds = new Set(activeAssessmentVersion.capabilityCatalog.map((capability) => capability.id));
  const foundationalIds = activeAssessmentVersion.capabilityCatalog.filter((capability) => capability.foundational).map((capability) => capability.id);

  for (const id of ['business-service-criticality', 'recovery-requirements', 'backup-coverage', 'backup-verification', 'recovery-capability', 'identity-inventory', 'identity-lifecycle', 'authentication', 'privileged-access', 'technology-asset-inventory', 'service-inventory', 'technology-ownership', 'vendor-inventory', 'technology-risk-management', 'ai-data-governance']) {
    assert.ok(capabilityIds.has(id), `Expected taxonomy capability ${id}`);
  }

  assert.ok(foundationalIds.includes('business-service-criticality'));
  assert.ok(foundationalIds.includes('technology-documentation'));
});

test('implemented capability modules are represented in the taxonomy catalog', () => {
  const implemented = activeAssessmentVersion.capabilityCatalog.filter((capability) => capability.implementationStatus === 'implemented').map((capability) => capability.id).sort();
  assert.deepEqual(implemented, ['identity-lifecycle', 'privileged-access', 'recovery-capability'].sort());
});

test('every catalog capability has readiness tracking', () => {
  assert.equal(activeAssessmentVersion.capabilityCatalog.length, 142);
  assert.ok(activeAssessmentVersion.capabilityCatalog.every((capability) => capability.readiness.owner === null));
  assert.ok(activeAssessmentVersion.capabilityCatalog.every((capability) => capability.readiness.reviewer === null));
  assert.ok(activeAssessmentVersion.capabilityCatalog.every((capability) => capability.readiness.lastReviewedAt === null));

  const summary = getCapabilityReadinessSummary(activeAssessmentVersion.capabilityCatalog);
  assert.equal(summary.structured, 139);
  assert.equal(summary.pilot, 3);
  assert.equal(summary.active, 0);
  assert.equal(activeAssessmentVersion.capabilityCatalog.filter(isCapabilityReadyForActivation).length, 0);
});

test('validation rejects pilot or active catalog entries without implementation', () => {
  const invalid = {
    ...activeAssessmentVersion,
    capabilityCatalog: activeAssessmentVersion.capabilityCatalog.map((capability, index) => index === 0
      ? { ...capability, readiness: { ...capability.readiness, status: 'active' as const } }
      : capability),
  };

  assert.throws(() => validateAssessmentVersion(invalid), /Active capability .* must have an implemented capability module/);
});

test('validation rejects duplicate IDs', () => {
  const invalid = {
    ...activeAssessmentVersion,
    categories: [activeAssessmentVersion.categories[0], activeAssessmentVersion.categories[0]],
  };

  assert.throws(() => validateAssessmentVersion(invalid), /Duplicate category ID/);
});

test('validation rejects missing references', () => {
  const invalid = {
    ...activeAssessmentVersion,
    capabilities: [{ ...activeAssessmentVersion.capabilities[0], primaryCategoryId: 'missing-category' }, ...activeAssessmentVersion.capabilities.slice(1)],
  };

  assert.throws(() => validateAssessmentVersion(invalid), /missing primary category/);
});

test('validation requires category weights to total 100', () => {
  const invalid = {
    ...activeAssessmentVersion,
    categories: activeAssessmentVersion.categories.map((category, index) => index === 0 ? { ...category, weight: 17 } : category),
  };

  assert.throws(() => validateAssessmentVersion(invalid), /Category weights must total 100/);
});

test('a capability can be inspected without loading every capability folder', () => {
  assert.equal(backupRecoveryModule.capability.id, 'recovery-capability');
  assert.deepEqual(backupRecoveryModule.capability.questionIds, ['bcdr-backup-test', 'bcdr-recovery-owner']);
  assert.ok(backupRecoveryModule.findings.every((finding) => finding.capabilityId === 'recovery-capability'));
  assert.ok(backupRecoveryModule.recommendations.every((recommendation) => recommendation.capabilityId === 'recovery-capability'));
});

test('capability questions reference the owning capability', () => {
  assert.ok(backupRecoveryModule.questions.every((question) => question.capabilityId === backupRecoveryModule.capability.id));
});

test('pilot questions define evidence expectations', () => {
  for (const capability of activeAssessmentVersion.capabilities) {
    assert.ok(capability.questionIds.length > 0);
    for (const questionId of capability.questionIds) {
      const question = activeAssessmentVersion.questions.find((item) => item.id === questionId);
      assert.ok(question?.evidenceRequirements?.length, `Missing evidence requirements for ${questionId}`);
    }
  }
});

test('unknown-answer behavior supports visibility findings and provisional scores', () => {
  const backupTest = backupRecoveryModule.questions.find((question) => question.id === 'bcdr-backup-test');
  const recoveryOwner = backupRecoveryModule.questions.find((question) => question.id === 'bcdr-recovery-owner');

  assert.deepEqual(backupTest?.unknownBehavior, { type: 'visibility-finding', findingId: 'backup-restore-visibility' });
  assert.equal(recoveryOwner?.unknownBehavior?.type, 'provisional-score');
});

test('modular finding evaluator supports authored conditions and missing-answer visibility', () => {
  const answers: Record<string, AssessmentAnswer> = {
    'cyber-admin-mfa': { questionId: 'cyber-admin-mfa', value: 'no', evidenceLevel: 'self-reported' },
    'iam-shared-admin': { questionId: 'iam-shared-admin', value: 'yes', evidenceLevel: 'self-reported' },
  };

  const findings = evaluateMethodologyFindings(activeAssessmentVersion, answers);
  assert.ok(findings.some((finding) => finding.id === 'admin-mfa-missing'));
  assert.ok(findings.some((finding) => finding.id === 'shared-admin-accounts-used'));
  assert.ok(findings.some((finding) => finding.id === 'backup-restore-visibility'));
  assert.ok(!findings.some((finding) => finding.id === 'backup-restore-untested'));
  assert.ok(!findings.some((finding) => finding.id === 'recovery-ownership-undefined'));
});

test('pilot modules separate confirmed critical conditions from visibility gaps', () => {
  const findings = evaluateMethodologyFindings(activeAssessmentVersion, {});
  assert.ok(findings.some((finding) => finding.id === 'backup-restore-visibility'));
  assert.ok(findings.some((finding) => finding.id === 'access-offboarding-visibility'));
  assert.ok(findings.some((finding) => finding.id === 'admin-mfa-visibility'));
  assert.ok(findings.every((finding) => !['backup-restore-untested', 'admin-mfa-missing'].includes(finding.id)));
  assert.equal(findings.find((finding) => finding.id === 'backup-restore-visibility')?.severity, 'high');
});

test('modular finding evaluator supports all/any, unknown, not-applicable, and numeric operators', () => {
  const answers: Record<string, AssessmentAnswer> = {
    first: { questionId: 'first', value: 'yes', evidenceLevel: 'self-reported' },
    second: { questionId: 'second', value: 3, evidenceLevel: 'self-reported' },
    unknown: { questionId: 'unknown', isUnknown: true, evidenceLevel: 'self-reported' },
    excluded: { questionId: 'excluded', isNotApplicable: true, evidenceLevel: 'self-reported' },
  };

  assert.equal(evaluateFindingCondition({ questionId: 'first', operator: 'equals', value: 'yes' }, answers), true);
  assert.equal(evaluateFindingCondition({ questionId: 'first', operator: 'in', values: ['no', 'yes'] }, answers), true);
  assert.equal(evaluateFindingCondition({ questionId: 'second', operator: 'lte', value: 3 }, answers), true);
  assert.equal(evaluateFindingCondition({ questionId: 'second', operator: 'gte', value: 4 }, answers), false);
  assert.equal(evaluateFindingCondition({ questionId: 'unknown', operator: 'unknown' }, answers), true);
  assert.equal(evaluateFindingCondition({ questionId: 'missing', operator: 'unknown' }, answers), true);
  assert.equal(evaluateFindingCondition({ questionId: 'excluded', operator: 'not-applicable' }, answers), true);

  const allFinding: FindingDefinition = {
    id: 'test-all', capabilityId: 'test', title: 'All', summary: 'All', businessImpact: 'All', severity: 'low', conditionMode: 'all',
    conditions: [
      { questionId: 'first', operator: 'equals', value: 'yes' },
      { questionId: 'second', operator: 'gte', value: 3 },
    ], recommendationIds: [],
  };
  const anyFinding: FindingDefinition = { ...allFinding, id: 'test-any', conditionMode: 'any', conditions: [{ questionId: 'first', operator: 'equals', value: 'no' }, { questionId: 'unknown', operator: 'unknown' }] };

  assert.equal(evaluateFindingDefinition(allFinding, answers), true);
  assert.equal(evaluateFindingDefinition(anyFinding, answers), true);
});

test('legacy demonstration findings use the shared finding contract', () => {
  const records = createLegacyFindingRecords(activeAssessmentVersion.legacyQuestionSet.questions);
  assert.equal(records.length, 15);
  assert.ok(records.every((record) => record.finding.id.startsWith('legacy-')));
  assert.ok(records.every((record) => record.finding.conditions.length > 0));

  const patching = records.find((record) => record.question.id === 'cyber-device-patching');
  assert.ok(patching);
  assert.equal(evaluateFindingDefinition(patching.finding, {
    'cyber-device-patching': { questionId: 'cyber-device-patching', value: 'managed', evidenceLevel: 'self-reported' },
  }), false);
  assert.equal(evaluateFindingDefinition(patching.finding, {
    'cyber-device-patching': { questionId: 'cyber-device-patching', value: 'manual', evidenceLevel: 'self-reported' },
  }), true);
});

test('capability results aggregate through primary categories only', () => {
  const answers = {
    'bcdr-backup-test': { questionId: 'bcdr-backup-test', value: 'routine', evidenceLevel: 'manually-verified' as const },
    'bcdr-recovery-owner': { questionId: 'bcdr-recovery-owner', value: 'yes', evidenceLevel: 'manually-verified' as const },
  };
  const results = calculateCapabilityResults(activeAssessmentVersion, answers);
  const recovery = results.find((result) => result.capabilityId === 'recovery-capability');
  assert.ok(recovery);
  assert.equal(recovery.score, 91);
  assert.equal(recovery.confidence, 0.8);

  const categories = aggregateCapabilityResults(activeAssessmentVersion.categories, activeAssessmentVersion.capabilities, results);
  const continuity = categories.find((category) => category.categoryId === 'business-continuity');
  const operations = categories.find((category) => category.categoryId === 'technology-operations');
  assert.ok(continuity);
  assert.ok(operations);
  assert.equal(continuity.score, recovery.score);
  assert.equal(operations.score, 0);
});

test('compatibility read model preserves category order and stable question IDs', () => {
  const readModel = createAssessmentReadModel(activeAssessmentVersion);
  assert.deepEqual(readModel.categories.map((category) => category.order), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.ok(readModel.questions.some((question) => question.id === 'bcdr-backup-test'));
  assert.ok(readModel.questions.some((question) => question.id === 'cyber-device-patching'));
});

test('active read model remains consumable by existing UI adapters', () => {
  assert.equal(assessmentReadModel.categories.length, 10);
  assert.equal(assessmentReadModel.questions.length, 20);
  assert.ok(assessmentReadModel.questions.every((question) => question.categoryId));
});
