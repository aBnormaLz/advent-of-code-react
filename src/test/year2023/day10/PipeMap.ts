import { AssertUtil } from '../../util/AssertUtil'
import { Map } from '../../util/Map'
import * as _ from 'lodash'
import { ZoomedMap } from './ZoomedMap'
import { PipeField } from './PipeField'
import { Field } from '../../util/Field'

export class PipeMap extends Map<PipeField> {
  start: PipeField

  constructor(lines: string[]) {
    const fields = lines.map((l, x) => {
      return l.split('').map((c, y) => new PipeField(c, x, y))
    })
    super(fields)

    const startFiltered: PipeField[] = this.fields.flatMap(row => {
      return row.map(f => {
        if (f.char === 'S') {
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

  getUnvisitedNeighbours(field: PipeField) {
    return [
      this.upNeighbour(field),
      this.downNeighbour(field),
      this.leftNeighbour(field),
      this.rightNeighbour(field),
    ].filter(f => f && !f.visited)
  }

  upNeighbour(field: Field) {
    if (['7', 'F', '-'].includes(field.char)) {
      return undefined
    }
    return this.checkChar(this.up(field.pos), ['|', '7', 'F'])
  }


  downNeighbour(field: Field) {
    if (['J', 'L', '-'].includes(field.char)) {
      return undefined
    }
    return this.checkChar(this.down(field.pos), ['|', 'L', 'J'])
  }

  leftNeighbour(field: Field) {
    if (['F', 'L', '|'].includes(field.char)) {
      return undefined
    }
    return this.checkChar(this.left(field.pos), ['-', 'L', 'F'])
  }

  rightNeighbour(field: Field) {
    if (['J', '7', '|'].includes(field.char)) {
      return undefined
    }
    return this.checkChar(this.right(field.pos), ['-', 'J', '7'])
  }

  maxDistance() {
    return _.chain(this.fields).flatMap(row => {
      return _.chain(row).map(f => {
        return f.distance
      }).max().value()
    }).max().value()
  }

  eliminateNonLoopPipes() {
    let fieldsToVisit = [this.start]
    const mainLoopCoords = []

    while (fieldsToVisit.length > 0) {
      const field = fieldsToVisit[0]
      field.visited = true
      mainLoopCoords.push({ x: field.pos.x, y: field.pos.y })
      // console.log(this.fields.map(row => {
      //   return row.map(f => {
      //     if (_.chain(mainLoopCoords).find(mlc => mlc.x == f.pos.x && mlc.y == f.pos.y).value()) {
      //       return f.char
      //     } else {
      //       return '.'
      //     }
      //   }).join('')
      // }).join('\n'))
      const neighbours = this.getUnvisitedNeighbours(field)
      fieldsToVisit.shift()
      fieldsToVisit = [...neighbours.filter(n => !fieldsToVisit.includes(n)), ...fieldsToVisit]
    }

    this.fields.forEach(row => {
      row.forEach(f => {
        if (!_.chain(mainLoopCoords).find(mlc => mlc.x == f.pos.x && mlc.y == f.pos.y).value()) {
          f.char = '.'
        }
      })
    })
  }

  replaceStart() {
    const up = this.upNeighbour(this.start)
    const down = this.downNeighbour(this.start)
    const left = this.leftNeighbour(this.start)
    const right = this.rightNeighbour(this.start)
    const upJoin = up && ['|', '7', 'F'].includes(up.char)
    const downJoin = down && ['|', 'J', 'L'].includes(down.char)
    const leftJoin = left && ['-', 'F', 'L'].includes(left.char)
    const rightJoin = right && ['-', 'J', '7'].includes(right.char)
    if (upJoin) {
      if (downJoin) {
        this.start.char = '|'
      } else {
        if (leftJoin) {
          this.start.char = 'J'
        } else {
          expect(rightJoin).toBe(true)
          this.start.char = 'L'
        }
      }
    } else {
      if (downJoin) {
        if (leftJoin) {
          this.start.char = '7'
        } else {
          expect(rightJoin).toBe(true)
          this.start.char = 'F'
        }
      } else {
        expect(rightJoin).toBe(true)
        expect(leftJoin).toBe(true)
        this.start.char = '-'
      }
    }
  }

  zoom() {
    const zoomed: string[][] = []
    this.fields.forEach((row, x) => {
      zoomed.push([])
      zoomed.push([])
      row.forEach(field => {
        if (field.char == 'F') {
          zoomed[2 * x].push('.')
          zoomed[2 * x].push('.')
          zoomed[2 * x + 1].push('.')
          zoomed[2 * x + 1].push('#')
        } else if (field.char == '7' || field.char == '-') {
          zoomed[2 * x].push('.')
          zoomed[2 * x].push('.')
          zoomed[2 * x + 1].push('#')
          zoomed[2 * x + 1].push('#')
        } else if (field.char == 'L' || field.char == '|') {
          zoomed[2 * x].push('.')
          zoomed[2 * x].push('#')
          zoomed[2 * x + 1].push('.')
          zoomed[2 * x + 1].push('#')
        } else if (field.char == 'J') {
          zoomed[2 * x].push('.')
          zoomed[2 * x].push('#')
          zoomed[2 * x + 1].push('#')
          zoomed[2 * x + 1].push('#')
        } else if (field.char == '.') {
          zoomed[2 * x].push('.')
          zoomed[2 * x].push('.')
          zoomed[2 * x + 1].push('.')
          zoomed[2 * x + 1].push('X')
        }
      })
      zoomed[2 * x].push('.')
      zoomed[2 * x + 1].push('.')
    })
    zoomed.push(Array(zoomed[0].length).fill('.'))

    return new ZoomedMap(zoomed)
  }
}