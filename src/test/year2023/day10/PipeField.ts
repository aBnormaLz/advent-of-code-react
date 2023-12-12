import { Field } from '../../util/Field'

export class PipeField extends Field {
  distance: number

  constructor(c: string, x: number, y: number) {
    super(c, x, y)
    this.distance = -1
  }
}