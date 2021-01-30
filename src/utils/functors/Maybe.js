export class Maybe {
  constructor(value) {
    this.__value = value;
  }

  isNothing() {
    return this.__value === undefined || this.__value === null;
  }

  static of(value) {
    return new Maybe(value);
  }

  map(fn) {
    return this.isNothing() ? this : new Maybe(fn(this.__value));
  }

  ap(functor) {
    return this.isNothing() ? this : functor.map(this.__value);
  }

  chain(fn) {
    return this.map(fn).join();
  }

  join() {
    return this.isNothing() ? this : this.__value;
  }
}
