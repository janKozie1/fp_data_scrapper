import { Left } from '../Etiher';

export const flow = (...fns) => (value) => fns.reduce(
  (previous, fn) => fn(previous), value
);

export const compose = (...fns) => flow(fns.reverse());

export const left = (value) => new Left(value);

export const map = (fn) => (functor) => functor.map(fn);

export const join = (monad) => monad.join();

export const chain = (fn) => (monad) => monad.chain(fn);

export const either = (left, right) => (either) => either.isLeft() 
  ? left(either.__value) 
  : right(either.__value);

export const id = (value) => value;

export const wrap = (value) => () => value;

export const value = (func) => func.__value;

export const isNothing = (func) => func.isNothing();

export const debug = (fn) => (value) => {
  console.log(fn(value))
  return value
}



