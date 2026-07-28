import assert from 'node:assert/strict';
import test from 'node:test';

import { backupRecoveryModule } from '../src/features/technology-health-assessment/methodology/capabilities/backup-recovery/index.ts';
import { activeAssessmentVersion, assessmentReadModel, createAssessmentReadModel, getCapabilityReadinessSummary, isCapabilityReadyForActivation, validateAssessmentVersion } from '../src/features/technology-health-assessment/methodology/index.ts';

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

test('unknown-answer behavior supports visibility findings and provisional scores', () => {
  const backupTest = backupRecoveryModule.questions.find((question) => question.id === 'bcdr-backup-test');
  const recoveryOwner = backupRecoveryModule.questions.find((question) => question.id === 'bcdr-recovery-owner');

  assert.deepEqual(backupTest?.unknownBehavior, { type: 'visibility-finding', findingId: 'backup-restore-untested' });
  assert.equal(recoveryOwner?.unknownBehavior?.type, 'provisional-score');
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
