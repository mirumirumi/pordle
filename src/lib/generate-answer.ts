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

  // sort
  const hand = validateHand(generatedCards) as string
  const result: Cards<Card> = [{}, {}, {}, {}, {}]
  switch (hand) {
    case "2-pair": {
      let index = 0
      const indexes = []
      for (const sorted of sortedCards) {
        for (let i = 0; i < 5; i++) {
          if (sorted.suit === generatedCards[i].suit && sorted.number === generatedCards[i].number) {
            if (generatedCards.filter(e => e.number === sorted.number).length === 2) {
              result[index] = generatedCards[i]
              indexes.push(i)
              index++
            }
          }
        }
      }
      for (let i = 0; i < 5; i++) {
        if (!indexes.includes(i)) {
          result[4] = generatedCards[i]
        }
      }
      break
    }
    case "3-card": {
      let index = 0
      const indexes = []
      for (const sorted of sortedCards) {
        for (let i = 0; i < 5; i++) {
          if (sorted.suit === generatedCards[i].suit && sorted.number === generatedCards[i].number) {
            if (generatedCards.filter(e => e.number === sorted.number).length === 3) {
              result[index] = generatedCards[i]
              indexes.push(i)
              index++
            }
          }
        }
      }
      let index2 = 3
      for (const sorted of sortedCards) {
        for (let i = 0; i < 5; i++) {
          if (!indexes.includes(i) && sorted.suit === generatedCards[i].suit && sorted.number === generatedCards[i].number) {
            result[index2] = generatedCards[i]
            index2++
          }
        }
      }
      break
    }
    case "full-house": {
      let index = 3
      let index2 = 0
      const indexes = []
      for (const sorted of sortedCards) {
        for (let i = 0; i < 5; i++) {
          if (sorted.suit === generatedCards[i].suit && sorted.number === generatedCards[i].number) {
            if (generatedCards.filter(e => e.number === sorted.number).length === 2) {
              result[index] = generatedCards[i]
              indexes.push(i)
              index++
            } else if (generatedCards.filter(e => e.number === sorted.number).length === 3) {
              result[index2] = generatedCards[i]
              indexes.push(i)
              index2++
            }
          }
        }
      }
      break
    }
    case "4-card": {
      let index = 0
      const indexes = []
      for (const sorted of sortedCards) {
        for (let i = 0; i < 5; i++) {
          if (sorted.suit === generatedCards[i].suit && sorted.number === generatedCards[i].number) {
            if (generatedCards.filter(e => e.number === sorted.number).length === 4) {
              result[index] = generatedCards[i]
              indexes.push(i)
              index++
            }
          }
        }
      }
      for (let i = 0; i < 5; i++) {
        if (!indexes.includes(i)) {
          result[4] = generatedCards[i]
        }
      }
      break
    }
    case "straight": {
      let index = 0
      for (const sorted of sortedCards) {
        for (let i = 0; i < 5; i++) {
          if (sorted.suit === generatedCards[i].suit && sorted.number === generatedCards[i].number) {
            result[index] = generatedCards[i]
            index++
          }
        }
      }
      if (result[0].number === 1 && result[1].number === 5 && result[2].number === 4 && result[3].number === 3 && result[4].number === 2) {  // for 5-High-Straight
        const _ = result[0]
        result.splice(0, 1)
        result.push(_)
      }
      break
    }
    case "flush": {
      let index = 0
      for (const sorted of sortedCards) {
        for (let i = 0; i < 5; i++) {
          if (sorted.suit === generatedCards[i].suit && sorted.number === generatedCards[i].number) {
            result[index] = generatedCards[i]
            index++
          }
        }
      }
      break
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
    suit: "heart",
    number: 1,
  },
  {
    suit: "diamond",
    number: 1,
  },
  {
    suit: "club",
    number: 1,
  },
  {
    suit: "spade",
    number: 13,
  },
  {
    suit: "heart",
    number: 13,
  },
  {
    suit: "diamond",
    number: 13,
  },
  {
    suit: "club",
    number: 13,
  },
  {
    suit: "spade",
    number: 12,
  },
  {
    suit: "heart",
    number: 12,
  },
  {
    suit: "diamond",
    number: 12,
  },
  {
    suit: "club",
    number: 12,
  },
  {
    suit: "spade",
    number: 11,
  },
  {
    suit: "heart",
    number: 11,
  },
  {
    suit: "diamond",
    number: 11,
  },
  {
    suit: "club",
    number: 11,
  },
  {
    suit: "spade",
    number: 10,
  },
  {
    suit: "heart",
    number: 10,
  },
  {
    suit: "diamond",
    number: 10,
  },
  {
    suit: "club",
    number: 10,
  },
  {
    suit: "spade",
    number: 9,
  },
  {
    suit: "heart",
    number: 9,
  },
  {
    suit: "diamond",
    number: 9,
  },
  {
    suit: "club",
    number: 9,
  },
  {
    suit: "spade",
    number: 8,
  },
  {
    suit: "heart",
    number: 8,
  },
  {
    suit: "diamond",
    number: 8,
  },
  {
    suit: "club",
    number: 8,
  },
  {
    suit: "spade",
    number: 7,
  },
  {
    suit: "heart",
    number: 7,
  },
  {
    suit: "diamond",
    number: 7,
  },
  {
    suit: "club",
    number: 7,
  },
  {
    suit: "spade",
    number: 6,
  },
  {
    suit: "heart",
    number: 6,
  },
  {
    suit: "diamond",
    number: 6,
  },
  {
    suit: "club",
    number: 6,
  },
  {
    suit: "spade",
    number: 5,
  },
  {
    suit: "heart",
    number: 5,
  },
  {
    suit: "diamond",
    number: 5,
  },
  {
    suit: "club",
    number: 5,
  },
  {
    suit: "spade",
    number: 4,
  },
  {
    suit: "heart",
    number: 4,
  },
  {
    suit: "diamond",
    number: 4,
  },
  {
    suit: "club",
    number: 4,
  },
  {
    suit: "spade",
    number: 3,
  },
  {
    suit: "heart",
    number: 3,
  },
  {
    suit: "diamond",
    number: 3,
  },
  {
    suit: "club",
    number: 3,
  },
  {
    suit: "spade",
    number: 2,
  },
  {
    suit: "heart",
    number: 2,
  },
  {
    suit: "diamond",
    number: 2,
  },
  {
    suit: "club",
    number: 2,
  },
]
