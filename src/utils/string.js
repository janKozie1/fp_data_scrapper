import { Maybe } from "../Maybe";
import { Right } from "../Either";

import { flow, left } from "./fp";
import { first, joinArr } from "./array";

export const head = first;

export const regex = (flags) => (str) => new RegExp(str, joinArr("")(flags));

export const toRegex = regex([]);

export const stringifty = (value) => JSON.stringify(value);

export const split = (splitter) => (str) => str.split(splitter);

export const match = (regex) => (str) => Maybe.of(str.match(regex));

export const append = (suffix) => (str) => str + suffix;

export const prepend = (prefix) => (str) => prefix + str;

export const matches = (regex) => (str) =>
  regex.test(str) ? Right.of(str) : left(str);

export const startsWith = (str) => matches(flow(prepend("^"), toRegex)(str));
