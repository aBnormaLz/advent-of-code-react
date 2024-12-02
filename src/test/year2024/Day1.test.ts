import { Task } from '../util/Task'
import * as _ from 'lodash'
import { AssertUtil } from '../util/AssertUtil'
import { NumberOrder } from '../util/IntUtil'

class Solution extends Task {
  constructor() {
    super(1, 2024)
  }

  parseLists(input: string[]) {
    const pairs = _.chain(input)
      .map(line => line.split('   '))
      .map(rawPairs => [+rawPairs[0], +rawPairs[1]])
      .value()

    const lists: number[][] = _.zip.apply(_, pairs)

    const leftList = lists[0]
    const rightList = lists[1]

    AssertUtil.checkEquals(leftList.length, rightList.length)
    return { leftList, rightList }
  }

  part1(input: string[]) {
    const { leftList, rightList } = this.parseLists(input)

    const leftListOrdered = leftList.sort(NumberOrder.ascending)
    const rightListOrdered = rightList.sort(NumberOrder.ascending)

    return _.chain(leftListOrdered)
      .map((left, i) => {
        const right = rightListOrdered[i]
        return Math.abs(left - right)
      })
      .sum()
      .value()
  }

  part2(input: string[]) {
    const { leftList, rightList } = this.parseLists(input)

    const occMap = _.chain(rightList)
      .groupBy(e => e)
      .value()

    return _.chain(leftList)
      .map(elem => {
        if (occMap['' + elem]) {
          return elem * occMap['' + elem].length
        } else {
          return 0
        }
      })
      .sum()
      .value()
  }
}

test('Part 1 example', () => {
  const day = new Solution()
  const input = day.getExample()
  expect(day.part1(input)).toBe(11)
})

test('Part 1 task', () => {
  const day = new Solution()
  const input = day.getTask()
  expect(day.part1(input)).toBe(3714264)
})

test('Part 2 example', () => {
  const day = new Solution()
  const input = day.getExample()
  expect(day.part2(input)).toBe(31)
})

test('Part 2 task', () => {
  const day = new Solution()
  const input = day.getTask()
  expect(day.part2(input)).toBe(18805872)
})
