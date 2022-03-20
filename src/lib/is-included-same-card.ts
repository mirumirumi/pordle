import { Card, Cards, Num, Suit } from "./defines"

export default (cards: Cards<Card>, suit: Suit, num: Num): boolean => {
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].suit === suit && cards[i].number === num) {
      return true
    }
  }
  return false
}
