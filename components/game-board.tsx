'use client'

import React from 'react';
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import DiceRoller from './dice-roller'
import { DifficultyOption } from '@/types/game-types'  // Adjust the import path as needed
import MuteButton from './mute-button';
import { Button } from "@/components/ui/button"

const tileColors = {
  yellow: 'bg-yellow-400',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  red: 'bg-red-500'
}

const tiles = [
  { color: 'yellow', event: 'Start Your Career' },
  { color: 'green', event: 'First Investment' },
  { color: 'blue', event: 'Market Crash' },
  { color: 'yellow', event: 'Promotion' },
  { color: 'red', event: 'Economic Boom' },
  { color: 'yellow', event: 'Family Expansion' },
  { color: 'green', event: 'New Technology Trend' },
  { color: 'blue', event: 'Global Recession' },
  { color: 'yellow', event: 'Career Change' },
  { color: 'red', event: 'Bull Market (Retirement!)' },
]

const GameTile = ({ color, index, playerPosition }: { color: string, index: number, playerPosition: number }) => {  return (
    <motion.div
      className={`w-16 h-16 ${tileColors[color as keyof typeof tileColors]} rounded-lg shadow-lg flex items-center justify-center relative`}
      whileHover={{ scale: 1.1, rotate: 5 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="secondary" className="absolute -top-2 -right-2">
              {20 + index * 5}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Age: {20 + index * 5}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {playerPosition === index && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-purple-600 rounded-full border-2 border-white animate-pulse"></div>
        </div>
      )}
    </motion.div>
  )
}

interface GameBoardProps {
  difficulty: DifficultyOption | null;
}

export function GameBoard({ difficulty }: GameBoardProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [playerPosition, setPlayerPosition] = useState(0)
  const [currentEvent, setCurrentEvent] = useState(tiles[0].event)
  const [investmentValue, setInvestmentValue] = useState(0)
  const [playerAge, setPlayerAge] = useState(20)
  const [gameEnded, setGameEnded] = useState(false)
  const [goal, setGoal] = useState(0)

  useEffect(() => {
    if (difficulty) {
      setGoal(difficulty.goal)
    }
  }, [difficulty])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (playerPosition > 0 && (playerAge >= 65 || investmentValue >= goal) && !gameEnded) {
      setGameEnded(true);
      if (investmentValue >= goal) {
        alert(`Congratulations! You've reached your goal of $${goal.toLocaleString()} with $${investmentValue.toLocaleString()} in your investment account!`);
      } else {
        alert(`You've reached retirement age with $${investmentValue.toLocaleString()} in your investment account. Your goal was $${goal.toLocaleString()}.`);
      }
    }
  }, [playerAge, investmentValue, gameEnded, goal, playerPosition]);

  const handleDiceRoll = (diceType: string, rollResult: string) => {
    const newPosition = Math.min(playerPosition + 1, tiles.length - 1)
    const newAge = Math.min(20 + newPosition * 5, 65)
    const baseContribution = 75000
    let growthRate = 0
    switch (rollResult) {
      case 'Skull':
        growthRate = -0.2
        break
      case 'Star':
        growthRate = 0.5
        break
      default:
        growthRate = 0.07 * 5
    }
    const newInvestmentValue = Math.round((investmentValue + baseContribution) * (1 + growthRate))

    setPlayerPosition(newPosition)
    setCurrentEvent(tiles[newPosition].event)
    setPlayerAge(newAge)
    setInvestmentValue(newInvestmentValue)
  }

  const handleRestart = () => {
    setPlayerPosition(0);
    setCurrentEvent(tiles[0].event);
    setInvestmentValue(0);
    setPlayerAge(20);
    setGameEnded(false);
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-purple-500 to-pink-500">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">Market Mogul</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <Alert className="w-full md:w-auto">
          <AlertTitle>Current Event</AlertTitle>
          <AlertDescription>{currentEvent}</AlertDescription>
        </Alert>
        <Badge variant="outline" className="text-xl p-2">
          Investment Value: ${investmentValue.toLocaleString()}
        </Badge>
        <Badge variant="outline" className="text-xl p-2">
          Age: {playerAge}
        </Badge>
        <Badge variant="outline" className="text-xl p-2">
          Difficulty: {difficulty?.label}
        </Badge>
        <Badge variant="outline" className="text-xl p-2">
          Goal: ${goal.toLocaleString()}
        </Badge>
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-4 max-w-4xl mx-auto mb-8">
        {isLoaded && tiles.map((tile, index) => (
          <GameTile 
            key={index} 
            color={tile.color} 
            index={index}
            playerPosition={playerPosition}
          />
        ))}
      </div>
      <div className="mt-8">
        {!gameEnded && <DiceRoller onRoll={handleDiceRoll} />}
      </div>
      <MuteButton />
      {gameEnded && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 flex justify-center"
        >
          <Button
            onClick={handleRestart}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold text-lg transition duration-300 transform hover:scale-105"
          >
            Restart Game
          </Button>
        </motion.div>
      )}
    </Card>
  )
}