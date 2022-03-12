export interface Card {
  suit?:    "spade" | "heart" | "diamond" | "club",
  number?:  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13,
  status?:  "hit" | "blow",
}

export type Cards<Card> = [Card, Card, Card, Card, Card]

export type TrySet<Cards> = [Cards, Cards, Cards, Cards, Cards, Cards]  // MAX_TRIES = 6
