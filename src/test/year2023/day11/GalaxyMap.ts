import { Map } from '../../util/Map'
import { GalaxyField } from './GalaxyField'
import * as _ from 'lodash'

export class GalaxyMap extends Map<GalaxyField> {
  galaxies: GalaxyField[]

  constructor(map: string[]) {
    const galaxies = []
    const fields = map.map((row, x) => {
      return row.split('').map((c, y) => {
        const field = new GalaxyField(c, x, y)
        if (field.isGalaxy) {
          galaxies.push(field)
        }
        return field
      })
    })
    super(fields)
    this.galaxies = galaxies
  }

  expand() {
    this.fields.map(row => {
      if (row.every(field => field.char == '.')) {
        row.forEach(field => field.char = 'x')
      }
    })

    for (let i = 0; i < this.fields.length; i++) {
      const col = this.fields.map(row => row[i])
      if (col.every(field => ['.', 'x'].includes(field.char))) {
        col.forEach(field => field.char = 'x')
      }
    }
  }

  calculateDistanceSum(expansionRate: number) {
    const distances = []
    for (let i = 0; i < this.galaxies.length; i++) {
      for (let j = i + 1; j < this.galaxies.length; j++) {
        const galaxyI = this.galaxies[i]
        const galaxyJ = this.galaxies[j]

        let x = galaxyI.pos.x
        let y = galaxyI.pos.y

        const path = []

        while (Math.abs(x - galaxyJ.pos.x) != 0) {
          path.push(this.fields[x][y])
          x = x + Math.sign(galaxyJ.pos.x - x)
        }

        while (Math.abs(y - galaxyJ.pos.y) != 0) {
          path.push(this.fields[x][y])
          y = y + Math.sign(galaxyJ.pos.y - y)
        }

        distances.push(_.chain(path).map(field => {
          if (field.char == 'x') {
            return expansionRate
          } else {
            return 1
          }
        }).sum().value())
      }
    }
    return _.chain(distances).sum().value()
  }
}
