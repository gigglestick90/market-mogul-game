'use client'

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { GameBoard } from '@/components/game-board';

function GameContent() {
  const searchParams = useSearchParams();
  const difficulty = {
    label: searchParams.get('difficulty') || '',
    goal: parseInt(searchParams.get('goal') || '0', 10),
  };

  return <GameBoard difficulty={difficulty} />;
}

export default function GamePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <Suspense fallback={<div>Loading...</div>}>
        <GameContent />
      </Suspense>
    </main>
  );
}