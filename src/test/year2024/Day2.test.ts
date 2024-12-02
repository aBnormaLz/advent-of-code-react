import { Task } from '../util/Task'
import * as _ from 'lodash'

class Solution extends Task {
  constructor() {
    super(2, 2024)
  }

  isSafePart1(list: number[]) {
    if (list[0] == list[1]) {
      return 0
    }

    const ascending = list[0] < list[1]

    for (let i = 0; i < list.length - 1; i++) {
      const e1 = list[i]
      const e2 = list[i + 1]

      if (ascending) {
        if (e1 > e2) {
          return 0
        }
      } else {
        if (e1 < e2) {
          return 0
        }
      }

      if (Math.abs(e1 - e2) > 3) {
        return 0
      }

      if (Math.abs(e1 - e2) < 1) {
        return 0
      }
    }

    return 1
  }

  isSafePart2(list: number[]) {
    if (this.isSafePart1(list)) {
      return 1
    }

    for (let i = 0; i < list.length; i++) {
      const subList = [...list.slice(0, i), ...list.slice(i + 1, list.length)]
      if (this.isSafePart1(subList)) {
        return 1
      }
    }

    return 0
  }

  part1(input: string[]) {
    const converted = input
      .map(line => line.split(' ')
        .map(e => +e))

    return _.chain(converted)
      .map(list => this.isSafePart1(list))
      .sum()
      .value()
  }

  part2(input: string[]) {
    const converted = input
      .map(line => line.split(' ')
        .map(e => +e))

    return _.chain(converted)
      .map(list => this.isSafePart2(list))
      .sum()
      .value()
  }
}

test('Part 1 example', () => {
  const day = new Solution()
  const input = day.getExample()
  expect(day.part1(input)).toBe(2)
})

test('Part 1 task', () => {
  const day = new Solution()
  const input = day.getTask()
  expect(day.part1(input)).toBe(218)
})

test('Part 2 example', () => {
  const day = new Solution()
  const input = day.getExample()
  expect(day.part2(input)).toBe(4)
})

test('Part 2 task', () => {
  const day = new Solution()
  const input = day.getTask()
  expect(day.part2(input)).toBe(290)
})
