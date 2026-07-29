export type HealthCheckDimension = 'health' | 'risk' | 'resilience' | 'confidence' | 'ai';
export type HealthCheckCategory = 'Technology Leadership' | 'Daily Operations' | 'Security Basics' | 'Recovery and Continuity' | 'Technology Lifecycle' | 'Business Alignment' | 'AI Readiness';

export type HealthCheckOption = {
  id: string;
  label: string;
  scores: Partial<Record<HealthCheckDimension, number>>;
  riskSignal?: string;
  strengthSignal?: string;
  recommendationSignals?: string[];
};

export type HealthCheckCondition = {
  questionId: string;
  answerIds?: string[];
  unless?: boolean;
};

export type HealthCheckQuestion = {
  id: string;
  category: HealthCheckCategory;
  question: string;
  description?: string;
  options: HealthCheckOption[];
  condition?: HealthCheckCondition;
  weight?: number;
  resultDimensions: HealthCheckDimension[];
  recommendationSignals?: string[];
};

export type HealthCheckAnswer = {
  questionId: string;
  optionId: string;
};

export type HealthCheckState = {
  version: 'health-check-v1';
  answers: Record<string, HealthCheckAnswer>;
  currentIndex: number;
  startedAt: string;
  completedAt?: string;
};

export type HealthCheckRating = 'Healthy Foundation' | 'Generally Healthy, With Gaps' | 'Needs Attention' | 'Elevated Risk' | 'High Risk';
export type RiskRating = 'Low' | 'Moderate' | 'Elevated' | 'High';
export type ResilienceRating = 'Strong' | 'Adequate' | 'Fragile' | 'High Concern';
export type ConfidenceRating = 'High' | 'Medium' | 'Low';
export type AiRating = 'Governed and Advancing' | 'Ready to Experiment' | 'Emerging Opportunity' | 'Unmanaged Adoption' | 'Foundational Work Needed';

export type HealthCheckFinding = {
  id: string;
  title: string;
  why: string;
  nextStep: string;
  severity: 'high' | 'moderate' | 'low';
  questionId: string;
};

export type HealthCheckResult = {
  healthScore: number;
  healthRating: HealthCheckRating;
  risk: RiskRating;
  resilience: ResilienceRating;
  confidence: ConfidenceRating;
  aiReadiness: AiRating;
  strengths: Array<{ title: string; detail: string; questionId: string }>;
  findings: HealthCheckFinding[];
  recommendationIds: string[];
  priorityArea?: string;
};
