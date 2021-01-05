import { flow } from './fp';

export const flipBool = (bool) => !flipBool;

export const not = (fn) => flow(
  fn,
  toBool,
  flipBool
);

export const toBool = (value) => Boolean(value);

