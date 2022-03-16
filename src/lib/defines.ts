export type Suit = "spade" | "heart" | "diamond" | "club"

export type Num = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13

export type Status = "hit" | "blow" | "failure" | "used" | undefined

export interface Card {
  suit?:    Suit,
  number?:  Num,
  status?:  Status,
}

export type Cards<Card> = [Card, Card, Card, Card, Card]

export type TrySet<Cards> = [Cards, Cards, Cards, Cards, Cards, Cards]  // MAX_TRIES = 6
