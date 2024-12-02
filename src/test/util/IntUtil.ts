import 'jest-expect-message'

export class NumberOrder {
  static ascending: (a: number, b: number) => number = (a, b) => a - b
}
