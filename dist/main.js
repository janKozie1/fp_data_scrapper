/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/************************************************************************/

;// CONCATENATED MODULE: ./src/Either.js
class Right {
  constructor(value) {
    this.__value = value;
  }

  isLeft() {
    return false;
  }

  isRight() {
    return true;
  }

  static of(value) {
    return new Right(value);
  }

  map(fn) {
    return Right.of(fn(this.__value));
  }

  ap(functor) {
    return functor.map(this.__value);
  }

  join() {
    return this.__value;
  }

  chain(fn) {
    return this.map(fn).join();
  }
}

class Left {
  constructor(value) {
    this.__value = value;
  }

  isLeft() {
    return true;
  }

  isRight() {
    return false;
  }

  map() {
    return this;
  }

  chain() {
    return this;
  }

  join() {
    return this;
  }

  ap() {
    return this;
  }
}

;// CONCATENATED MODULE: ./src/Maybe.js
class Maybe_Maybe {
  constructor(value) {
    this.__value = value;
  }

  isNothing() {
    return this.__value === undefined || this.__value === null;
  }

  static of(value) {
    return new Maybe_Maybe(value);
  }

  map(fn) {
    return this.isNothing() ? this : new Maybe_Maybe(fn(this.__value));
  }

  ap(functor) {
    return this.isNothing() ? this : functor.map(this.__value);
  }

  chain(fn) {
    return this.map(fn).join();
  }

  join() {
    return this.isNothing() ? this : this.__value;
  }
}

;// CONCATENATED MODULE: ./src/utils/object.js


const prop = (name) => (object) => Maybe_Maybe.of(object[name]);

const merge = (objA) => (objB) => Object.assign({}, objA, objB);
;// CONCATENATED MODULE: ./src/utils/array.js





const array_first = prop(0);

const last = (arr) => Maybe.of(arr[arr.length - 1]);

const find = (fn) => (arr) => Maybe.of(arr.find(fn));

const filter = (fn) => (arr) => arr.filter(fn);

const pick = (fn) => (arr) => arr.filter(flow(fn, not));

const toArray = (arg) => Array.from(arg);

const reverse = (arr) => arr.reverse();

const joinArr = (str) => (arr) => arr.join(str);

;// CONCATENATED MODULE: ./src/utils/fp.js


const id = (value) => value;

const fp_flow = (...fns) => (value) =>
  fns.reduce((previous, fn) => fn(previous), value);

const compose = (...fns) => fp_flow(fns.reverse());

const left = (value) => new Left(value);

const map = (fn) => (functor) => functor.map(fn);

const join = (monad) => monad.join();

const chain = (fn) => (monad) => monad.chain(fn);

const isLeft = (either) => either.isLeft();

const either = (right, left = id) => (either) =>
  either.isLeft() ? left(either.__value) : right(either.__value);

const wrap = (value) => () => value;

const value = (func) => func.__value;

const isNothing = (func) => func.isNothing();

const debug = (fn) => (value) => {
  console.log(fn(value));
  return value;
};

const __stop = () => {
  throw new Error();
};

;// CONCATENATED MODULE: ./src/utils/boolean.js


const flipBool = (bool) => !bool;

const boolean_not = (fn) => fp_flow(fn, toBool, flipBool);

const or = (fnA, fnB) => (arg) => toBool(fnA(arg) || fnB(arg));

const and = (fnA, fnB) => (arg) => toBool(fnA(arg) && fnB(arg));

const toBool = (value) => Boolean(value);

;// CONCATENATED MODULE: external "jsdom"
const external_jsdom_namespaceObject = require("jsdom");;
;// CONCATENATED MODULE: ./src/utils/dom/nodes.js





const querySelectorAll = (selector) => (doc) =>
  doc.querySelectorAll(selector);

const querySelector = (selector) =>
  flow(querySelectorAll(selector), first);

const getAttribute = (atr) => (node) => Maybe_Maybe.of(node.getAttribute(atr));

;// CONCATENATED MODULE: ./src/utils/dom/index.js




const domFromHTML = (html) => new external_jsdom_namespaceObject.JSDOM(html);

;// CONCATENATED MODULE: ./src/Task.js



class Task {
  constructor(fn) {
    this.task = fn;
  }

