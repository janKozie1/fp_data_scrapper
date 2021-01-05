
export class Right {
  constructor(value) {
    this.__value = value;
  }

  isLeft() {
    return false;
  }

  isRight() {
    return true;
  }

  of(value) {
    return new Right(value);
  }

  map(fn) {
    return Right.of(fn(this.__value));
  }

  ap(functor) {
    return functor.map(this.__value);
  }

  join() {
    return this.__value;
  }

  chain(fn) {
    return this.map(fn).join();
  }
}

export class Left {
  constructor(value) {
    this.__value = value;
  }

  isLeft() {
    return true;
  }

  isRight() {
    return false;
  }

  map(fn) {
    return this;
  }

  chain(fn) {
    return this;
  }

  join() {
    return this;
  }

  ap() {
    return this;
  }
}
