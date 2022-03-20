import { Card, Cards, Status } from "./defines"

export default (cards_A: Cards<Card>, cards_B: Cards<Card>): Array<Status> => {
  const result: Array<Status> = Array(5).fill("failure")

  for (let i = 0; i < 5; i++) {
    if (cards_A[i].suit === cards_B[i].suit && cards_A[i].number === cards_B[i].number) {
      result[i] = "hit"
      continue      
    }
    
    for (const card of cards_B) {
      if (cards_A[i].suit === card.suit && cards_A[i].number === card.number) {
        result[i] = "blow"
        continue
      }
    }
  }

  return result
}
