export class Position {
  x: number
  y: number

  constructor(pos: { x: number; y: number }) {
    this.x = pos.x
    this.y = pos.y
  }

  up() {
    return new Position({ x: this.x - 1, y: this.y })
  }


  down() {
    return new Position({ x: this.x + 1, y: this.y })
  }

  left() {
    return new Position({ x: this.x, y: this.y - 1 })
  }

  right() {
    return new Position({ x: this.x, y: this.y + 1 })
  }
}