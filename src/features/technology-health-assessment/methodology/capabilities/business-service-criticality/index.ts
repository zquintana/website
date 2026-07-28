import type { CapabilityModule } from '../../types.ts';
import { businessServiceCriticalityCapability } from './capability.ts';
import { businessServiceCriticalityFindings } from './findings.ts';
import { businessServiceCriticalityQuestions } from './questions.ts';
import { businessServiceCriticalityRecommendations } from './recommendations.ts';
import { businessServiceCriticalityStandardMappings } from './standards.ts';

export const businessServiceCriticalityModule: CapabilityModule = {
  capability: businessServiceCriticalityCapability,
  questions: businessServiceCriticalityQuestions,
  findings: businessServiceCriticalityFindings,
  recommendations: businessServiceCriticalityRecommendations,
  standardMappings: businessServiceCriticalityStandardMappings,
};
