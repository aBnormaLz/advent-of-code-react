import { Task } from '../util/Task'
import * as _ from 'lodash'

class Solution extends Task {
  constructor() {
    super(3, 2024)
  }

  part1(input: string[]) {
    return _.chain(input)
      .map(line => this.executeMult(line))
      .sum()
      .value()
  }

  executeMult(line: string) {
    let regex = /mul\(\d+,\d+\)/g
    let matches = line.match(regex)
    return _.chain(matches)
      .map(match => {
        let noMul = match.slice(4)
        let numbers = noMul.substring(0, noMul.length - 1).split(',').map(n => +n)
        return numbers[0] * numbers[1]
      })
      .sum()
      .value()
  }
}

test('Part 1 example', () => {
  const day = new Solution()
  const input = day.getExample()
  expect(day.part1(input)).toBe(161)
})

test('Part 1 task', () => {
  const day = new Solution()
  const input = day.getTask()
  expect(day.part1(input)).toBe(171183089)
})