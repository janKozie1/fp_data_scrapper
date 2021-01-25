import { Maybe } from "../Maybe";

export const prop = (name) => (object) => Maybe.of(object[name]);

export const merge = (objA) => (objB) => Object.assign({}, objA, objB);

export const set = (name) => (value) => ({ [name]: value })