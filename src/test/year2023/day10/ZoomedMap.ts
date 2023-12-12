import { Map } from '../../util/Map'
import { Field } from '../../util/Field'
import { Position } from '../../util/Position'
import * as _ from 'lodash'

export class ZoomedMap extends Map<Field> {
  constructor(map: string[][]) {
    const fields = map.map((l, x) => {
      return l.map((c, y) => new Field(c, x, y))
    })
    super(fields)
  }

  eliminateOuterFields() {
    let fieldsToVisit = [this.fields[0][0]]

    while (fieldsToVisit.length > 0) {
      const field = fieldsToVisit[0]
      field.visited = true
      field.char = ' '
      // console.log(this.fields.map(row => {
      //   return row.map(f => {
      //     return f.char
      //   }).join('')
      // }).join('\n'))
      const neighbours = this.getUnvisitedNeighbours(field)
      fieldsToVisit.shift()
      fieldsToVisit = [...fieldsToVisit, ...neighbours.filter(n => !fieldsToVisit.includes(n))]
    }
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
    return this.checkChar(this.up(pos), ['X', '.'])
  }


  downNeighbour(pos: Position) {
    return this.checkChar(this.down(pos), ['X', '.'])
  }

  leftNeighbour(pos: Position) {
    return this.checkChar(this.left(pos), ['X', '.'])
  }

  rightNeighbour(pos: Position) {
    return this.checkChar(this.right(pos), ['X', '.'])
  }

  countX() {
    return _.chain(this.fields).flatMap(row => {
      return _.chain(row).filter(f => f.char === 'X').value().length
    }).sum().value()
  }
}