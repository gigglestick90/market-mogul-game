'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const diceTypes = {
  blue: { sides: 6, skull: 0, star: 0, normal: 6, color: '#3b82f6' },
  green: { sides: 6, skull: 1, star: 1, normal: 4, color: '#22c55e' },
  red: { sides: 8, skull: 3, star: 2, normal: 3, color: '#ef4444' }
}

const CustomDice = ({ color, value }: { color: string, value: number }) => (
  <div 
    className="w-20 h-20 rounded-lg flex items-center justify-center text-4xl font-bold text-white"
    style={{ backgroundColor: color }}
  >
    {value}
  </div>
)

export default function DiceRoller({ onRoll }: { onRoll: (selectedDice: keyof typeof diceTypes, result: string) => void }) {
  const [selectedDice, setSelectedDice] = useState<keyof typeof diceTypes>('blue');
  const [rollResult, setRollResult] = useState<string | null>(null);
  const [diceValue, setDiceValue] = useState(1);

  const rollDice = () => {
    const dice = diceTypes[selectedDice as keyof typeof diceTypes]
    const value = Math.floor(Math.random() * dice.sides) + 1
    setDiceValue(value)
    let result
    if (value <= dice.skull) {
      result = 'Skull'
    } else if (value <= dice.skull + dice.star) {
      result = 'Star'
    } else {
      result = 'Normal'
    }
    setRollResult(result)
    onRoll(selectedDice, result)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Select onValueChange={(value: keyof typeof diceTypes) => setSelectedDice(value)} defaultValue={selectedDice}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Dice" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="blue">Blue (Low Risk)</SelectItem>
            <SelectItem value="green">Green (Moderate Risk)</SelectItem>
            <SelectItem value="red">Red (High Risk)</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={rollDice} className="w-[180px]">Roll Dice</Button>
      </div>
      <div className="mt-4">
        <CustomDice color={diceTypes[selectedDice as keyof typeof diceTypes].color} value={diceValue} />
      </div>
      {rollResult && (
        <div className="text-2xl font-bold text-white mt-4">
          Result: {rollResult}
        </div>
      )}
    </div>
  )
}