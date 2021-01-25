import { Maybe } from "../../Maybe";

import { flow } from "../fp";
import { first } from "../array";

export const querySelectorAll = (selector) => (doc) =>
  doc.querySelectorAll(selector);

export const querySelector = (selector) =>
  flow(querySelectorAll(selector), first);

export const getAttribute = (atr) => (node) => Maybe.of(node.getAttribute(atr));
