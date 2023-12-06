import { Task } from '../util/Task'
import { Hand } from './day2/Hand'
import { NumberAndColor } from './day2/NumberAndColor'
import { Game } from './day2/Game'
import * as _ from 'lodash'

class Day1 extends Task {
  constructor() {
    super(2, 2023)
  }

  parseGame(line: string) {
    const split = line.split(': ')

    const id = +_.chain(split).head().split(' ').last().value()
    const draws = _.chain(split).last().split('; ').map(draw => {
      return draw.split(', ').map(numberAndColor => {
        return {
          number: +numberAndColor.split(' ')[0],
          color: numberAndColor.split(' ')[1],
        }
      })
    }).value()

    return {
      id: id,
      draws: draws,
    }
  }

  part1(input: string[]) {
    const maxCubes = {
      red: 12,
      green: 13,
      blue: 14,
    }

    return _.chain(input)
      .map(i => this.parseGame(i))
      .filter(game => {
        return game.draws
          .map(draw => {
            return draw
              .map(hand => {
                return hand.number <= maxCubes[hand.color]
              })
              .reduce((acc, curr) => acc && curr, true)
          })
          .reduce((acc, curr) => acc && curr, true)
      })
      .map(g => g.id)
      .sum()
      .value()
  }

  parseGameTry2(line: string) {
    const split = line.split(': ')

    const id = +_.chain(split).head().split(' ').last().value()
    const draws = _.chain(split).last().split('; ').map(draw => {
      return new Hand(draw.split(', ').map(numberAndColor => {
        return new NumberAndColor(
          +numberAndColor.split(' ')[0],
          numberAndColor.split(' ')[1],
        )
      }))
    }).value()

    return new Game(id, draws)
  }

  part1Try2(input: string[]) {
    const maxCubes = {
      red: 12,
      green: 13,
      blue: 14,
    }

    return _.chain(input)
      .map(i => this.parseGameTry2(i))
      .filter(game => game.isValid(maxCubes))
      .map(g => g.id)
      .sum()
      .value()
  }

  part2(input: string[]) {
    return _.chain(input)
      .map(i => this.parseGameTry2(i))
      .map(g => g.calculatePower())
      .sum()
      .value()
  }
}

test('Part 1 example', () => {
  const day = new Day1()
  const input = day.getExample()
  expect(day.part1(input)).toBe(8)
  expect(day.part1Try2(input)).toBe(8)
})

test('Part 1 task', () => {
  const day = new Day1()
  const input = day.getTask()
  expect(day.part1(input)).toBe(2369)
  expect(day.part1Try2(input)).toBe(2369)
})

test('Part 2 example', () => {
  const day = new Day1()
  const input = day.getExample()
  expect(day.part2(input)).toBe(2286)
})

test('Part 2 task', () => {
  const day = new Day1()
  const input = day.getTask()
  expect(day.part2(input)).toBe(66363)
})