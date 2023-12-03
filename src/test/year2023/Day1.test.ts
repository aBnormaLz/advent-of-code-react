import { Task } from '../util/Task'
import '../../util/array.extensions'

class Day1 extends Task {
  constructor() {
    super(1, 2023)
  }

  part1(input: string[]) {
    return input
      .map(l => l.match(/\d/g))
      .map(l => +(l.head() + l.last()))
      .sum()
  }

  part2(input: string[]) {
    const replacements = {
      'one': '1',
      '1': '1',
      'two': '2',
      '2': '2',
      'three': '3',
      '3': '3',
      'four': '4',
      '4': '4',
      'five': '5',
      '5': '5',
      'six': '6',
      '6': '6',
      'seven': '7',
      '7': '7',
      'eight': '8',
      '8': '8',
      'nine': '9',
      '9': '9',
    }

    function extractFirstDigit(line: string) {
      return extract(line, (actual, key) => actual.startsWith(key), s => s.tail())
    }

    function extractLastDigit(line: string) {
      return extract(line, (actual, key) => actual.endsWith(key), s => s.init())
    }

    function extract(line: string, prediction: (actual: string, key: string) => boolean, modifier: (s: string) => string) {
      let actual = line
      while (actual.nonEmpty()) {
        for (const [key, value] of Object.entries(replacements)) {
          if (prediction(actual, key)) {
            return value
          }
        }

        actual = modifier(actual)
      }

      throw new Error(`No digit found in '${line}'`)
    }

    return input
      .map(l => +(extractFirstDigit(l) + extractLastDigit(l)))
      .sum()
  }
}

test('Part 1 example', () => {
  const day = new Day1()
  const input = day.getExample(1)
  expect(day.part1(input)).toBe(142)
})

test('Part 1 task', () => {
  const day = new Day1()
  const input = day.getTask()
  expect(day.part1(input)).toBe(54951)
})

test('Part 2 example', () => {
  const day = new Day1()
  const input = day.getExample(2)
  expect(day.part2(input)).toBe(281)
})

test('Part 2 task', () => {
  const day = new Day1()
  const input = day.getTask()
  expect(day.part2(input)).toBe(55218)
})