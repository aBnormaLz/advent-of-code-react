import { Task } from '../util/Task'
import { Map } from './day10/Map'

class Day10 extends Task {
  constructor() {
    super(10, 2023)
  }

  part1(input: string[]) {
    const map = new Map(input)
    let fieldsToVisit = [map.start]

    while (fieldsToVisit.length > 0) {
      const field = fieldsToVisit[0]
      field.visited = true
      const neighbours = map.getUnvisitedNeighbours(field)
      neighbours.forEach(n => n.distance = field.distance + 1)

      fieldsToVisit.shift()
      fieldsToVisit = [...fieldsToVisit, ...neighbours.filter(n => !fieldsToVisit.includes(n))]
    }
    return map.maxDistance()
  }

  part2(input: string[]) {
  }
}

test('Part 1 example', () => {
  const day = new Day10()
  const input1 = day.getExample(1)
  expect(day.part1(input1)).toBe(4)
  const input2 = day.getExample(2)
  expect(day.part1(input2)).toBe(8)
})

test('Part 1 task', () => {
  const day = new Day10()
  const input = day.getTask()
  expect(day.part1(input)).toBe(6773)
})

// test('Part 2 example', () => {
//   const day = new Day10()
//   const input = day.getExample()
//   expect(day.part2(input)).toBe(2)
// })
//
// test('Part 2 task', () => {
//   const day = new Day10()
//   const input = day.getTask()
//   expect(day.part2(input)).toBe(977)
// })
