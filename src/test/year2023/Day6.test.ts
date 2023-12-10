import { Task } from '../util/Task'
import * as _ from 'lodash'
import '../util/SlidingAugment'

class Day6 extends Task {
  constructor() {
    super(6, 2023)
  }

  calculateWinningCases(raceTime: number, minDistance: number) {
    return _.chain(_.range(0, raceTime))
      .map(buttonPushTime => this.calculateDistance(raceTime, buttonPushTime))
      .filter(d => d > minDistance)
      .value()
  }

  private calculateDistance(raceTime: number, buttonPushTime: number) {
    const remainingTime = raceTime - buttonPushTime
    return remainingTime * buttonPushTime
  }

  part1(input: string[]) {
    const raceTimes = _.chain(input[0].split(' ').filter(m => m.length > 0)).tail().value()
    const distances = _.chain(input[1].split(' ').filter(m => m.length > 0)).tail().value()

    return _.chain(raceTimes)
      .map((raceTime, i) => {
        const distance = distances[i]
        return {
          raceTime: +raceTime,
          distance: +distance,
        }
      })
      .map(timeAndDistance => this.calculateWinningCases(timeAndDistance.raceTime, timeAndDistance.distance))
      .map(c => c.length)
      .value().reduce((acc, curr) => acc * curr)
  }

  parseRaceTimeAndMinDistance(input: string[]) {
    const raceTime = +_.chain(input[0].split(' ')
      .filter(m => m.length > 0))
      .tail().reduce((acc, curr) => acc + curr)
      .value()
    const minDistance = +_.chain(input[1].split(' ')
      .filter(m => m.length > 0))
      .tail().reduce((acc, curr) => acc + curr)
      .value()
    return { raceTime, minDistance }
  }

  part2(input: string[]) {
    const { raceTime, minDistance } = this.parseRaceTimeAndMinDistance(input)

    const firstWinningCase = _.chain(_.range(0, raceTime))
      .find(buttonPushTime => this.calculateDistance(raceTime, buttonPushTime) > minDistance)
      .value()

    return raceTime - firstWinningCase * 2 + 1
  }

  part2Try2(input: string[]) {
    const { raceTime, minDistance } = this.parseRaceTimeAndMinDistance(input)

    const a = 1
    const b = -raceTime
    const c = minDistance

    const D = b * b - 4 * a * c

    if (D > 0) {
      const root1 = Math.floor((-b + Math.sqrt(D)) / (2 * a))
      const root2 = Math.ceil((-b - Math.sqrt(D)) / (2 * a))

      return _.max([root1, root2]) - _.min([root1, root2]) + 1
    } else {
      throw new Error(`D < 0 - ${D}`)
    }
  }
}

test('Part 1 example', () => {
  const day = new Day6()
  const input = day.getExample()
  expect(day.part1(input)).toBe(288)
})

test('Part 1 task', () => {
  const day = new Day6()
  const input = day.getTask()
  expect(day.part1(input)).toBe(345015)
})

test('Part 2 example', () => {
  const day = new Day6()
  const input = day.getExample()
  expect(day.part2(input)).toBe(71503)
  expect(day.part2Try2(input)).toBe(71503)
})

test('Part 2 task', () => {
  const day = new Day6()
  const input = day.getTask()
  // expect(day.part2(input)).toBe(42588603)
  expect(day.part2Try2(input)).toBe(42588603)
})
