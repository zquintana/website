export const maturityLevels = [
  { score: 0, label: 'Not Present' },
  { score: 1, label: 'Ad Hoc' },
  { score: 2, label: 'Basic' },
  { score: 3, label: 'Defined' },
  { score: 4, label: 'Managed' },
  { score: 5, label: 'Optimized' },
] as const;

export const scoringModels = {
  'control-status': ['Absent', 'Limited', 'Substantially Implemented', 'Fully Implemented'],
  'process-maturity': ['Ad Hoc', 'Repeatable', 'Defined', 'Measured', 'Continuously Improved'],
  'business-capability': ['Critical Exposure', 'Fragile', 'Functional', 'Reliable', 'Resilient'],
} as const;
