import { z } from 'zod';
import type { AssessmentVersion } from './types.ts';

const severitySchema = z.enum(['low', 'moderate', 'high', 'critical']);
const applicabilitySchema = z.union([
  z.object({ type: z.literal('always') }),
  z.object({
    type: z.literal('business-profile'),
    field: z.string().min(1),
    operator: z.enum(['exists', 'equals', 'in']),
    value: z.string().optional(),
    values: z.array(z.string()).optional(),
  }),
]);

const categorySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  shortDescription: z.string().min(1),
  businessExplanation: z.string().min(1),
  weight: z.number().positive(),
  order: z.number().int().positive(),
});

const optionSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  maturityScore: z.number().min(0).max(5).optional(),
}).passthrough();

const assessmentVersionSchema = z.object({
  version: z.string().min(1),
  status: z.enum(['demonstration', 'draft', 'published']),
  methodologyHash: z.string().min(1),
  domains: z.array(z.object({ id: z.string().min(1), name: z.string().min(1), order: z.number().int().positive() }).passthrough()),
  categories: z.array(categorySchema),
  capabilityCatalog: z.array(z.object({
    id: z.string().min(1),
    domainId: z.string().min(1),
    primaryCategoryId: z.string().min(1),
    secondaryCategoryIds: z.array(z.string()).optional(),
    implementationStatus: z.enum(['cataloged', 'implemented']),
    applicability: applicabilitySchema.optional(),
    readiness: z.object({
      status: z.enum(['proposed', 'structured', 'draft-questions', 'pilot', 'active', 'deprecated']),
      owner: z.string().nullable(),
      reviewer: z.string().nullable(),
      lastReviewedAt: z.string().nullable(),
      notes: z.string().optional(),
    }),
  }).passthrough()),
  standards: z.array(z.object({ id: z.string().min(1), name: z.string().min(1) }).passthrough()),
  capabilities: z.array(z.object({
    id: z.string().min(1),
    domainId: z.string().min(1),
    primaryCategoryId: z.string().min(1),
    questionIds: z.array(z.string()),
    findingIds: z.array(z.string()),
    recommendationIds: z.array(z.string()),
    standardMappingIds: z.array(z.string()),
    applicability: applicabilitySchema.optional(),
  }).passthrough()),
  questions: z.array(z.object({
    id: z.string().min(1),
    capabilityId: z.string().min(1),
    responseType: z.enum(['single-choice', 'multi-choice', 'yes-no', 'numeric-range', 'text']),
    options: z.array(optionSchema).optional(),
    importance: z.number().int().min(1).max(5),
    severity: severitySchema,
    applicability: applicabilitySchema.optional(),
  }).passthrough()),
  findings: z.array(z.object({
    id: z.string().min(1),
    capabilityId: z.string().min(1),
    severity: severitySchema,
    conditions: z.array(z.object({ questionId: z.string().min(1), operator: z.string().min(1) }).passthrough()),
    recommendationIds: z.array(z.string()),
  }).passthrough()),
  recommendations: z.array(z.object({
    id: z.string().min(1),
    capabilityId: z.string().min(1),
    standardMappingIds: z.array(z.string()).optional(),
  }).passthrough()),
  standardMappings: z.array(z.object({
    id: z.string().min(1),
    capabilityId: z.string().min(1),
    standardId: z.string().min(1),
  }).passthrough()),
  legacyQuestionSet: z.object({ questions: z.array(z.any()), label: z.string() }),
});

function duplicateIds(items: Array<{ id: string }>): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const item of items) {
    if (seen.has(item.id)) duplicates.add(item.id);
    seen.add(item.id);
  }
  return [...duplicates];
}

function assertNoDuplicates(label: string, items: Array<{ id: string }>, errors: string[]): void {
  for (const id of duplicateIds(items)) errors.push(`Duplicate ${label} ID: ${id}`);
}

