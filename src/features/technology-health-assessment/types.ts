export type Severity = 'low' | 'moderate' | 'high' | 'critical';
export type EvidenceLevel = 'self-reported' | 'documentation-reviewed' | 'manually-verified' | 'automatically-verified';
export type ExecutiveConfidenceLabel = 'reported' | 'observed' | 'verified';
export type EvidenceSource = 'questionnaire' | 'interview' | 'documentation' | 'screenshot' | 'manual-review' | 'integration';
export type ResponseType = 'single-choice' | 'multi-choice' | 'yes-no' | 'numeric-range' | 'text';

export type StandardReference = {
  name: string;
  reference?: string;
};

export type RecommendationDefinition = {
  title: string;
  action: string;
  businessImpact: string;
};

export type CriticalFindingRule = {
  optionIds?: string[];
  maturityAtOrBelow?: 0 | 1 | 2 | 3 | 4 | 5;
  findingTitle: string;
};

export type AssessmentOption = {
  id: string;
  label: string;
  description?: string;
  maturityScore?: 0 | 1 | 2 | 3 | 4 | 5;
};

export type UnknownBehavior = {
  maturityScore: 0 | 1 | 2 | 3 | 4 | 5;
  note: string;
};

export type AssessmentQuestion = {
  id: string;
  categoryId: string;
  prompt: string;
  description?: string;
  businessImpact?: string;
  responseType: ResponseType;
  options?: AssessmentOption[];
  allowUnknown?: boolean;
  allowNotApplicable?: boolean;
  unknownBehavior?: UnknownBehavior;
  importance: 1 | 2 | 3 | 4 | 5;
  severity: Severity;
  foundational?: boolean;
  criticalFindingRule?: CriticalFindingRule;
  standards: StandardReference[];
  recommendation?: RecommendationDefinition;
};

export type AssessmentCategory = {
  id: string;
  name: string;
  shortDescription: string;
  businessExplanation: string;
  weight: number;
  standards: StandardReference[];
  order: number;
};

export type BusinessProfile = {
  businessName: string;
  respondentName: string;
  respondentEmail: string;
  respondentRole?: string;
  industry?: string;
  employeeCount?: string;
  revenueRange?: string;
  locations?: string;
  workforceModel?: string;
  productivityPlatform?: string;
  hasInternalIt?: string;
  hasOutsideProvider?: string;
  primaryConcerns?: string;
  criticalSystems?: string;
};

export type AssessmentAnswer = {
  questionId: string;
  value?: string | string[] | number;
  isUnknown?: boolean;
  isNotApplicable?: boolean;
  evidenceLevel: EvidenceLevel;
  evidenceSource?: EvidenceSource;
  evidenceCapturedAt?: string;
  evidenceReference?: string;
  evidenceReviewer?: string;
  notes?: string;
};

export type AssessmentState = {
  assessmentId: string;
  version: string;
  startedAt: string;
  lastUpdatedAt: string;
  status: 'not-started' | 'in-progress' | 'completed';
  businessProfile: BusinessProfile;
  answers: Record<string, AssessmentAnswer>;
  currentCategoryId?: string;
};

export type QuestionScore = {
  questionId: string;
  categoryId: string;
  maturityScore: number;
  normalizedScore: number;
  confidence: number;
  applicable: boolean;
  unknown: boolean;
};

export type CategoryScore = {
  categoryId: string;
  score: number;
  maturityScore: number;
  confidence: number;
  answered: number;
  applicable: number;
  findings: number;
};

export type Finding = {
  id: string;
  questionId: string;
  categoryId: string;
  title: string;
  businessImpact: string;
  currentMaturity: number;
  recommendedAction: string;
  priorityScore: number;
  priorityLevel: 'critical' | 'high' | 'medium' | 'low' | 'strength';
  timeframe: 'Immediate Attention' | 'Next 30 Days' | 'Next 90 Days' | 'Longer-Term Improvements';
  standards: StandardReference[];
  requiresVerification: boolean;
  critical: boolean;
};

export type AssessmentScores = {
  overallScore: number;
  overallMaturityScore: number;
  overallConfidence: number;
  categoryScores: CategoryScore[];
  questionScores: QuestionScore[];
};
