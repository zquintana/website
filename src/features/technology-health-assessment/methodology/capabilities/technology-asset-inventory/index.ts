import type { CapabilityModule } from '../../types.ts';
import { technologyAssetInventoryCapability } from './capability.ts';
import { technologyAssetInventoryFindings } from './findings.ts';
import { technologyAssetInventoryQuestions } from './questions.ts';
import { technologyAssetInventoryRecommendations } from './recommendations.ts';
import { technologyAssetInventoryStandardMappings } from './standards.ts';

export const technologyAssetInventoryModule: CapabilityModule = {
  capability: technologyAssetInventoryCapability,
  questions: technologyAssetInventoryQuestions,
  findings: technologyAssetInventoryFindings,
  recommendations: technologyAssetInventoryRecommendations,
  standardMappings: technologyAssetInventoryStandardMappings,
};
