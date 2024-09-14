import React from 'react';
import { Button } from './ui/button';
import { AnimatedBackground } from './animated-background';
import { useState, useEffect, useRef } from 'react';
import MuteButton from './mute-button'; // We'll create this component next

interface DifficultyOption {
  label: string;
  goal: number;
  color: string;
  description: string;
}

const difficultyOptions: DifficultyOption[] = [
  { label: 'Easy', goal: 1000000, color: 'bg-green-500 hover:bg-green-600', description: 'Perfect for beginners. Reach $1 million to win!' },
  { label: 'Medium', goal: 2000000, color: 'bg-yellow-500 hover:bg-yellow-600', description: 'A balanced challenge. Can you hit $2 million?' },
  { label: 'Hard', goal: 4000000, color: 'bg-red-500 hover:bg-red-600', description: 'For experienced investors. Aim for $4 million!' },
  { label: 'Extreme', goal: 5000000, color: 'bg-purple-500 hover:bg-purple-600', description: 'The ultimate test. Can you reach $5 million?' },
];

interface WelcomeScreenProps {
  onStart: (difficulty: DifficultyOption) => void;
}


const DifficultyButton: React.FC<{ option: DifficultyOption; onClick: () => void }> = ({ option, onClick }) => {
    return (
      <div className="relative group">
        <Button
          onClick={onClick}
          className={`px-6 py-3 ${option.color} text-white rounded-full font-semibold text-lg transition duration-300 w-full`}
        >
          {option.label}
        </Button>
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          {option.description}
        </div>
      </div>
    );
  };

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/music/Stock-Market-Rap.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5; // Set volume to 50%
    audioRef.current.play().catch(error => {
      console.error('Audio playback failed:', error);
      setIsMuted(true); // Ensure muted state if autoplay fails
    });
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch(error => {
          console.error('Audio playback failed:', error);
          // Optionally show a message to the user about enabling audio
        });
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <AnimatedBackground />
      <div className="relative z-10 text-center p-8 bg-white bg-opacity-10 rounded-lg shadow-lg max-w-xl w-full mx-4">
        <h1 className="text-4xl font-bold mb-4 text-white">Welcome to Market Mogul!</h1>
        <p className="text-xl mb-8 text-white">Choose your difficulty:</p>
        <div className="grid grid-cols-4 gap-6">
          {difficultyOptions.map((option) => (
            <DifficultyButton
              key={option.label}
              option={option}
              onClick={() => onStart(option)}
            />
          ))}
        </div>
      </div>
      <MuteButton isMuted={isMuted} onClick={toggleAudio} />
    </div>
  );
};
