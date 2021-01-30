import { Maybe } from "./functors/Maybe";

import { flow, map, value } from "./fp";
import { prop } from "./object";
import { not, eq } from "./boolean";
import { toSet } from "./set";

export const first = prop(0);

export const last = (arr) => Maybe.of(arr[arr.length - 1]);

export const find = (fn) => (arr) => Maybe.of(arr.find(fn));

export const filter = (fn) => (arr) => arr.filter(fn);

export const pick = (fn) => (arr) => arr.filter(flow(fn, not));

export const toArray = (arg) => Array.from(arg);

export const reverse = (arr) => arr.reverse();

export const joinArr = (str) => (arr) => arr.join(str);

export const concat = (arrA) => (arrB) => [...arrA, ...arrB];

export const range = (from) => (to) => Array.from({length: to - from + 1}, (_, index) => index + from)

export const isEmpty = flow(prop('length'), map(eq(0)), value);

export const take = (amount) => (arr) => arr.slice(0, amount)

export const leave = (amount) => (arr) => arr.slice(amount)

export const unique = flow(toSet, toArray)

export const chunk = (amount) => (arr) => amount === 0 
  ? [arr]
  : not(isEmpty)(arr) 
    ? [take(amount)(arr), ...chunk(amount)(leave(amount)(arr))]
    : arr

 //map_r(Identity.of(chunk(amount)(leave(amount)(arr)))),
