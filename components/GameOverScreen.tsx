// Creating the GameOverScreen component.
import React from 'react';
import { TOTAL_QUESTIONS } from '../constants';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestart }) => {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-4 font-themed">Game Over!</h2>
      <p className="text-2xl mb-8">You scored {score} out of {TOTAL_QUESTIONS}</p>
      <button
        onClick={onRestart}
        className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-all duration-200 transform hover:scale-105"
      >
        Play Again
      </button>
    </div>
  );
};

export default GameOverScreen;
