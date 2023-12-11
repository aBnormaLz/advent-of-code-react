export class Position {
  x: number
  y: number

  constructor(pos: { x: number; y: number }) {
    this.x = pos.x
    this.y = pos.y
  }
}