import { Task } from '../util/Task'
import * as _ from 'lodash'
import { Dictionary } from 'lodash'

type CharToLevel = { Q: string; A: string; T: string; J: string; K: string }
type HandAndBid = { bid: number; hand: string }

enum HandType {
  HighCard,
  OnePair,
  TwoPair,
  ThreeOfAKind,
  FUllHouse,
  FourOfAKind,
  FiveOfAKind,
}

namespace HandType {
  export function from(hand: String): HandType {
    if (hand === '5') {
      return HandType.FiveOfAKind
    } else if (hand === '14') {
      return HandType.FourOfAKind
    } else if (hand === '113') {
      return HandType.ThreeOfAKind
    } else if (hand === '23') {
      return HandType.FUllHouse
    } else if (hand === '122') {
      return HandType.TwoPair
    } else if (hand === '1112') {
      return HandType.OnePair
    } else {
      return HandType.HighCard
    }
  }
}

class Day7 extends Task {
  constructor() {
    super(7, 2023)
  }

  private calculateRank(handAndBid: HandAndBid) {
    const handGrouped = _.chain(handAndBid.hand.split(''))
      .groupBy(c => c)
      .map(entry => Object.values(entry).length)
      .sort()
      .join('')
      .value()

    const handType = '' + (HandType.from(handGrouped) + 1)

    const charToLevel = {
      T: '10',
      J: '11',
      Q: '12',
      K: '13',
      A: '14',
    }

    return this.calculatePower(handAndBid, charToLevel, handType)
  }

  part1(input: string[]) {
    return _.chain(input)
      .map(line => {
        const split = line.split(' ')
        return { hand: split[0], bid: +split[1] }
      })
      .map(handAndBid => this.calculateRank(handAndBid))
      .orderBy(rankAndBid => rankAndBid.power)
      .map((handInfo, i) => {
        return (i + 1) * handInfo.bid
      })
      .sum()
      .value()
  }

  calculateRankWithJokers(handAndBid: HandAndBid) {
    const handGrouped = _.chain(handAndBid.hand.split(''))
      .groupBy(c => c)
      .value()

    const jokerCombinedHand = _.chain(this.combineJoker(handGrouped))
      .map(entry => Object.values(entry).length)
      .sort()
      .join('')
      .value()

    const handType = '' + (HandType.from(jokerCombinedHand) + 1)

    const charToLevel = {
      T: '10',
      J: '01',
      Q: '12',
      K: '13',
      A: '14',
    }
    return this.calculatePower(handAndBid, charToLevel, handType)
  }

  calculatePower(handAndBid: HandAndBid, charToLevel: CharToLevel, handType: string) {
    const cardLevels = _.chain(handAndBid.hand.split(''))
      .map(c => +c ? '0' + c : charToLevel[c])
      .value()

    const power = +(
      handType + _.chain(cardLevels)
        .join('')
        .value()
    )

    return {
      ...{
        cardLevels: cardLevels,
        power: power,
        handType: handType,
      },
      ...handAndBid,
    }
  }

  combineJoker(handGrouped: Dictionary<string[]>) {
    if (Object.keys(handGrouped).includes('J')) {
      const handWithoutJokers: Dictionary<string[]> = Object.keys(handGrouped)
        .filter(key => key != 'J')
        .reduce((obj, key) => {
          obj[key] = handGrouped[key]
          return obj
        }, {})

      if (!Object.keys(handWithoutJokers).length) {
        return handGrouped
      }

      const jokers = handGrouped['J']

      const mostCardsGroup = _.chain(handWithoutJokers)
        .orderBy(h => Object.values(h).length)
        .reverse()
        .head()
        .value()

      const newEntry = {}
      newEntry[mostCardsGroup[0]] = [...mostCardsGroup, ...jokers]

      return {
        ...handWithoutJokers,
        ...newEntry,
      }
    } else {
      return handGrouped
    }
  }

  part2(input: string[]) {
    return _.chain(input)
      .map(line => {
        const split = line.split(' ')
        return { hand: split[0], bid: +split[1] }
      })
      .map(handAndBid => this.calculateRankWithJokers(handAndBid))
      .orderBy(rankAndBid => rankAndBid.power)
      .map((handInfo, i) => {
        return (i + 1) * handInfo.bid
      })
      .sum()
      .value()
  }
}

test('Part 1 example', () => {
  const day = new Day7()
  const input = day.getExample()
  expect(day.part1(input)).toBe(6440)
})

test('Part 1 task', () => {
  const day = new Day7()
  const input = day.getTask()
  expect(day.part1(input)).toBe(253313241)
})

test('Part 2 example', () => {
  const day = new Day7()
  const input = day.getExample()
  expect(day.part2(input)).toBe(5905)
})

test('Part 2 task', () => {
  const day = new Day7()
  const input = day.getTask()
  expect(day.part2(input)).toBe(253362743)
})