export function validateAssessmentVersion(version: AssessmentVersion): AssessmentVersion {
  const parsed = assessmentVersionSchema.safeParse(version);
  if (!parsed.success) {
    throw new Error(`Invalid assessment methodology schema: ${parsed.error.issues.map((issue) => issue.path.join('.') + ' ' + issue.message).join('; ')}`);
  }

  const errors: string[] = [];
  const domainIds = new Set(version.domains.map((item) => item.id));
  const categoryIds = new Set(version.categories.map((item) => item.id));
  const catalogCapabilityIds = new Set(version.capabilityCatalog.map((item) => item.id));
  const capabilityIds = new Set(version.capabilities.map((item) => item.id));
  const questionIds = new Set(version.questions.map((item) => item.id));
  const findingIds = new Set(version.findings.map((item) => item.id));
  const recommendationIds = new Set(version.recommendations.map((item) => item.id));
  const standardIds = new Set(version.standards.map((item) => item.id));
  const mappingIds = new Set(version.standardMappings.map((item) => item.id));

  assertNoDuplicates('domain', version.domains, errors);
  assertNoDuplicates('category', version.categories, errors);
  assertNoDuplicates('capability catalog', version.capabilityCatalog, errors);
  assertNoDuplicates('capability', version.capabilities, errors);
  assertNoDuplicates('question', version.questions, errors);
  assertNoDuplicates('finding', version.findings, errors);
  assertNoDuplicates('recommendation', version.recommendations, errors);
  assertNoDuplicates('standard mapping', version.standardMappings, errors);

  const weightTotal = version.categories.reduce((total, category) => total + category.weight, 0);
  if (weightTotal !== 100) errors.push(`Category weights must total 100. Actual total: ${weightTotal}`);

  for (const catalogEntry of version.capabilityCatalog) {
    if (!domainIds.has(catalogEntry.domainId)) errors.push(`Catalog capability ${catalogEntry.id} references missing domain ${catalogEntry.domainId}`);
    if (!categoryIds.has(catalogEntry.primaryCategoryId)) errors.push(`Catalog capability ${catalogEntry.id} references missing primary category ${catalogEntry.primaryCategoryId}`);
    for (const categoryId of catalogEntry.secondaryCategoryIds ?? []) {
      if (!categoryIds.has(categoryId)) errors.push(`Catalog capability ${catalogEntry.id} references missing secondary category ${categoryId}`);
    }
    if (catalogEntry.readiness.status === 'pilot' && catalogEntry.implementationStatus !== 'implemented') {
      errors.push(`Pilot capability ${catalogEntry.id} must have an implemented capability module`);
    }
    if (catalogEntry.readiness.status === 'active' && catalogEntry.implementationStatus !== 'implemented') {
      errors.push(`Active capability ${catalogEntry.id} must have an implemented capability module`);
    }
  }

  for (const capability of version.capabilities) {
    if (!catalogCapabilityIds.has(capability.id)) errors.push(`Implemented capability ${capability.id} is missing from capability catalog`);
    if (!domainIds.has(capability.domainId)) errors.push(`Capability ${capability.id} references missing domain ${capability.domainId}`);
    if (!categoryIds.has(capability.primaryCategoryId)) errors.push(`Capability ${capability.id} references missing primary category ${capability.primaryCategoryId}`);
    for (const categoryId of capability.secondaryCategoryIds ?? []) {
      if (!categoryIds.has(categoryId)) errors.push(`Capability ${capability.id} references missing secondary category ${categoryId}`);
    }
    if (capability.questionIds.length === 0) errors.push(`Capability ${capability.id} has no questions`);
    for (const relationship of capability.categoryContributions ?? []) {
      if (!categoryIds.has(relationship.categoryId)) errors.push(`Capability ${capability.id} references missing secondary category ${relationship.categoryId}`);
    }
    for (const questionId of capability.questionIds) if (!questionIds.has(questionId)) errors.push(`Capability ${capability.id} references missing question ${questionId}`);
    for (const findingId of capability.findingIds) if (!findingIds.has(findingId)) errors.push(`Capability ${capability.id} references missing finding ${findingId}`);
    for (const recommendationId of capability.recommendationIds) if (!recommendationIds.has(recommendationId)) errors.push(`Capability ${capability.id} references missing recommendation ${recommendationId}`);
    for (const mappingId of capability.standardMappingIds) if (!mappingIds.has(mappingId)) errors.push(`Capability ${capability.id} references missing standard mapping ${mappingId}`);
  }

  for (const question of version.questions) {
    if (!capabilityIds.has(question.capabilityId)) errors.push(`Question ${question.id} references missing capability ${question.capabilityId}`);
    for (const option of question.options ?? []) {
      if (typeof option.maturityScore === 'number' && (option.maturityScore < 0 || option.maturityScore > 5)) errors.push(`Question ${question.id} option ${option.id} has invalid maturity score ${option.maturityScore}`);
    }
  }

  for (const finding of version.findings) {
    if (!capabilityIds.has(finding.capabilityId)) errors.push(`Finding ${finding.id} references missing capability ${finding.capabilityId}`);
    for (const condition of finding.conditions) if (!questionIds.has(condition.questionId)) errors.push(`Finding ${finding.id} references missing question ${condition.questionId}`);
    for (const recommendationId of finding.recommendationIds) if (!recommendationIds.has(recommendationId)) errors.push(`Finding ${finding.id} references missing recommendation ${recommendationId}`);
  }

  for (const recommendation of version.recommendations) {
    if (!capabilityIds.has(recommendation.capabilityId)) errors.push(`Recommendation ${recommendation.id} references missing capability ${recommendation.capabilityId}`);
    for (const mappingId of recommendation.standardMappingIds ?? []) if (!mappingIds.has(mappingId)) errors.push(`Recommendation ${recommendation.id} references missing standard mapping ${mappingId}`);
  }

  for (const mapping of version.standardMappings) {
    if (!capabilityIds.has(mapping.capabilityId)) errors.push(`Standard mapping ${mapping.id} references missing capability ${mapping.capabilityId}`);
    if (!standardIds.has(mapping.standardId)) errors.push(`Standard mapping ${mapping.id} references missing standard ${mapping.standardId}`);
  }

  if (errors.length > 0) throw new Error(`Invalid assessment methodology:\n${errors.join('\n')}`);
  return version;
}
