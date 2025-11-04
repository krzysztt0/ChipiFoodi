import type { DietGoal } from '../store/userGoals';

export interface Recipe {
  id: string;
  title: string;
  price: string;
  calories: number;
  image: string;
  goals: DietGoal[];
}

export const RECIPES: Recipe[] = [
  {
    id: 'r1',
    title: 'Szybka zupa z soczewicy',
    price: '$2.50',
    calories: 450,
    image: 'https://via.placeholder.com/300',
    goals: ['balanced', 'budget'],
  },
  {
    id: 'r2',
    title: 'Tost z awokado i jajkiem',
    price: '$1.50',
    calories: 350,
    image: 'https://via.placeholder.com/300',
    goals: ['balanced', 'budget'],
  },
  {
    id: 'r3',
    title: 'Patelnia z kurczakiem i ryżem',
    price: '$3.00',
    calories: 550,
    image: 'https://via.placeholder.com/300',
    goals: ['balanced'],
  },
  {
    id: 'r4',
    title: 'Smoothie energetyczne z jagodami',
    price: '$2.80',
    calories: 320,
    image: 'https://via.placeholder.com/300',
    goals: ['quick', 'balanced'],
  },
  {
    id: 'r5',
    title: 'Makaron pełnoziarnisty z pesto',
    price: '$2.20',
    calories: 480,
    image: 'https://via.placeholder.com/300',
    goals: ['balanced'],
  },
  {
    id: 'r6',
    title: 'Sałatka z ciecierzycą i fetą',
    price: '$1.90',
    calories: 410,
    image: 'https://via.placeholder.com/300',
    goals: ['balanced', 'quick'],
  },
  {
    id: 'r7',
    title: 'Zapiekanka warzywna',
    price: '$1.70',
    calories: 430,
    image: 'https://via.placeholder.com/300',
    goals: ['budget'],
  },
];
