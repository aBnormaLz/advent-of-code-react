import { Hand } from './Hand'
import * as _ from 'lodash'

export class Game {
  id: number
  draws: Hand[]

  constructor(id: number, draws: Hand[]) {
    this.id = id
    this.draws = draws
  }

  isValid(maxCubes: { red: number; green: number; blue: number }) {
    return this.draws
      .map(draw => draw.isValid(maxCubes))
      .reduce((acc, curr) => acc && curr, true)
  }

  calculatePower() {
    const combined = {
      'red': 0,
      'green': 0,
      'blue': 0,
    }

    for (const draw of this.draws) {
      draw.hands.forEach(hand => {
        combined[hand.color] = _.max([hand.number, combined[hand.color]])
      })
    }

    return Object.values(combined).reduce((acc, curr) => acc * curr)
  }
}

