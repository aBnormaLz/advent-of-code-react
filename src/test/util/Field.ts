import { Position } from './Position'

export class Field {
  pos: Position
  visited: boolean
  char: string

  constructor(c: string, x: number, y: number) {
    this.char = c
    this.pos = new Position({ x, y })
    this.visited = false
  }
}