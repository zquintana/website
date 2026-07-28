import { assessmentReadModel } from '../methodology/index.ts';

export const assessmentCategories = assessmentReadModel.categories;
export const categoryWeightTotal = assessmentCategories.reduce((total, category) => total + category.weight, 0);
