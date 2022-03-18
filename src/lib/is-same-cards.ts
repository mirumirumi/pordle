import { Card, Cards } from "./defines"

export default (cards_A: Cards<Card>, cards_B: Cards<Card>): boolean => {
  for (let i = 0; i < 5; i++) {
    if ( ! (cards_A[i].suit === cards_B[i].suit && cards_A[i].number === cards_B[i].number))
      return false
  }

  return true
}
