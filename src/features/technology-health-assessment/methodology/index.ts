import { createAssessmentReadModel } from './read-model.ts';
import { assessmentV010 } from './versions/v0.1.0.ts';

export const activeAssessmentVersion = assessmentV010;
export const assessmentReadModel = createAssessmentReadModel(activeAssessmentVersion);

export { createAssessmentReadModel } from './read-model.ts';
export { evaluateFindingCondition, evaluateFindingDefinition, evaluateMethodologyFindings } from './findings.ts';
export { validateAssessmentVersion } from './validation.ts';
export { capabilityReadinessStatuses, getCapabilityReadinessSummary, isCapabilityReadyForActivation } from './readiness.ts';
export type * from './types.ts';
