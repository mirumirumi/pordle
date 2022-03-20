import { delay } from "../lib/utils"
import confetti from "canvas-confetti"

export default async (): Promise<void> => {
  await delay(333)
  confetti({
    particleCount: 111,
    spread: 66,
    ticks: 444,
    origin: {
      y: 0.3,
    }
  })
  await delay(55)
  confetti({
    particleCount: 222,
    spread: 77,
    ticks: 444,
    angle: 60,
    origin: {
      x: 0,
      y: 0.3,
    }
  })
  await delay(111)
  confetti({
    particleCount: 222,
    spread: 77,
    ticks: 444,
    angle: 120,
    origin: {
      x: 1,
      y: 0.3,
    }
  })
}
