import { Task } from '../util/Task'
import * as _ from 'lodash'
import '../util/SlidingAugment'
import { sliding } from '../util/SlidingAugment'

type Mapping = { name: any; rules: { length: number; source: number; dest: number }[] }

class Day5 extends Task {
  constructor() {
    super(5, 2023, '\n\n')
  }

  parseMappings(data: string) {
    const line = data.split('\n')

    const name = _.chain(line).head().value().slice(0, -1).split(' ')[0]
    const rules = _.chain(line).tail().map(line => {
      const split = line.split(' ')

      return {
        dest: +split[0],
        source: +split[1],
        length: +split[2],
      }
    }).value()

    return {
      name: name,
      rules: rules,
    }
  }

  runChainPart1(seedChains: any[], mappings: Mapping[]) {
    const retVal = []
    for (let i = 0; i < seedChains.length; i++) {
      retVal.push(seedChains[i])
    }

    _.chain(mappings).forEach(mapping => {
      _.chain(retVal).forEach(chain => {
        const lastOfChain = _.chain(chain).last().value()
        const ruleToApply: any = _.chain(mapping.rules)
          .find(r => {
            return r.source <= lastOfChain && lastOfChain <= r.source + r.length - 1
          })
          .value()!

        if (ruleToApply) {
          const newValue = lastOfChain - ruleToApply.source + ruleToApply.dest
          chain.push(newValue)
        } else {
          chain.push(lastOfChain)
        }
      }).value()
    }).value()

    return retVal
  }

  runChainPart2(seedRanges: number[][], mappings: Mapping[]) {
    const chain = []
    for (let i = 0; i < seedRanges.length; i++) {
      chain.push([[seedRanges[i]]])
    }

    for (let i = 0; i < chain.length; i++) {
      const ranges = chain[i]
      mappings.forEach(mapping => {
        chain[i].push(
          this.applyMapping(mapping, _.chain(ranges).last().value()),
        )
      })
    }
    return chain
  }

  applyMapping(mapping: Mapping, ranges: number[][]) {
    const newRanges = []
    mapping.rules.forEach(rule => {
      for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i]
        const ruleStart = rule.source
        const ruleEnd = rule.source + rule.length - 1
        const rangeStart = range[0]
        const rangeEnd = range[1]

        if (!(rangeEnd < ruleStart || ruleEnd < rangeStart)) {
          const left = _.max([ruleStart, rangeStart])
          const right = _.min([ruleEnd, rangeEnd])

          const newStart = left - rule.source + rule.dest
          const newEnd = right - rule.source + rule.dest

          ranges = [
            ...[[rangeStart, left - 1], [right + 1, rangeEnd]].filter(r => r[0] <= r[1]),
            ...ranges.filter(r => !(r[0] == rangeStart && r[1] == rangeEnd)),
          ]

          newRanges.push([newStart, newEnd])
          i = -1
        }
      }
    })

    if (newRanges.length > 0) {
      return [...newRanges, ...ranges]
    } else {
      return ranges
    }
  }

  part1(input: string[]) {
    const seedChains = _.chain(input)
      .head().split(': ')
      .tail().split(' ')
      .map(n => [+n])
      .value()

    const mappings = _.chain(input).tail()
      .map(data => this.parseMappings(data))
      .value()

    const afterRun = this.runChainPart1(seedChains, mappings)

    return _.chain(afterRun)
      .map(c => _.chain(c).last().value())
      .min()
      .value()
  }

  part2(input: string[]) {
    const seedNumbers = _.chain(input)
      .head().split(': ')
      .tail().split(' ')
      .map(n => +n)
      .value()

    const seedRanges = sliding(seedNumbers, 2, 2)
      .map(range => [range[0], range[0] + range[1] - 1])

    const mappings = _.chain(input).tail()
      .map(data => this.parseMappings(data))
      .value()

    const afterRun = this.runChainPart2(seedRanges, mappings)

    return _.chain(afterRun.map(c => _.chain(c).last().value())
      .flatMap(ranges => ranges.map((r: number[]) => r[0])))
      .min()
      .value()
  }
}

test('Part 1 example', () => {
  const day = new Day5()
  const input = day.getExample()
  expect(day.part1(input)).toBe(35)
})

test('Part 1 task', () => {
  const day = new Day5()
  const input = day.getTask()
  expect(day.part1(input)).toBe(227653707)
})

test('Part 2 example', () => {
  const day = new Day5()
  const input = day.getExample()
  expect(day.part2(input)).toBe(46)
})

test('Part 2 task', () => {
  const day = new Day5()
  const input = day.getTask()
  expect(day.part2(input)).toBe(78775051)
})
