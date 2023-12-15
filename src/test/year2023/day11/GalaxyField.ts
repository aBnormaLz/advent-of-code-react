import { Field } from '../../util/Field'

export class GalaxyField extends Field {
  isGalaxy: boolean

  constructor(c: string, x: number, y: number) {
    super(c, x, y)
    this.isGalaxy = c == '#'
  }
}
