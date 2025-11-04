import { useSyncExternalStore } from 'react';

export type DietGoal = 'balanced' | 'budget' | 'quick';

interface UserGoalsState {
  selectedGoal: DietGoal | null;
}

type Listener = () => void;

const state: UserGoalsState = {
  selectedGoal: null,
};

const listeners = new Set<Listener>();

const emitChange = () => {
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: Listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => state;

export const useUserGoals = () =>
  useSyncExternalStore(subscribe, getSnapshot).selectedGoal;

export const setUserGoal = (goal: DietGoal | null) => {
  if (state.selectedGoal === goal) {
    return;
  }

  state.selectedGoal = goal;
  emitChange();
};

export const toggleUserGoal = (goal: DietGoal) => {
  setUserGoal(state.selectedGoal === goal ? null : goal);
};

