import type { CapabilityDomain } from '../types.ts';

export const domains: CapabilityDomain[] = [
  { id: 'business-alignment', name: 'Business Alignment', description: 'Capabilities that establish what the business depends on and how technology supports its goals.', order: 1 },
  { id: 'identity-access-management', name: 'Identity and Access Management', description: 'Capabilities that control who can access business systems, data, and administrative functions.', order: 2 },
  { id: 'device-endpoint-management', name: 'Device and Endpoint Management', description: 'Capabilities that manage laptops, desktops, mobile devices, servers, and other business technology assets.', order: 3 },
  { id: 'data-protection-information-management', name: 'Data Protection and Information Management', description: 'Capabilities that identify, protect, retain, recover, and dispose of business information.', order: 4 },
  { id: 'infrastructure-platform-management', name: 'Infrastructure and Platform Management', description: 'Capabilities that govern cloud services, networks, hosting, domains, and foundational technology platforms.', order: 5 },
  { id: 'security-operations', name: 'Security Operations', description: 'Capabilities that identify, detect, respond to, and learn from security threats.', order: 6 },
  { id: 'technology-operations-service-management', name: 'Technology Operations and Service Management', description: 'Capabilities that keep everyday technology services reliable, supportable, and understandable.', order: 7 },
  { id: 'business-continuity-resilience', name: 'Business Continuity and Resilience', description: 'Capabilities that help the business continue operating and recover from disruption.', order: 8 },
  { id: 'productivity-collaboration-knowledge', name: 'Productivity, Collaboration, and Knowledge Management', description: 'Capabilities that help employees communicate, find information, and complete work efficiently.', order: 9 },
  { id: 'governance-risk-compliance', name: 'Governance, Risk, and Compliance', description: 'Capabilities that establish leadership oversight, accountability, policies, and risk visibility.', order: 10 },
  { id: 'vendor-third-party-management', name: 'Vendor and Third-Party Management', description: 'Capabilities that manage technology providers, outsourced services, software vendors, and external dependencies.', order: 11 },
  { id: 'technology-financial-management', name: 'Technology Financial Management', description: 'Capabilities that provide visibility and control over technology spending.', order: 12 },
  { id: 'application-software-management', name: 'Application and Software Management', description: 'Capabilities that govern purchased, configured, and custom-built business applications.', order: 13 },
  { id: 'ai-governance-enablement', name: 'AI Governance and Enablement', description: 'Capabilities that allow the business to use AI productively without creating unmanaged risk.', order: 14 },
];
