import { flow } from '../fp';


export class Task {
  constructor(fn) {
    this.task = fn;
  }

  static of(x) {
    return new Task((resolve) => resolve(x));
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
}