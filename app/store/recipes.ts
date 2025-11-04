import { RECIPES, type Recipe } from '../data/recipes';
import type { DietGoal } from './userGoals';

export const selectRecipesByGoal = (goal: DietGoal | null): Recipe[] => {
  if (!goal) {
    return [...RECIPES];
  }

  return RECIPES.filter((recipe) => recipe.goals.includes(goal));
};

export type { Recipe };
