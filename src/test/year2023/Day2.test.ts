import { Task } from '../util/Task'
import '../../util/array.extensions'

class Day1 extends Task {
  constructor() {
    super(2, 2023)
  }

  parseGame(line: string) {
    const split = line.split(': ')

    const id = +split.head().split(' ')[1]
    const draws = split.last().split('; ').map(draw => {
      return draw.split(', ').map(numberAndColor => {
        return {
          number: +numberAndColor.split(' ')[0],
          color: numberAndColor.split(' ')[1],
        }
      })
    })

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

    return input
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
  }

  part2(input: string[]) {
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

// test('Part 2 example', () => {
//   const day = new Day1()
//   const input = day.getExample()
//   expect(day.part2(input)).toBe(2286)
// })
//
// test('Part 2 task', () => {
//   const day = new Day1()
//   const input = day.getTask()
//   expect(day.part2(input)).toBe(66363)
// })