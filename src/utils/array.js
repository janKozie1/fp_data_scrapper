import { Maybe } from "../Maybe";
import { Right } from "../Either";

import { flow, left, either, map_r, map, value, debug, id, ap_r, call, isNothing, ap } from "./fp";
import { prop } from "./object";
import { not, eq } from "./boolean";
import { Identity } from "../Identity";

export const first = prop(0);

export const last = (arr) => Maybe.of(arr[arr.length - 1]);

export const find = (fn) => (arr) => Maybe.of(arr.find(fn));

export const filter = (fn) => (arr) => arr.filter(fn);

export const pick = (fn) => (arr) => arr.filter(flow(fn, not));

export const toArray = (arg) => Array.from(arg);

export const reverse = (arr) => arr.reverse();

export const joinArr = (str) => (arr) => arr.join(str);

export const concat = (arrA) => (arrB) => [...arrA, ...arrB];

export const range = (from) => (to) => Array.from({length: to - from}, (_, index) => index + from)

export const isEmpty = flow(prop('length'), map(eq(0)), value);

export const take = (amount) => (arr) => arr.slice(0, amount)

export const leave = (amount) => (arr) => arr.slice(amount)

export const chunk = (amount) => (arr) => flow(
  not(isEmpty),
  (notEmpty) => notEmpty 
    ? [take(amount)(arr), ...chunk(amount)(leave(amount)(arr))]
    : arr
)(arr)

 //map_r(Identity.of(chunk(amount)(leave(amount)(arr)))),
