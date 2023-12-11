import { Coord } from '../../util/Coord'

export class Field {
  pos: Coord
  pipe: string
  visited: boolean
  distance: number

  constructor(c: string, x: number, y: number) {
    this.pipe = c
    this.pos = new Coord({ x, y })
    this.visited = false
    this.distance = -1
  }
}