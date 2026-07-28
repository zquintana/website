import { capabilityCatalog } from '../capabilities/catalog.ts';
import { backupRecoveryModule } from '../capabilities/backup-recovery/index.ts';
import { businessServiceCriticalityModule } from '../capabilities/business-service-criticality/index.ts';
import { identityLifecycleModule } from '../capabilities/identity-lifecycle/index.ts';
import { privilegedAccessModule } from '../capabilities/privileged-access/index.ts';
import { categories } from '../framework/categories.ts';
import { domains } from '../framework/domains.ts';
import { standards } from '../framework/standards.ts';
import { legacyDemonstrationQuestionSet } from '../legacy/demonstration-question-set.ts';
import { defineAssessmentVersion } from '../manifest.ts';
import { validateAssessmentVersion } from '../validation.ts';

export const assessmentV010 = validateAssessmentVersion(defineAssessmentVersion({
  version: '0.1.0',
  status: 'demonstration',
  foundationalTreatment: 'metadata-only',
  domains,
  categories,
  capabilityCatalog,
  standards,
  capabilityModules: [businessServiceCriticalityModule, backupRecoveryModule, identityLifecycleModule, privilegedAccessModule],
  legacyQuestionSet: legacyDemonstrationQuestionSet,
}));
