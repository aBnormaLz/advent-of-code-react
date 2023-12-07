import { Task } from '../util/Task'
import * as _ from 'lodash'

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

  part1(input: string[]) {

    const seedChains = _.chain(input)
      .head().split(': ')
      .tail().split(' ')
      .map(n => [{
        value: +n,
        name: 'Seed',
      }])
      .value()

    const mappings = _.chain(input).tail()
      .map(data => this.parseMappings(data))
      .value()

    _.chain(mappings).forEach(mapping => {
      _.chain(seedChains).forEach(chain => {
        const lastOfChain = _.chain(chain).last().value()
        const ruleToApply: any = _.chain(mapping.rules)
          .find(r => {
            return r.source <= lastOfChain.value && lastOfChain.value <= r.source + r.length - 1
          })
          .value()!

        if (ruleToApply) {
          const newValue = lastOfChain.value - ruleToApply.source + ruleToApply.dest
          chain.push({
            name: mapping.name,
            value: newValue,
          })
        } else {
          chain.push({
            name: mapping.name,
            value: lastOfChain.value,
          })
        }
      }).value()
    }).value()

    return _.chain(seedChains)
      .map(c => _.chain(c).last().value().value)
      .min()
      .value()
  }

  // part2(input: string[]) {
  // }
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

// test('Part 2 example', () => {
//   const day = new Day5()
//   const input = day.getExample()
//   expect(day.part2(input)).toBe(30)
// })
//
// test('Part 2 task', () => {
//   const day = new Day5()
//   const input = day.getTask()
//   expect(day.part2(input)).toBe(9425061)
// })