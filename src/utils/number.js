import { unary } from "./fp";

export const toInt = unary(parseInt);

export const toFloat = unary(parseFloat)
