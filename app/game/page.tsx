'use client'

import { useSearchParams } from 'next/navigation';
import { GameBoard } from '@/components/game-board';

export default function GamePage() {
  const searchParams = useSearchParams();
  const difficulty = {
    label: searchParams.get('difficulty') || '',
    goal: parseInt(searchParams.get('goal') || '0', 10),
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <GameBoard difficulty={difficulty} />
    </main>
  );
}