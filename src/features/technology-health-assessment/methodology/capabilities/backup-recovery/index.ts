import type { CapabilityModule } from '../../types.ts';
import { backupRecoveryCapability } from './capability.ts';
import { backupRecoveryFindings } from './findings.ts';
import { backupRecoveryQuestions } from './questions.ts';
import { backupRecoveryRecommendations } from './recommendations.ts';
import { backupRecoveryStandardMappings } from './standards.ts';

export const backupRecoveryModule: CapabilityModule = {
  capability: backupRecoveryCapability,
  questions: backupRecoveryQuestions,
  findings: backupRecoveryFindings,
  recommendations: backupRecoveryRecommendations,
  standardMappings: backupRecoveryStandardMappings,
};
