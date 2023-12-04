interface Array<T> {
  head(): T;

  tail(): Array<T>;

  last(): T;

  sum(this: Array<number>): number;

  product(this: Array<number>): number;
}

Array.prototype.head = function() {
  return this[0]
}

Array.prototype.tail = function() {
  return this.slice(1, this.length - 1)
}

Array.prototype.last = function() {
  return this[this.length - 1]
}

Array.prototype.sum = function(this: Array<number>): number {
  return this.reduce((acc, curr) => acc + curr)
}

Array.prototype.product = function(this: Array<number>): number {
  return this.reduce((acc, curr) => acc * curr)
}