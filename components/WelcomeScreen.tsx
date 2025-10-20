// Creating the WelcomeScreen component.
import React from 'react';

interface WelcomeScreenProps {
  onStartGame: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartGame }) => {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-4 font-themed">Gemini Trivia</h1>
      <p className="text-xl mb-8 text-slate-300">Test your knowledge with AI-generated questions!</p>
      <button
        onClick={onStartGame}
        className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-all duration-200 transform hover:scale-105"
      >
        Start Game
      </button>
    </div>
  );
};

export default WelcomeScreen;
