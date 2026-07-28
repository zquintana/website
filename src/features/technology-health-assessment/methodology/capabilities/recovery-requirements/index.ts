import type { CapabilityModule } from '../../types.ts';
import { recoveryRequirementsCapability } from './capability.ts';
import { recoveryRequirementsFindings } from './findings.ts';
import { recoveryRequirementsQuestions } from './questions.ts';
import { recoveryRequirementsRecommendations } from './recommendations.ts';
import { recoveryRequirementsStandardMappings } from './standards.ts';

export const recoveryRequirementsModule: CapabilityModule = {
  capability: recoveryRequirementsCapability,
  questions: recoveryRequirementsQuestions,
  findings: recoveryRequirementsFindings,
  recommendations: recoveryRequirementsRecommendations,
  standardMappings: recoveryRequirementsStandardMappings,
};
