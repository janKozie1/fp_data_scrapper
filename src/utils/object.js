import { Maybe } from '../Maybe';

export const prop = (name) => object => Maybe.of(object[name]);