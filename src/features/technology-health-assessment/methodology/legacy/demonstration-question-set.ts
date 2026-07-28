import legacyAssessment from './assessment.v1.legacy.json' with { type: 'json' };
import type { AssessmentQuestion } from '../../types.ts';
import type { LegacyQuestionSet, QuestionId } from '../types.ts';

export const migratedQuestionIds: QuestionId[] = [
  'bcdr-backup-test',
  'bcdr-recovery-owner',
  'iam-offboarding',
  'cyber-admin-mfa',
  'iam-shared-admin',
];

export const legacyDemonstrationQuestionSet: LegacyQuestionSet = {
  label: `${legacyAssessment.questionSetLabel} Remaining unmigrated questions are retained as legacy demonstration data.`,
  questions: (legacyAssessment.questions as AssessmentQuestion[]).filter((question) => !migratedQuestionIds.includes(question.id)),
};
