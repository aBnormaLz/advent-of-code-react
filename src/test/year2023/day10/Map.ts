import { Position } from '../../util/Position'
import { AssertUtil } from '../../util/AssertUtil'
import { Field } from './Field'
import * as _ from 'lodash'

export class Map {
  inner: Field [][]
  start: Field

  constructor(lines: string[]) {
    this.inner = lines.map((l, x) => {
      return l.split('').map((c, y) => new Field(c, x, y))
    })
    const startFiltered: Field[] = this.inner.flatMap(row => {
      return row.map(f => {
        if (f.pipe === 'S') {
          return f
        } else {
          return undefined
        }
      }).filter(f => f)
    }).filter(f => f)

    AssertUtil.checkSizeEquals(startFiltered, 1)

    this.start = startFiltered[0]
    this.start.distance = 0
  }

  getUnvisitedNeighbours(field: Field) {
    return [
      this.upNeighbour(field.pos),
      this.downNeighbour(field.pos),
      this.leftNeighbour(field.pos),
      this.rightNeighbour(field.pos),
    ].filter(f => f && !f.visited)
  }

  upNeighbour(pos: Position) {
    return this.neighbour(pos, new Position({ x: -1, y: 0 }), ['|', '7', 'F'])
  }


  downNeighbour(pos: Position) {
    return this.neighbour(pos, new Position({ x: 1, y: 0 }), ['|', 'L', 'J'])
  }

  leftNeighbour(pos: Position) {
    return this.neighbour(pos, new Position({ x: 0, y: -1 }), ['-', 'L', 'F'])
  }

  rightNeighbour(pos: Position) {
    return this.neighbour(pos, new Position({ x: 0, y: 1 }), ['-', 'J', '7'])
  }

  neighbour(pos: Position, move: Position, allowedChars: string[]) {
    const x = pos.x + move.x
    const y = pos.y + move.y

    if (!this.inner[x] || !this.inner[x][y]) {
      return undefined
    }

    const neighbour = this.inner[x][y]
    if (neighbour && allowedChars.includes(neighbour.pipe)) {
      return neighbour
    } else {
      return undefined
    }
  }

  maxDistance() {
    return _.chain(this.inner).flatMap(row => {
      return _.chain(row).map(f => {
        return f.distance
      }).max().value()
    }).max().value()
  }
}