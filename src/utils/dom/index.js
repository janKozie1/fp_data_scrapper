import { JSDOM } from "jsdom";

export * from "./nodes";

export const domFromHTML = (html) => new JSDOM(html);
