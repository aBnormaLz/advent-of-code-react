import 'jest-expect-message'

export class AssertUtil {
  static checkSizeEquals<T>(array: Array<T>, size: number) {
    expect(array.length, `expected - ${size}, actual - ${array.length}`).toBe(size)
  }
}