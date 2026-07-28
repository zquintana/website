import type { CapabilityModule } from '../../types.ts';
import { identityLifecycleCapability } from './capability.ts';
import { identityLifecycleFindings } from './findings.ts';
import { identityLifecycleQuestions } from './questions.ts';
import { identityLifecycleRecommendations } from './recommendations.ts';
import { identityLifecycleStandardMappings } from './standards.ts';

export const identityLifecycleModule: CapabilityModule = {
  capability: identityLifecycleCapability,
  questions: identityLifecycleQuestions,
  findings: identityLifecycleFindings,
  recommendations: identityLifecycleRecommendations,
  standardMappings: identityLifecycleStandardMappings,
};