  // static rejected(x) {
  //   return new Promise((reject, _) => reject(x));
  // }

  static of(x) {
    return new Task((resolve, reject) => resolve(x));
  }

  run() {
    return new Promise(this.task)
  }

  map(fn) {
    return new Task((resolve, reject) => new Promise(this.task)
      .then(fp_flow(fn, resolve), reject)
    );
  }

  chain(fn) {
    return new Task((resolve, reject) => this.run()
      .then((x) => fn(x).run().then(resolve, reject))     
    )
  }

  // map(fn) {
  //   return new Task((reject, resolve) =>(reject, compose(resolve, fn)));
  // }

  // ap(f) {
  //   return this.chain(fn => f.map(fn));
  // }

  // chain(fn) {
  //   return new Task((reject, resolve) => this.fork(reject, x => fn(x).fork(reject, resolve)));
  // }

  // join() {
  //   return this.chain(id);
  // }
}
;// CONCATENATED MODULE: external "node-fetch"
const external_node_fetch_namespaceObject = require("node-fetch");;
var external_node_fetch_default = /*#__PURE__*/__webpack_require__.n(external_node_fetch_namespaceObject);
;// CONCATENATED MODULE: ./src/utils/fetching.js



const getURL = (url) => new Task((resolve, reject) => 
  external_node_fetch_default()(url, {method: 'GET', headers: { "Content-Type": 'text/plain'}})
    .then(resolve)
    .catch(reject)
)

const extractHTML = (response) => new Task((resolve, reject) =>
  response.text()
    .then(resolve)
    .catch(reject)
)


;// CONCATENATED MODULE: ./src/utils/string.js






const head = (/* unused pure expression or super */ null && (first));

const regex = (flags) => (str) => new RegExp(str, joinArr("")(flags));

const toRegex = regex([]);

const stringifty = (value) => JSON.stringify(value);

const split = (splitter) => (str) => str.split(splitter);

const match = (regex) => (str) => Maybe.of(str.match(regex));

const append = (suffix) => (str) => str + suffix;

const prepend = (prefix) => (str) => prefix + str;

const matches = (regex) => (str) =>
  regex.test(str) ? Right.of(str) : left(str);

const startsWith = (str) => matches(fp_flow(prepend("^"), toRegex)(str));

;// CONCATENATED MODULE: ./src/utils/url.js





const toUrl = (str) => {
    try {
        return Maybe_Maybe.of(new URL(str))
    } catch {
        return Maybe_Maybe.of(null)
    }
}

const origin = fp_flow(
    toUrl,
    chain(prop('origin'))
)
;// CONCATENATED MODULE: ./src/utils/index.js









;// CONCATENATED MODULE: ./src/index.js





const getDocument = fp_flow(
  prop("window"),
  chain(prop("document")
  )
);

const isAnchorToSubpage = (root) => fp_flow(
  getAttribute("href"),
  map(
    fp_flow(
      startsWith(root), 
      either(Right.of, startsWith("/")),
      isLeft,
    )
  ),
  value,
  flipBool  
);


const program = (config) => getURL(config.baseUrl)
  .chain(extractHTML)
  .map(
    fp_flow(
      domFromHTML,
      getDocument,
      chain(
        fp_flow(
          querySelectorAll(config.selectors.product),
          toArray,
          filter(isAnchorToSubpage(config.baseUrl)),
          map(fp_flow(
            prop("href"),
            chain(fp_flow(
              startsWith('/'),
              either(
                (relativeLink) => origin(config.baseUrl).map(append(relativeLink)),
                Maybe_Maybe.of
              ),
            ))
          )),
          filter(boolean_not(isNothing)),
          map(value)
        )
      ),
      debug(id),
    )
  );


const defaultConfig = {
  separators: {
    category: '{{category}}',
    page: '{{page}}',
  },
  selectors: {
    product: undefined
  },
  categories: [],
  baseUrl: undefined
}

const config = {
  selectors: {
    product: 'p > .productLink',
  },
  baseUrl: "https://www.morele.net/kategoria/laptopy-31/,,,,,,,,0,,,,/1/",
  categories: [],
}

// IMPURE



program(merge(defaultConfig)(config)).run()

/******/ })()
;