import React from 'react';
import { Button } from './ui/button';
import { AnimatedBackground } from './animated-background';

interface DifficultyOption {
  label: string;
  goal: number;
  color: string;
}

const difficultyOptions: DifficultyOption[] = [
  { label: 'Easy', goal: 1000000, color: 'bg-green-500 hover:bg-green-600' },
  { label: 'Medium', goal: 2000000, color: 'bg-yellow-500 hover:bg-yellow-600' },
  { label: 'Hard', goal: 4000000, color: 'bg-red-500 hover:bg-red-600' },
  { label: 'Extreme', goal: 5000000, color: 'bg-purple-500 hover:bg-purple-600' },
];

interface WelcomeScreenProps {
  onStart: (difficulty: DifficultyOption) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <AnimatedBackground />
      <div className="relative z-10 text-center p-8 bg-white bg-opacity-10 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h1 className="text-4xl font-bold mb-4 text-white">Welcome to Market Mogul!</h1>
        <p className="text-xl mb-8 text-white">Choose your difficulty:</p>
        <div className="grid grid-cols-2 gap-4">
          {difficultyOptions.map((option) => (
            <Button
              key={option.label}
              onClick={() => onStart(option)}
              className={`px-6 py-3 ${option.color} text-white rounded-full font-semibold text-lg transition duration-300`}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};