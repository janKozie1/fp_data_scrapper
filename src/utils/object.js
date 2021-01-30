import { Maybe } from "./functors/Maybe";

import { curry } from "./fp";

export const prop = (name) => (object) => Maybe.of(object[name]);

export const merge = curry((objA, objB) => Object.assign({}, objA, objB));

export const set = (name) => (value) => ({ [name]: value })

export const has = (name) => (obj) => name in obj