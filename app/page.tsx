'use client'

import React, { useState } from 'react';
import { WelcomeScreen } from '../components/welcome-screen';
import { GameBoard } from '../components/game-board';
import AnimatedBackground from '@/components/animated-background';
import { useRouter } from 'next/navigation';

interface DifficultyOption {
  label: string;
  goal: number;
  color: string;
}

interface GameState {
  isPlaying: boolean;
  difficulty: DifficultyOption | null;
}

export default function Home() {
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    difficulty: null,
  });

  const router = useRouter();

  const handleStart = (difficulty: DifficultyOption) => {
    router.push(`/game?difficulty=${difficulty.label}&goal=${difficulty.goal}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <AnimatedBackground />
      <WelcomeScreen onStart={handleStart} />
      {gameState.isPlaying && <GameBoard difficulty={gameState.difficulty} />}
    </main>
  );
}