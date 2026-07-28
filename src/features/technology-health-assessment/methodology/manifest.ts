import type { AssessmentVersion, CapabilityModule } from './types.ts';

export function getMethodologyHash(version: string): string {
  return `methodology-${version}-hash-placeholder`;
}

export function defineAssessmentVersion(input: Omit<AssessmentVersion, 'methodologyHash'> & { capabilityModules: CapabilityModule[] }): AssessmentVersion {
  const capabilities = input.capabilityModules.map((module) => module.capability);
  const questions = input.capabilityModules.flatMap((module) => module.questions);
  const findings = input.capabilityModules.flatMap((module) => module.findings);
  const recommendations = input.capabilityModules.flatMap((module) => module.recommendations);
  const standardMappings = input.capabilityModules.flatMap((module) => module.standardMappings);

  return {
    version: input.version,
    status: input.status,
    methodologyHash: getMethodologyHash(input.version),
    domains: input.domains,
    categories: input.categories,
    capabilityCatalog: input.capabilityCatalog,
    standards: input.standards,
    capabilities,
    questions,
    findings,
    recommendations,
    standardMappings,
    legacyQuestionSet: input.legacyQuestionSet,
  };
}
