import { readFileSync } from 'fs'
import '../../util/string.extensions'

export class Task {
  day: number
  year: number

  constructor(day: number, year: number) {
    this.day = day
    this.year = year
  }

  getExample(specifier?: number) {
    if (specifier) {
      return this.get('example' + specifier)
    } else {
      return this.get('example')
    }
  }

  getTask() {
    return this.get('task')
  }

  private get(specifier: string) {
    const filePath = `src/test/year${this.year}/resources/day${this.day}_${specifier}.txt`
    return readFileSync(filePath, 'utf-8').split('\n')
  }
}
