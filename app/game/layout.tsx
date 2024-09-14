import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Game Board | Market Mogul',
}

export default function GameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}