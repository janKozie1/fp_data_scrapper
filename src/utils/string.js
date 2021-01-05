import { Maybe } from '../Maybe';
import { first } from './array';

export const head = first;

export const stringifty = (value) => JSON.stringify(value);

export const split = (splitter) => (str) => str.split(splitter);

export const match = (regex) => (str) => Maybe.of(str.match(regex));

export const contains = (regex) => (str) => match(regex)(str).map(() => str);