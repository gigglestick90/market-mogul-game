'use client'

import React from 'react';
import { WelcomeScreen } from '../components/welcome-screen';
import AnimatedBackground from '@/components/animated-background';
import { useRouter } from 'next/navigation';

interface DifficultyOption {
  label: string;
  goal: number;
  color: string;
}

export default function Home() {
  const router = useRouter();

  const handleStart = (difficulty: DifficultyOption) => {
    router.push(`/game?difficulty=${difficulty.label}&goal=${difficulty.goal}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <AnimatedBackground />
      <WelcomeScreen onStart={handleStart} />
    </main>
  );
}