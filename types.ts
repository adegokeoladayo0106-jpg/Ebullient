// Populating types.ts with necessary type definitions for the application.
export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export interface Category {
  id: string;
  name: string;
}

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type GameState = 'welcome' | 'category' | 'difficulty' | 'playing' | 'gameOver';
