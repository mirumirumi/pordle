import { Card, Cards, Status } from "./defines"
import { isSameObjects } from "./utils"

export default (cards_A: Cards<Card>, cards_B: Cards<Card>): Array<Status> => {
  const result: Array<Status> = Array(5).fill("failure")

  for (let i = 0; i < 5; i++) {
    if (cards_A[i].suit === cards_B[i].suit && cards_A[i].number === cards_B[i].number) {
      result[i] = "hit"
      continue      
    }
    
    for (const card of cards_B) {
      if (isSameObjects(cards_A[i] as Record<string, unknown>, card as Record<string, unknown>)) {
        result[i] = "blow"
        continue
      }
    }
  }

  return result
}
