import { NumberAndColor } from './NumberAndColor'

export class Hand {
  hands: NumberAndColor[]

  constructor(hands: NumberAndColor[]) {
    this.hands = hands
  }

  isValid(maxCubes: { red: number; green: number; blue: number }) {
    return this.hands
      .map(hand => {
        return hand.number <= maxCubes[hand.color]
      })
      .reduce((acc, curr) => acc && curr, true)
  }

  calculateMinNumberOfCubes() {
    return new NumberAndColor(4, "red")
  }
}