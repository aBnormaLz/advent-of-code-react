import 'jest-expect-message'

export class AssertUtil {
  static checkEquals(a: number, b: number) {
    expect(a, `Numbers didn't match: a - ${a}, b - ${b}`).toBe(b)
  }

  static checkSizeEquals<T>(array: Array<T>, size: number) {
    expect(array.length, `expected - ${size}, actual - ${array.length}`).toBe(size)
  }
}
