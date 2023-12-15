import { Task } from '../util/Task'
import { GalaxyMap } from './day11/GalaxyMap'

class Day2 extends Task {
  constructor() {
    super(11, 2023)
  }

  solution(input: string[], expansionRate: number) {
    const map = new GalaxyMap(input)
    map.print()
    map.expand()
    map.print()
    return map.calculateDistanceSum(expansionRate)
  }
}

test('Part 1 example', () => {
  const day = new Day2()
  const input = day.getExample()
  expect(day.solution(input, 2)).toBe(374)
})

test('Part 1 task', () => {
  const day = new Day2()
  const input = day.getTask()
  expect(day.solution(input, 2)).toBe(9693756)
})

test('Part 2 example', () => {
  const day = new Day2()
  const input = day.getExample()
  expect(day.solution(input, 10)).toBe(1030)
  expect(day.solution(input, 100)).toBe(8410)
})

test('Part 2 task', () => {
  const day = new Day2()
  const input = day.getTask()
  expect(day.solution(input, 1000000)).toBe(717878258016)
})