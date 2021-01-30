import { flow } from '../fp';

export class IO { 
  constructor(fn) {
    this.unsafeIo = fn;
  }

  static of(value) {
    return new IO(() => value);
  }

  map(fn) {
    return new IO(flow(this.unsafeIo, fn));
  }

  chain(fn){
    return this.map(fn).join();
  }

  ap(functor) {
    return this.chain(fn => functor.map(fn));
  }

  join() {
    return new IO(() => this.unsafeIo().unsafeIo());
  }
}