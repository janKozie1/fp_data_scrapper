import { JSDOM } from "jsdom";

import { flow, chain } from '../fp'
import { prop } from '../object'

export * from "./nodes";
export * from './links';

export const domFromHTML = (html) => new JSDOM(html);

export const getDocument = flow(prop("window"), chain(prop("document")));