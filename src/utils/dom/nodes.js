import { Maybe } from "../functors/Maybe";

import { flow, map } from "../fp";
import { first, toArray } from "../array";
import { prop } from "../object";
import { toLowerCase } from "../string";
import { } from '../boolean'

export const querySelectorAll = (selector) => (doc) => toArray(doc.querySelectorAll(selector));

export const querySelector = (selector) => flow(
  querySelectorAll(selector),
  first,
);

export const getAttribute = (atr) => (node) => Maybe.of(node.getAttribute(atr));

export const nodeName = flow(prop('tagName'), map(toLowerCase))

export const textContent = prop('textContent')