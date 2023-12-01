interface Array<T> {
  head(): T;

  last(): T;

  sum(this: Array<number>): number;
}

Array.prototype.head = function() {
  return this[0]
}

Array.prototype.last = function() {
  return this[this.length - 1]
}

Array.prototype.sum = function(this: Array<number>): number {
  return this.reduce((acc, curr) => acc + curr)
}