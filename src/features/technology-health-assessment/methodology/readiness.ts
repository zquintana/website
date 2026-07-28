import type { CapabilityCatalogEntry, CapabilityReadinessStatus } from './types.ts';

export const capabilityReadinessStatuses: CapabilityReadinessStatus[] = [
  'proposed',
  'structured',
  'draft-questions',
  'pilot',
  'active',
  'deprecated',
];

export function isCapabilityReadyForActivation(capability: CapabilityCatalogEntry): boolean {
  return capability.readiness.status === 'active' && capability.implementationStatus === 'implemented';
}

export function getCapabilityReadinessSummary(capabilities: CapabilityCatalogEntry[]): Record<CapabilityReadinessStatus, number> {
  return capabilities.reduce<Record<CapabilityReadinessStatus, number>>((summary, capability) => {
    summary[capability.readiness.status] += 1;
    return summary;
  }, {
    proposed: 0,
    structured: 0,
    'draft-questions': 0,
    pilot: 0,
    active: 0,
    deprecated: 0,
  });
}
