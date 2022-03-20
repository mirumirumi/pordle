import { Card, Cards } from "./defines"

export default (cards: Cards<Card>): boolean => {
  // 2 Pair
  const numHistory2Pair: Array<number> = []
  let firstNumber = 0
  for (const card of cards) {
    numHistory2Pair.push(card.number as number)
    if (2 <= numHistory2Pair.filter(e => (e === card.number) && (firstNumber !== 0) && (firstNumber !== card.number)).length) {
      return true
    }
    if (2 <= numHistory2Pair.filter(e => e === card.number).length) {
      firstNumber = card.number as number
    }
  }

  
  //3 Card, Full House, 4 Card
  const numHistory3Card: Array<number> = []
  for (const card of cards) {
    numHistory3Card.push(card.number as number)
    if (3 <= numHistory3Card.filter(e => e === card.number).length) 
      return true
  }
  
  
  // Straight
  const nums: Array<number> = []
  cards.forEach(card => nums.push(card.number ?? 0))
  nums.sort(sortAsc)

  if (JSON.stringify(nums) === JSON.stringify([1, 10, 11, 12, 13]))  // case: Broadway (A K Q J 10)
    return true

  let countup = 0
  for (let i = 0; i < nums.length; i++) {
    if (i === 0)
      continue
    if (nums[i] === nums[i - 1] + 1)
      countup++
  }
  if (countup === 4)
    return true


  // Flush
  if (cards.every(e => e.suit === cards[0].suit))
    return true


  // Straight Flush, Royal Straight Flush
  ;  // nothing to do


  // BUTA (+ 1 Pair)
  return false
}

function sortAsc(a: number, b: number): number {
  return a - b
}
