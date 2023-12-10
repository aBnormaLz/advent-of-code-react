import { Task } from '../util/Task'
import * as _ from 'lodash'

class Day8 extends Task {
  constructor() {
    super(8, 2023, '\n\n')
  }

  parse(input: string[]) {
    const map = {}
    _.chain(input[1].split('\n'))
      .forEach(line => {
        const eqSplit = line.split(' = ')
        map[eqSplit[0]] = {
          L: eqSplit[1].slice(1, 4),
          R: eqSplit[1].slice(6, 9),
        }
      })
      .value()
    return { directions: input[0], map: map }
  }

  part1(input: string[]) {
    const { directions, map } = this.parse(input)
    let i = 0
    let currentNode = 'AAA'
    const endNode = 'ZZZ'

    while (currentNode != endNode) {
      const LR = directions[i % directions.length]
      currentNode = map[currentNode][LR]
      i++
    }

    return i
  }

  getPath(currentNode: string, map: {}, directions: string) {
    const path = []
    path.push(currentNode)
    let i = 0
    while (!currentNode.endsWith('Z')) {
      const LR = directions[i % directions.length]
      currentNode = map[currentNode][LR]
      path.push(currentNode)
      i++
    }

    return path
  }

  lcm(arr: number[]) {
    const gcd = (x: number, y: number) => (!y ? x : gcd(y, x % y))
    const _lcm = (x: number, y: number) => (x * y) / gcd(x, y)
    return arr.reduce((a, b) => _lcm(a, b))
  }

  part2(input: string[]) {
    const { directions, map } = this.parse(input)
    const currentNodes = Object.keys(map).filter(n => n.endsWith('A'))
    const paths = currentNodes.map(node => this.getPath(node, map, directions))

    return this.lcm(paths.map(p => p.length - 1))
  }
}

test('Part 1 example', () => {
  const day = new Day8()
  const input1 = day.getExample(1)
  expect(day.part1(input1)).toBe(2)
  const input2 = day.getExample(2)
  expect(day.part1(input2)).toBe(6)
})

test('Part 1 task', () => {
  const day = new Day8()
  const input = day.getTask()
  expect(day.part1(input)).toBe(16043)
})

test('Part 2 example', () => {
  const day = new Day8()
  const input = day.getExample(3)
  expect(day.part2(input)).toBe(6)
})

test('Part 2 task', () => {
  const day = new Day8()
  const input = day.getTask()
  expect(day.part2(input)).toBe(15726453850399)
})
