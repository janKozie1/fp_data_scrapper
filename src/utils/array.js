import { Maybe } from "../Maybe";
import { flow } from "./fp";
import { prop } from "./object";
import { not } from "./boolean";

export const first = prop(0);

export const last = (arr) => Maybe.of(arr[arr.length - 1]);

export const find = (fn) => (arr) => Maybe.of(arr.find(fn));

export const filter = (fn) => (arr) => arr.filter(fn);

export const pick = (fn) => (arr) => arr.filter(flow(fn, not));

export const toArray = (arg) => Array.from(arg);

export const reverse = (arr) => arr.reverse();

export const joinArr = (str) => (arr) => arr.join(str);

export const range = (from) => (to) => Array.from({length: to - from}, (_, index) => index + from)
