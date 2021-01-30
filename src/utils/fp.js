import { Left } from "./functors/Either";
import { isLess } from './boolean'

export const id = (value) => value;

export const flow = (...fns) => (value) =>
  fns.reduce((previous, fn) => fn(previous), value);

export const compose = (...fns) => flow(fns.reverse());

export const left = (value) => new Left(value);

export const map = (fn) => (functor) => functor.map(fn);
export const map_r = (functor) => (fn) => functor.map(fn);

export const ap = (functorA) => (functorB) => functorA.ap(functorB)
export const ap_r = (functorA) => (functorB) => functorB.ap(functorA)

export const join = (monad) => Array.isArray(monad)
  ? monad.flat()
  : monad.join();

export const chain = (fn) => (monad) => Array.isArray(monad) 
  ? monad.flatMap(fn)
  : monad.chain(fn);

export const call = (...args) => (fn) => fn(...args)

export const isLeft = (either) => either.isLeft();

export const either = (right, left = id) => (either) =>
  either.isLeft() ? left(either.__value) : right(either.__value);

export const wrap = (value) => () => value;

export const run = (task) => task.run()

export const value = (func) => func.__value;

export const unary = (fn) => (arg) => fn(arg);

export const bind = (...args) => (fn) => fn.bind(null, ...args)

export const noop = () => null;

export const curry = (fn) => (...args) => isLess(args.length)(fn.length)
  ? curry(bind(...args)(fn))
  : call(...args)(fn)

export const isNothing = (func) => func.isNothing();

// IMPURE

export const debug = (fn) => (value) => {
  console.log(fn(value));
  return value;
};
