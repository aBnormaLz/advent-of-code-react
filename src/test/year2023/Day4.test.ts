import { Task } from '../util/Task'
import * as _ from 'lodash'

class Day4 extends Task {
  constructor() {
    super(4, 2023)
  }

  winningNumbersLength(split: string[]) {
    const myNumbers = _.chain(split[0].split(': '))
      .tail()
      .split(' ')
      .filter(n => !!n)
      .value()
    const winningNumbers = split[1].split(' ').filter(n => !!n)

    return _.intersection(myNumbers, winningNumbers).length
  }

  part1(input: string[]) {
    return _.chain(input)
      .map(line => {
        const length = this.winningNumbersLength(line.split(' | '))
        const exponent = length - 1

        if (exponent >= 0) {
          return Math.pow(2, exponent)
        } else {
          return 0
        }
      })
      .sum()
      .value()
  }

  part2(input: string[]) {
    const copies = Array(input.length).fill(1)

    input
      .forEach((line, i) => {
        const length = this.winningNumbersLength(line.split(' | '))
        for (let l = 0; l < length; l++) {
          copies[i + l + 1] += copies[i]
        }
      })

    return _.chain(copies).sum().value()
  }
}

test('Part 1 example', () => {
  const day = new Day4()
  const input = day.getExample()
  expect(day.part1(input)).toBe(13)
})

test('Part 1 task', () => {
  const day = new Day4()
  const input = day.getTask()
  expect(day.part1(input)).toBe(28538)
})

test('Part 2 example', () => {
  const day = new Day4()
  const input = day.getExample()
  expect(day.part2(input)).toBe(30)
})

test('Part 2 task', () => {
  const day = new Day4()
  const input = day.getTask()
  expect(day.part2(input)).toBe(9425061)
})