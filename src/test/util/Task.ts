import { readFileSync } from 'fs'

export class Task {
  day: number
  year: number
  splitInputBy: string

  constructor(day: number, year: number, splitInputBy: string = '\n') {
    this.day = day
    this.year = year
    this.splitInputBy = splitInputBy
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
    return readFileSync(filePath, 'utf-8').split(this.splitInputBy)
  }
}
