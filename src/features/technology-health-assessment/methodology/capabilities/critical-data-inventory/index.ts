import type { CapabilityModule } from '../../types.ts';
import { criticalDataInventoryCapability } from './capability.ts';
import { criticalDataInventoryFindings } from './findings.ts';
import { criticalDataInventoryQuestions } from './questions.ts';
import { criticalDataInventoryRecommendations } from './recommendations.ts';
import { criticalDataInventoryStandardMappings } from './standards.ts';

export const criticalDataInventoryModule: CapabilityModule = {
  capability: criticalDataInventoryCapability,
  questions: criticalDataInventoryQuestions,
  findings: criticalDataInventoryFindings,
  recommendations: criticalDataInventoryRecommendations,
  standardMappings: criticalDataInventoryStandardMappings,
};
