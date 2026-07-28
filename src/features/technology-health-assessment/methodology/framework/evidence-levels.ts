export const evidenceLevels = [
  { id: 'self-reported', label: 'Unverified', confidence: 0.4 },
  { id: 'documentation-reviewed', label: 'Documentation reviewed', confidence: 0.65 },
  { id: 'manually-verified', label: 'Manually verified', confidence: 0.8 },
  { id: 'automatically-verified', label: 'Automatically verified', confidence: 1, hiddenInMvp: true },
] as const;
