import type { CapabilityModule } from '../../types.ts';
import { identityInventoryCapability } from './capability.ts';
import { identityInventoryFindings } from './findings.ts';
import { identityInventoryQuestions } from './questions.ts';
import { identityInventoryRecommendations } from './recommendations.ts';
import { identityInventoryStandardMappings } from './standards.ts';

export const identityInventoryModule: CapabilityModule = {
  capability: identityInventoryCapability,
  questions: identityInventoryQuestions,
  findings: identityInventoryFindings,
  recommendations: identityInventoryRecommendations,
  standardMappings: identityInventoryStandardMappings,
};
