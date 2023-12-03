import { Hand } from './Hand'

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
}