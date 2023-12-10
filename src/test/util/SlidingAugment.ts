export function sliding(array: Array<any>, size: number, step: number = 1): Array<Array<any>> {
  const retVal = []
  for (let i = 0; i < array.length; i += step) {
    const slice = array.slice(i, i + size)
    if (slice.length >= size) {
      retVal.push(slice)
    }
  }
  return retVal
}