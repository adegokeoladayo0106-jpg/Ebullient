// Creating the GameScreen component.
import React, { useState, useEffect, useCallback } from 'react';
import { Question } from '../types';

interface GameScreenProps {
  questions: Question[];
  onGameOver: (score: number) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ questions, onGameOver }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  
  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      onGameOver(score);
    }
  }, [currentQuestionIndex, questions.length, onGameOver, score]);

  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (isAnswered) {
      const timer = setTimeout(() => {
        handleNextQuestion();
      }, 1000); // Auto-advance after 1 second

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [isAnswered, handleNextQuestion]);

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    if (option === currentQuestion.answer) {
      setScore(prevScore => prevScore + 1);
    }
  };
  
  const getButtonClass = (option: string) => {
    if (!isAnswered) {
        return "bg-slate-700 hover:bg-emerald-600";
    }
    if (option === currentQuestion.answer) {
        return "bg-green-500";
    }
    if (option === selectedOption && option !== currentQuestion.answer) {
        return "bg-red-500";
    }
    return "bg-slate-700 opacity-50";
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <p className="text-lg text-slate-300">Question {currentQuestionIndex + 1} of {questions.length}</p>
        <p className="text-2xl font-semibold my-4">{currentQuestion.question}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={isAnswered}
            className={`p-4 rounded-lg text-left transition-colors duration-300 ${getButtonClass(option)}`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-2xl font-bold font-themed">Score: {score}</p>
      </div>
    </div>
  );
};

export default GameScreen;