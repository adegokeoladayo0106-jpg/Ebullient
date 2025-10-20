// Creating the main App component to manage game state.
import React, { useState, useCallback } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import CategoryScreen from './components/CategoryScreen';
import DifficultyScreen from './components/DifficultyScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
import LoadingSpinner from './components/LoadingSpinner';
import { getTriviaQuestions } from './services/geminiService';
import { Question, Difficulty, GameState } from './types';
import { TOTAL_QUESTIONS } from './constants';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [category, setCategory] = useState<string>('');
  const [difficulty, setDifficulty] = useState<Difficulty | ''>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const startGame = useCallback(async () => {
    if (!category || !difficulty) return;
    
    setLoading(true);
    setError(null);
    try {
      const fetchedQuestions = await getTriviaQuestions(category, difficulty);
      if (fetchedQuestions.length > 0) {
        setQuestions(fetchedQuestions);
        setGameState('playing');
      } else {
        setError('Could not fetch questions. Please try a different category or difficulty.');
        setGameState('difficulty'); // Go back to difficulty selection
      }
    } catch (err) {
      setError('An error occurred while fetching questions. Please try again.');
      setGameState('difficulty'); // Go back
    } finally {
      setLoading(false);
    }
  }, [category, difficulty]);

  const handleStartGame = () => setGameState('category');

  const handleSelectCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setGameState('difficulty');
  };
  
  const handleSelectDifficulty = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
  };
  
  // Effect to fetch questions once difficulty is set
  React.useEffect(() => {
    if (gameState === 'difficulty' && category && difficulty) {
        startGame();
    }
  }, [gameState, category, difficulty, startGame]);

  const handleGameOver = (finalScore: number) => {
    setScore(finalScore);
    setGameState('gameOver');
  };

  const handleRestart = () => {
    setGameState('welcome');
    setCategory('');
    setDifficulty('');
    setQuestions([]);
    setScore(0);
    setError(null);
  };

  const renderContent = () => {
    if (loading) {
        return <LoadingSpinner text={`Generating ${TOTAL_QUESTIONS} questions about ${category} (${difficulty})...`} />;
    }
    if (error) {
        return (
            <div className="text-center">
                <p className="text-red-400 text-lg mb-4">{error}</p>
                <button
                    onClick={handleRestart}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded-full"
                >
                    Try Again
                </button>
            </div>
        );
    }
    switch (gameState) {
      case 'welcome':
        return <WelcomeScreen onStartGame={handleStartGame} />;
      case 'category':
        return <CategoryScreen onSelectCategory={handleSelectCategory} />;
      case 'difficulty':
        return <DifficultyScreen onSelectDifficulty={handleSelectDifficulty} />;
      case 'playing':
        return <GameScreen questions={questions} onGameOver={handleGameOver} />;
      case 'gameOver':
        return <GameOverScreen score={score} onRestart={handleRestart} />;
      default:
        return <WelcomeScreen onStartGame={handleStartGame} />;
    }
  };

  return (
    <div className="bg-slate-800 text-white min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
