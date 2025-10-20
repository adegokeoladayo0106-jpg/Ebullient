// Populating constants.ts with game constants.
import { Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'history', name: 'History' },
  { id: 'science', name: 'Science' },
  { id: 'movies', name: 'Movies' },
  { id: 'music', name: 'Music' },
  { id: 'sports', name: 'Sports' },
  { id: 'geography', name: 'Geography' },
  { id: 'art', name: 'Art' },
  { id: 'technology', name: 'Technology' },
  { id: 'literature', name: 'Literature' },
  { id: 'animals', name: 'Animals' },
];

export const DIFFICULTIES: { id: string, name: string }[] = [
    { id: 'Easy', name: 'Easy' },
    { id: 'Medium', name: 'Medium' },
    { id: 'Hard', name: 'Hard' },
];

export const TOTAL_QUESTIONS = 10;