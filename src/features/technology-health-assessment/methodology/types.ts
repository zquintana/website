import type { ApplicabilityRule, AssessmentCategory, AssessmentOption, AssessmentQuestion, RecommendationDefinition, Severity, StandardReference } from '../types.ts';

export type CategoryId = string;
export type DomainId = string;
export type CapabilityId = string;
export type QuestionId = string;
export type FindingId = string;
export type RecommendationId = string;
export type StandardId = string;
export type StandardMappingId = string;

export type ScoringModel = 'control-status' | 'process-maturity' | 'business-capability';
export type FindingOperator = 'equals' | 'in' | 'unknown' | 'not-applicable' | 'lte' | 'gte';
export type CapabilityReadinessStatus = 'proposed' | 'structured' | 'draft-questions' | 'pilot' | 'active' | 'deprecated';

export type CapabilityReadiness = {
  status: CapabilityReadinessStatus;
  owner: string | null;
  reviewer: string | null;
  lastReviewedAt: string | null;
  notes?: string;
};

export type UnknownAnswerBehavior =
  | { type: 'confidence-only' }
  | { type: 'provisional-score'; score: 0 | 1 | 2 | 3 | 4 | 5; rationale: string }
  | { type: 'visibility-finding'; findingId: FindingId };

export type StandardDefinition = {
  id: StandardId;
  name: string;
  version?: string;
  publisher?: string;
  sourceUrl?: string;
};

export type StandardMapping = {
  id: StandardMappingId;
  capabilityId: CapabilityId;
  standardId: StandardId;
  reference?: string;
  relationship: 'direct' | 'partial' | 'supporting';
  notes?: string;
};

export type CapabilityQuestion = Omit<AssessmentQuestion, 'categoryId' | 'standards' | 'recommendation' | 'criticalFindingRule' | 'unknownBehavior'> & {
  capabilityId: CapabilityId;
  standardMappingIds?: StandardMappingId[];
  unknownBehavior?: UnknownAnswerBehavior;
};

export type FindingCondition = {
  questionId: QuestionId;
  operator: FindingOperator;
  value?: string | number;
  values?: Array<string | number>;
};

export type FindingDefinition = {
  id: FindingId;
  capabilityId: CapabilityId;
  title: string;
  summary: string;
  businessImpact: string;
  severity: Severity;
  conditions: FindingCondition[];
  conditionMode?: 'all' | 'any';
  recommendationIds: RecommendationId[];
};

export type CapabilityRecommendation = {
  id: RecommendationId;
  capabilityId: CapabilityId;
  title: string;
  summary: string;
  actions: string[];
  expectedOutcome: string;
  effort?: 'low' | 'moderate' | 'high';
  targetWindow?: 'immediate' | '30-days' | '90-days' | 'long-term';
  standardMappingIds?: StandardMappingId[];
};

export type AssessmentCapability = {
  id: CapabilityId;
  name: string;
  description: string;
  businessOutcome: string;
  domainId: DomainId;
  primaryCategoryId: CategoryId;
  secondaryCategoryIds?: CategoryId[];
  foundational?: boolean;
  categoryContributions?: Array<{ categoryId: CategoryId; contribution: number }>;
  scoringModel: ScoringModel;
  applicability?: ApplicabilityRule;
  questionIds: QuestionId[];
  findingIds: FindingId[];
  recommendationIds: RecommendationId[];
  standardMappingIds: StandardMappingId[];
};

export type CapabilityCatalogEntry = Omit<AssessmentCapability, 'questionIds' | 'findingIds' | 'recommendationIds' | 'standardMappingIds'> & {
  implementationStatus: 'cataloged' | 'implemented';
  readiness: CapabilityReadiness;
};

export type CapabilityDomain = {
  id: DomainId;
  name: string;
  description: string;
  order: number;
};

export type CapabilityModule = {
  capability: AssessmentCapability;
  questions: CapabilityQuestion[];
  findings: FindingDefinition[];
  recommendations: CapabilityRecommendation[];
  standardMappings: StandardMapping[];
};

export type LegacyQuestionSet = {
  label: string;
  questions: AssessmentQuestion[];
};

export type AssessmentVersion = {
  version: string;
  status: 'demonstration' | 'draft' | 'published';
  methodologyHash: string;
  domains: CapabilityDomain[];
  categories: AssessmentCategory[];
  capabilityCatalog: CapabilityCatalogEntry[];
  standards: StandardDefinition[];
  capabilities: AssessmentCapability[];
  questions: CapabilityQuestion[];
  findings: FindingDefinition[];
  recommendations: CapabilityRecommendation[];
  standardMappings: StandardMapping[];
  legacyQuestionSet: LegacyQuestionSet;
};

export type AssessmentReadModel = {
  version: string;
  methodologyHash: string;
  questionSetLabel: string;
  categories: AssessmentCategory[];
  questions: AssessmentQuestion[];
};

export type CapabilityResult = {
  capabilityId: CapabilityId;
  score: number;
  maturityScore: number;
  confidence: number;
  answered: number;
  applicable: number;
  questionWeight: number;
  findings: number;
  foundational: boolean;
};

export function recommendationToLegacy(recommendation: CapabilityRecommendation): RecommendationDefinition {
  return {
    title: recommendation.title,
    action: recommendation.actions.join(' '),
    businessImpact: recommendation.expectedOutcome,
  };
}

export function standardsToLegacy(mappings: StandardMapping[], standards: StandardDefinition[]): StandardReference[] {
  return mappings.map((mapping) => {
    const standard = standards.find((item) => item.id === mapping.standardId);
    return {
      name: standard?.name ?? mapping.standardId,
      reference: mapping.reference,
    };
  });
}

export type LegacyAssessmentOption = AssessmentOption;
