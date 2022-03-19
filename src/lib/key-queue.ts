import { Card, Suit, Num } from "./defines"

export default (keyQueue: Array<string>): Card => {
  let suit = ""
  if (keyQueue.includes("s"))
    suit = "spade"
  if (keyQueue.includes("h"))
    suit = "heart"
  if (keyQueue.includes("d"))
    suit = "diamond"
  if (keyQueue.includes("c"))
    suit = "club"
  
  let num = 0
  if (keyQueue.includes("1"))
    num = 1
  if (keyQueue.includes("2"))
    num = 2
  if (keyQueue.includes("3"))
    num = 3
  if (keyQueue.includes("4"))
    num = 4
  if (keyQueue.includes("5"))
    num = 5
  if (keyQueue.includes("6"))
    num = 6
  if (keyQueue.includes("7"))
    num = 7
  if (keyQueue.includes("8"))
    num = 8
  if (keyQueue.includes("9"))
    num = 9
  if (keyQueue.includes("0"))
    num = 10
  if (keyQueue.includes("j"))
    num = 11
  if (keyQueue.includes("q"))
    num = 12
  if (keyQueue.includes("k"))
    num = 13

  return {
    suit: suit as Suit,
    number: num as Num,
  }
}
