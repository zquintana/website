import type { CapabilityModule } from '../../types.ts';
import { privilegedAccessCapability } from './capability.ts';
import { privilegedAccessFindings } from './findings.ts';
import { privilegedAccessQuestions } from './questions.ts';
import { privilegedAccessRecommendations } from './recommendations.ts';
import { privilegedAccessStandardMappings } from './standards.ts';

export const privilegedAccessModule: CapabilityModule = {
  capability: privilegedAccessCapability,
  questions: privilegedAccessQuestions,
  findings: privilegedAccessFindings,
  recommendations: privilegedAccessRecommendations,
  standardMappings: privilegedAccessStandardMappings,
};
