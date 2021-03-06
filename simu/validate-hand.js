module.exports = (cards) => {
  let will2Pair = false
  let will3Card = false

  // 2 Pair
  const numHistory2Pair = []
  let firstNumber = 0
  for (const card of cards) {
    numHistory2Pair.push(card.number)
    if (2 === numHistory2Pair.filter(e => (e === card.number) && (firstNumber !== 0) && (firstNumber !== card.number)).length) {
      will2Pair = true
    }
    if (2 === numHistory2Pair.filter(e => e === card.number).length) {
      firstNumber = card.number
    }
  }


  //4 Card
  const numHistory4card = []
  for (const card of cards) {
    numHistory4card.push(card.number)
    if (4 === numHistory4card.filter(e => e === card.number).length)
      return "4-card"
  }

  
  //3 Card
  const numHistory3Card = []
  for (const card of cards) {
    numHistory3Card.push(card.number)
    if (3 === numHistory3Card.filter(e => e === card.number).length)
      will3Card = true
  }
  

  //Full House
  if (will2Pair && will3Card) {
    return "full-house"
  } else if (will2Pair) {
    return "2-pair"
  } else if (will3Card) {
    return "3-card"
  }

  
  // Straight
  const nums = []
  cards.forEach(card => nums.push(card.number ?? 0))
  nums.sort(sortAsc)

  if (JSON.stringify(nums) === JSON.stringify([1, 10, 11, 12, 13])) {  // case: Broadway (A K Q J 10)
    return "straight"
  }

  let countup = 0
  for (let i = 0; i < nums.length; i++) {
    if (i === 0)
      continue
    if (nums[i] === nums[i - 1] + 1)
      countup++
  }
  if (countup === 4)
    return "straight"


  // Flush
  if (cards.every(e => e.suit === cards[0].suit))
    return "flush"


  // Straight Flush, Royal Straight Flush
  ;  // nothing to do


  // BUTA (+ 1 Pair)
  return null
}

function sortAsc(a, b) {
  return a - b
}
