import { Task } from '../util/Task'
import { PipeMap } from './day10/PipeMap'

class Day10 extends Task {
  constructor() {
    super(10, 2023)
  }

  part1(input: string[]) {
    const map = new PipeMap(input)
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
    const pipeMap = new PipeMap(input)
    pipeMap.print()
    pipeMap.eliminateNonLoopPipes()
    pipeMap.replaceStart()
    pipeMap.print()
    const zoomed = pipeMap.zoom()
    zoomed.print()
    zoomed.eliminateOuterFields()
    zoomed.print()
    return zoomed.countX()
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

test('Part 2 example', () => {
  const day = new Day10()
  const input3 = day.getExample(3)
  expect(day.part2(input3)).toBe(4)
  const input4 = day.getExample(4)
  expect(day.part2(input4)).toBe(8)
  const input5 = day.getExample(5)
  expect(day.part2(input5)).toBe(10)
})

test('Part 2 task', () => {
  const day = new Day10()
  const input = day.getTask()
  expect(day.part2(input)).toBe(493)
})
