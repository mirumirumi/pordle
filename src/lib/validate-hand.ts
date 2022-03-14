import { Card, Cards } from "./defines"

export default (cards: Cards<Card>): boolean => {
  // 1 Pair, 2 Pair, 3 Card, Full House, 4 Card
  const numHistoryHasPair: Array<number> = []
  let countHasPair = 0
  let countMax = 0
  cards.forEach(card => {
    countHasPair = 0
    numHistoryHasPair.push(card.number as number)
    for (const num of numHistoryHasPair) {
      if (card.number === num)
        countHasPair++ 
      if (countMax < countHasPair)
        countMax = countHasPair
    }
  })
  if (2 <= countMax)
    return true

  
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


  // BUTA
  return false
}

function sortAsc(a: number, b: number): number {
  return a - b
}
