import { Task } from '../util/Task'
import * as _ from 'lodash'
import { sliding } from '../util/SlidingAugment'

class Day9 extends Task {
  constructor() {
    super(9, 2023)
  }

  extrapolateEnd(line: string) {
    let numbers = _.chain(line.split(' ')).map(n => +n).value()
    const lastNumbers = []
    lastNumbers.unshift(numbers.slice(-1)[0])
    while (!numbers.every(n => n === 0)) {
      numbers = sliding(numbers, 2).map(pair => pair[1] - pair[0])
      lastNumbers.unshift(numbers.slice(-1)[0])
    }
    const lastCol = [0]
    for (let i = 1; i < lastNumbers.length; i++) {
      lastCol.push(lastNumbers[i] + lastCol[i - 1])
    }
    return lastCol.slice(-1)[0]
  }

  extrapolateBeginning(line: string) {
    let numbers = _.chain(line.split(' ')).map(n => +n).value()
    const firstNumbers = []
    firstNumbers.unshift(numbers.slice(0)[0])
    while (!numbers.every(n => n === 0)) {
      numbers = sliding(numbers, 2).reverse().map(pair => pair[1] - pair[0]).reverse()
      firstNumbers.unshift(numbers.slice(0)[0])
    }
    const firstCol = [0]
    for (let i = 1; i < firstNumbers.length; i++) {
      firstCol.push(firstNumbers[i] - firstCol[i - 1])
    }
    return firstCol.slice(-1)[0]
  }

  part1(input: string[]) {
    return _.chain(input)
      .map(line => this.extrapolateEnd(line))
      .sum()
      .value()
  }

  part2(input: string[]) {
    return _.chain(input)
      .map(line => this.extrapolateBeginning(line))
      .sum()
      .value()
  }
}

test('Part 1 example', () => {
  const day = new Day9()
  const input1 = day.getExample()
  expect(day.part1(input1)).toBe(114)
})

test('Part 1 task', () => {
  const day = new Day9()
  const input = day.getTask()
  expect(day.part1(input)).toBe(1980437560)
})

test('Part 2 example', () => {
  const day = new Day9()
  const input = day.getExample()
  expect(day.part2(input)).toBe(2)
})

test('Part 2 task', () => {
  const day = new Day9()
  const input = day.getTask()
  expect(day.part2(input)).toBe(977)
})
