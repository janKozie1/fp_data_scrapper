import { Left } from "../Either";

export const id = (value) => value;

export const flow = (...fns) => (value) =>
  fns.reduce((previous, fn) => fn(previous), value);

export const compose = (...fns) => flow(fns.reverse());

export const left = (value) => new Left(value);

export const map = (fn) => (functor) => functor.map(fn);

export const join = (monad) => monad.join();

export const chain = (fn) => (monad) => monad.chain(fn);

export const isLeft = (either) => either.isLeft();

export const either = (right, left = id) => (either) =>
  either.isLeft() ? left(either.__value) : right(either.__value);

export const wrap = (value) => () => value;

export const value = (func) => func.__value;

export const isNothing = (func) => func.isNothing();

export const debug = (fn) => (value) => {
  console.log(fn(value));
  return value;
};

export const __stop = () => {
  throw new Error();
};
