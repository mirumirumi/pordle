import seedrandom from "seedrandom"
import validateHand from "@/lib/validate-hand"
import { isSameObjects } from "./utils"
import { Card, Cards, Suit, Num } from "./defines"

export default (seed: string): Cards<Card> => {
  seedrandom(seed, { global: true })

  const generatedCards: Cards<Card> = [{}, {}, {}, {}, {}]
  let isAlreadyExistSameCard = false
  
  do {
    const suits = []
    const nums = []
    isAlreadyExistSameCard = false

    for (let i = 0; i < 5; i++) {
      suits.push(randomInt(3))
      nums.push(randomInt(12))
    }

    for (let i = 0; i < 5; i++) {
      let suit = ""
      if (suits[i] === 0)
        suit = "spade"
      if (suits[i] === 1)
        suit = "heart"
      if (suits[i] === 2)
        suit = "diamond"
      if (suits[i] === 3)
        suit = "club"

      for (const card of generatedCards) {
        if (isSameObjects({ suit: suit, number: nums[i] + 1 }, card as Record<string, unknown>)) {
          isAlreadyExistSameCard = true
          continue
        }
      }
  
      generatedCards[i].suit = suit as Suit
      generatedCards[i].number = nums[i] + 1 as Num
    }
  } while (!validateHand(generatedCards) || isAlreadyExistSameCard)

  return generatedCards
}

function randomInt(max: number): number {
  return Math.floor(Math.random() * max)
}
