import { flow } from "./fp";

export const flipBool = (bool) => !bool;

export const not = (fn) => flow(fn, toBool, flipBool);

export const or = (fnA, fnB) => (arg) => toBool(fnA(arg) || fnB(arg));

export const and = (fnA, fnB) => (arg) => toBool(fnA(arg) && fnB(arg));

export const ifElse = (condition) => (fnA, fnB) => (...arg) => condition(...arg) ? fnA(...arg) : fnB(...arg)

export const eq = (a) => (b) => a === b;

export const isLess = (a) => (b) => a < b;

export const toBool = Boolean;
