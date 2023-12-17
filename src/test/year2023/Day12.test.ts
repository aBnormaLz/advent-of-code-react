import { Task } from '../util/Task'
import * as _ from 'lodash'

class Record {
  pattern: number[]
  segments: Segment[]

  constructor(line: String) {
    const split = line.split(' ')
    const segments = _.chain(split[0].split(''))
      .map(char => new Segment(char))
      .value()

    this.pattern = split[1].split(',').map(n => +n)
    this.segments = segments
  }

  calculateMatchingPossibilities() {
    const unfixedFieldLength = this.segments.filter(s => !s.isFixed).length
    let matchingPossibilities = 0
    for (let i = 0; i < Math.pow(2, unfixedFieldLength); i++) {
      const indexes = i.toString(2).padStart(unfixedFieldLength, '0')
        .split('').reverse().join('')
      const filledIndexes = this.getFullIndexesFor(indexes)
      const possibility = this.getPossibilityFor(filledIndexes)
      if (this.isMatch(possibility)) {
        matchingPossibilities++
      }
    }
    return matchingPossibilities
  }

  private getFullIndexesFor(indexes: string) {
    const fullIndexes = []
    let dynamicIndex = 0
    for (let i = 0; i < this.segments.length; i++) {
      const segment = this.segments[i]
      if (segment.isFixed) {
        fullIndexes.push('0')
      } else {
        fullIndexes.push(indexes[dynamicIndex])
        dynamicIndex++
      }
    }
    return fullIndexes.join('')
  }

  private getPossibilityFor(indexesString: string) {
    const indexes = indexesString.split('').map(i => +i)
    return this.segments.map((s, i) => s.possibilityFor(indexes[i]))
  }

  private isMatch(possibility: string[]) {
    const springLengths = []
    for (let i = 0; i < possibility.length;) {
      const startOfPattern = possibility[i]
      if (startOfPattern == '.') {
        while (possibility[i] == '.' && i < possibility.length) {
          i++
        }
      } else {
        let springLength = 0
        while (possibility[i] != '.' && i < possibility.length) {
          i++
          springLength++
        }
        springLengths.push(springLength)
      }
    }

    if (this.pattern.length != springLengths.length) {
      return false
    }

    for (let i = 0; i < this.pattern.length; i++) {
      if (this.pattern[i] != springLengths[i]) {
        return false
      }
    }

    return true
  }
}

class Segment {
  char: string
  possibilities: string[]
  isFixed: boolean

  constructor(char: string) {
    if (char == '.' || char == '#') {
      this.possibilities = [char]
      this.isFixed = true
    } else {
      this.possibilities = ['.', '#']
      this.isFixed = false
    }
    this.char = char
  }

  possibilityFor(index: number) {
    return this.possibilities[index]
  }
}

class Day12 extends Task {
  constructor() {
    super(12, 2023)
  }

  part1(input: string[]) {
    return _.chain(input)
      .map(line => new Record(line))
      .map(r => r.calculateMatchingPossibilities())
      .sum()
      .value()
  }

  part2(input: string[]) {
  }
}

test('Part 1 example', () => {
  const day = new Day12()
  const input1 = day.getExample()
  expect(day.part1(input1)).toBe(21)
})

test('Part 1 task', () => {
  const day = new Day12()
  const input = day.getTask()
  expect(day.part1(input)).toBe(7307)
})

// test('Part 2 example', () => {
//   const day = new Day12()
//   const input = day.getExample()
//   expect(day.part2(input)).toBe(2)
// })
//
// test('Part 2 task', () => {
//   const day = new Day12()
//   const input = day.getTask()
//   expect(day.part2(input)).toBe(977)
// })
