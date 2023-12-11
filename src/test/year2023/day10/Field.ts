import { Position } from '../../util/Position'

export class Field {
  pos: Position
  pipe: string
  visited: boolean
  distance: number

  constructor(c: string, x: number, y: number) {
    this.pipe = c
    this.pos = new Position({ x, y })
    this.visited = false
    this.distance = -1
  }
}