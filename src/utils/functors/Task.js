import { id , flow } from '../fp';


export class Task {
  constructor(fn) {
    this.task = fn;
  }

  // static rejected(x) {
  //   return new Promise((reject, _) => reject(x));
  // }

  static of(x) {
    return new Task((resolve, reject) => resolve(x));
  }

  run() {
    return new Promise(this.task)
  }

  map(fn) {
    return new Task((resolve, reject) => new Promise(this.task)
      .then(flow(fn, resolve), reject)
    );
  }

  chain(fn) {
    return new Task((resolve, reject) => this.run()
      .then((x) => fn(x).run().then(resolve, reject))     
    )
  }

  // map(fn) {
  //   return new Task((reject, resolve) =>(reject, compose(resolve, fn)));
  // }

  // ap(f) {
  //   return this.chain(fn => f.map(fn));
  // }

  // chain(fn) {
  //   return new Task((reject, resolve) => this.fork(reject, x => fn(x).fork(reject, resolve)));
  // }

  // join() {
  //   return this.chain(id);
  // }
}