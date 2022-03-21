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

  // sorting
  const result: Cards<Card> = [{}, {}, {}, {}, {}]
  let index = 0
  for (const sorted of sortedCards) {
    for (let i = 0; i < 5; i++) {
      if (isSameObjects(sorted as Record<string, unknown>, generatedCards[i] as Record<string, unknown>)) {
        result[index] = generatedCards[i]
        index++
      }
    }
  }

  return result
}

function randomInt(max: number): number {
  return Math.floor(Math.random() * max)
}

const sortedCards: Array<Card> = [
  {
    suit: "spade",
    number: 1,
  },
  {
    suit: "spade",
    number: 13,
  },
  {
    suit: "spade",
    number: 12,
  },
  {
    suit: "spade",
    number: 11,
  },
  {
    suit: "spade",
    number: 10,
  },
  {
    suit: "spade",
    number: 9,
  },
  {
    suit: "spade",
    number: 8,
  },
  {
    suit: "spade",
    number: 7,
  },
  {
    suit: "spade",
    number: 6,
  },
  {
    suit: "spade",
    number: 5,
  },
  {
    suit: "spade",
    number: 4,
  },
  {
    suit: "spade",
    number: 3,
  },
  {
    suit: "spade",
    number: 2,
  },
  {
    suit: "heart",
    number: 1,
  },
  {
    suit: "heart",
    number: 13,
  },
  {
    suit: "heart",
    number: 12,
  },
  {
    suit: "heart",
    number: 11,
  },
  {
    suit: "heart",
    number: 10,
  },
  {
    suit: "heart",
    number: 9,
  },
  {
    suit: "heart",
    number: 8,
  },
  {
    suit: "heart",
    number: 7,
  },
  {
    suit: "heart",
    number: 6,
  },
  {
    suit: "heart",
    number: 5,
  },
  {
    suit: "heart",
    number: 4,
  },
  {
    suit: "heart",
    number: 3,
  },
  {
    suit: "heart",
    number: 2,
  },
  {
    suit: "diamond",
    number: 1,
  },
  {
    suit: "diamond",
    number: 13,
  },
  {
    suit: "diamond",
    number: 12,
  },
  {
    suit: "diamond",
    number: 11,
  },
  {
    suit: "diamond",
    number: 10,
  },
  {
    suit: "diamond",
    number: 9,
  },
  {
    suit: "diamond",
    number: 8,
  },
  {
    suit: "diamond",
    number: 7,
  },
  {
    suit: "diamond",
    number: 6,
  },
  {
    suit: "diamond",
    number: 5,
  },
  {
    suit: "diamond",
    number: 4,
  },
  {
    suit: "diamond",
    number: 3,
  },
  {
    suit: "diamond",
    number: 2,
  },
  {
    suit: "club",
    number: 1,
  },
  {
    suit: "club",
    number: 13,
  },
  {
    suit: "club",
    number: 12,
  },
  {
    suit: "club",
    number: 11,
  },
  {
    suit: "club",
    number: 10,
  },
  {
    suit: "club",
    number: 9,
  },
  {
    suit: "club",
    number: 8,
  },
  {
    suit: "club",
    number: 7,
  },
  {
    suit: "club",
    number: 6,
  },
  {
    suit: "club",
    number: 5,
  },
  {
    suit: "club",
    number: 4,
  },
  {
    suit: "club",
    number: 3,
  },
  {
    suit: "club",
    number: 2,
  },
]
