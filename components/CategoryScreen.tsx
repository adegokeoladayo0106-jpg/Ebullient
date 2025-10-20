import React from 'react';
import { CATEGORIES } from '../constants';
import { 
  HistoryIcon, 
  ScienceIcon, 
  MoviesIcon, 
  MusicIcon, 
  SportsIcon, 
  GeographyIcon,
  ArtIcon,
  TechnologyIcon,
  LiteratureIcon,
  AnimalsIcon 
} from './icons';

interface CategoryScreenProps {
  onSelectCategory: (category: string) => void;
}

// FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const categoryIcons: { [key: string]: React.ReactElement } = {
  history: <HistoryIcon />,
  science: <ScienceIcon />,
  movies: <MoviesIcon />,
  music: <MusicIcon />,
  sports: <SportsIcon />,
  geography: <GeographyIcon />,
  art: <ArtIcon />,
  technology: <TechnologyIcon />,
  literature: <LiteratureIcon />,
  animals: <AnimalsIcon />,
};

const CategoryScreen: React.FC<CategoryScreenProps> = ({ onSelectCategory }) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl mb-8">Choose a Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {CATEGORIES.map(category => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.name)}
            className="bg-slate-700 hover:bg-emerald-500 p-6 rounded-lg flex flex-col items-center justify-center space-y-2 transition-all duration-200 transform hover:scale-105"
          >
            {categoryIcons[category.id]}
            <span className="text-lg font-semibold">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryScreen;