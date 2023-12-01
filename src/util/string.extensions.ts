interface String {
  isEmpty(): boolean;

  nonEmpty(): boolean;

  tail(): string;

  init(): string;
}

String.prototype.isEmpty = function(): boolean {
  return this.length === 0
}

String.prototype.nonEmpty = function(): boolean {
  return this.length > 0
}

String.prototype.tail = function(): string {
  return this.substring(1)
}

String.prototype.init = function(): string {
  return this.slice(0, -1)
}