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

;// CONCATENATED MODULE: ./src/Identity.js
class Identity {
    constructor(x) {
        this.__value = x;
    }

    static of(x) {
        return new Identity(x);
    }

    map(fn) {
        return Identity.of(fn(this.__value));
    }

    ap(f) {
        return f.map(this.__value);
    }

    chain(fn) {
        return this.map(fn).join();
    }

    join() {
        return this.__value;
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

;// CONCATENATED MODULE: ./src/utils/boolean.js


const flipBool = (bool) => !bool;

const boolean_not = (fn) => fp_flow(fn, toBool, flipBool);

const or = (fnA, fnB) => (arg) => toBool(fnA(arg) || fnB(arg));

const and = (fnA, fnB) => (arg) => toBool(fnA(arg) && fnB(arg));

const ifElse = (fnA, fnB) => (arg) => arg ? fnA() : fnB()

const eq = (a) => (b) => a === b;

const boolean_isLess = (a) => (b) => a < b;

const toBool = Boolean;

;// CONCATENATED MODULE: ./src/utils/fp.js





const id = (value) => value;

const fp_flow = (...fns) => (value) =>
  fns.reduce((previous, fn) => fn(previous), value);

const compose = (...fns) => fp_flow(fns.reverse());

const left = (value) => new Left(value);

const map = (fn) => (functor) => functor.map(fn);
const map_r = (functor) => (fn) => functor.map(fn);

const ap = (functorA) => (functorB) => functorA.ap(functorB)
const ap_r = (functorA) => (functorB) => functorB.ap(functorA)

const join = (monad) => monad.join();

const chain = (fn) => (monad) => Array.isArray(monad) 
  ? monad.flatMap(fn)
  : monad.chain(fn);

const call = (...args) => (fn) => fn(...args)

const isLeft = (either) => either.isLeft();

const either = (right, left = id) => (either) =>
  either.isLeft() ? left(either.__value) : right(either.__value);

const wrap = (value) => () => value;

const run = (task) => task.run()

const value = (func) => func.__value;

const unary = (fn) => (arg) => fn(arg);

const apply = (fn) => (args) => fn.apply(null, args)

const curry = (fn) => (...args) => fp_flow(
  prop('length'),
  isLess(prop('length')(fn)),
  (is) => apply(fn)(args)
)(...args)

const isNothing = (func) => func.isNothing();

const debug = (fn) => (value) => {
  console.log(fn(value));
  return value;
};

const __stop = () => {
  throw new Error();
};

;// CONCATENATED MODULE: ./src/utils/object.js


const object_prop = (name) => (object) => Maybe_Maybe.of(object[name]);

const merge = (objA) => (objB) => Object.assign({}, objA, objB);

const set = (name) => (value) => ({ [name]: value })
;// CONCATENATED MODULE: ./src/utils/array.js








const array_first = object_prop(0);

const last = (arr) => Maybe.of(arr[arr.length - 1]);

const find = (fn) => (arr) => Maybe.of(arr.find(fn));

const filter = (fn) => (arr) => arr.filter(fn);

const pick = (fn) => (arr) => arr.filter(flow(fn, not));

const toArray = (arg) => Array.from(arg);

const reverse = (arr) => arr.reverse();

const joinArr = (str) => (arr) => arr.join(str);

const concat = (arrA) => (arrB) => [...arrA, ...arrB];

const range = (from) => (to) => Array.from({length: to - from}, (_, index) => index + from)

const isEmpty = fp_flow(object_prop('length'), map(eq(0)), value);

const take = (amount) => (arr) => arr.slice(0, amount)

const leave = (amount) => (arr) => arr.slice(amount)

const chunk = (amount) => (arr) => fp_flow(
  boolean_not(isEmpty),
  (notEmpty) => notEmpty 
    ? [take(amount)(arr), ...chunk(amount)(leave(amount)(arr))]
    : arr
)(arr)

 //map_r(Identity.of(chunk(amount)(leave(amount)(arr)))),

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

const replace = (regex) => (replacement) => (str) => str.replace(regex, replacement)

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
    chain(object_prop('origin'))
)
;// CONCATENATED MODULE: ./src/utils/index.js









;// CONCATENATED MODULE: ./src/index.js






const getDocument = fp_flow(
  object_prop("window"),
  chain(object_prop("document")
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

const prepareUrl = (separators) => (values) => fp_flow(
  replace(separators.category)(values.category),
  replace(separators.page)(values.page)
)


const getProductPageLinks = ({url, productSelector}) => getURL(url)
  .chain(extractHTML)
  .map(
    fp_flow(
      domFromHTML,
      getDocument,
      chain(
        fp_flow(
          querySelectorAll(productSelector),
          toArray,
          filter(isAnchorToSubpage(url)),
          map(fp_flow(
            object_prop("href"),
            chain(fp_flow(
              startsWith('/'),
              either(
                fp_flow(
                  append,
                  Identity.of,
                  ap_r(origin(url)),
                ),
                Maybe_Maybe.of
              ),
            ))
          )),
          filter(boolean_not(isNothing)),
          map(value)
        )
      ),
      debug(id)
    )
  );

console.log(chunk(1)([1,2,3,4,5,6,7]))

const generatePageLink = ({ categories, separators, url }) => fp_flow(
    set('page'),
    merge,
    map_r(categories.map(set('category'))),
    map(fp_flow(
      prepareUrl(separators),
      map_r(Identity.of(url)),
      value
    ))
  );

const program = (config) => range(config.pages.from)(config.pages.to)
  .flatMap(generatePageLink(config))
  .map(fp_flow(
    set('url'),
    merge({productSelector: config.selectors.product}),
    getProductPageLinks
  ))


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

const pageConfig = {
  selectors: {
    product: 'p > .productLink',
  },
  url: "https://www.morele.net/{{category}}/,,,,,,,,0,,,,/{{page}}/",
  categories: ['laptopy-31'],
  pages: { from: 1, to: 10 },
};

// IMPURE CALLING CODE

program(merge(defaultConfig)(pageConfig)).forEach(unary(console.log))


/******/ })()
;