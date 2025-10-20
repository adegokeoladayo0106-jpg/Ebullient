// Creating the DifficultyScreen component.
import React from 'react';
import { DIFFICULTIES } from '../constants';
import { Difficulty } from '../types';

interface DifficultyScreenProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

const DifficultyScreen: React.FC<DifficultyScreenProps> = ({ onSelectDifficulty }) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl mb-8">Choose a Difficulty</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        {DIFFICULTIES.map(difficulty => (
          <button
            key={difficulty.id}
            onClick={() => onSelectDifficulty(difficulty.name as Difficulty)}
            className="bg-slate-700 hover:bg-emerald-500 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 w-full md:w-auto"
          >
            <span className="text-xl font-semibold">{difficulty.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultyScreen;
