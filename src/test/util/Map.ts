import { Position } from './Position'
import { Field } from './Field'

export class Map<F extends Field> {
  fields: F [][]

  constructor(fields: F[][]) {
    this.fields = fields
  }

  print(fieldMapper: (f: F) => string = f => f.char) {
    console.log(this.fields.map(row => {
      return row.map(f => fieldMapper(f)).join('')
    }).join('\n'))
  }

  up(pos: Position) {
    return this.getField(pos.up())
  }


  down(pos: Position) {
    return this.getField(pos.down())
  }

  left(pos: Position) {
    return this.getField(pos.left())
  }

  right(pos: Position) {
    return this.getField(pos.right())
  }

  getField(pos: Position) {
    if (this.fields[pos.x])
      return this.fields[pos.x][pos.y]
  }

  checkChar(field: F, allowedChars: string[]) {
    if (field && allowedChars.includes(field.char)) {
      return field
    } else {
      return undefined
    }
  }
}