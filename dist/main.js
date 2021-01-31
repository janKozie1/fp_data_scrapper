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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/

// NAMESPACE OBJECT: ./src/parsers.js
var parsers_namespaceObject = {};
__webpack_require__.r(parsers_namespaceObject);
__webpack_require__.d(parsers_namespaceObject, {
  "attribute": () => attribute,
  "count": () => count,
  "imageURL": () => imageURL,
  "price": () => price,
  "text": () => parsers_text
});

// NAMESPACE OBJECT: ./src/__config.js
var _config_namespaceObject = {};
__webpack_require__.r(_config_namespaceObject);
__webpack_require__.d(_config_namespaceObject, {
  "H": () => morele
});

;// CONCATENATED MODULE: ./src/utils/functors/Either.js
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

;// CONCATENATED MODULE: ./src/utils/boolean.js


const flipBool = (bool) => !bool;

const boolean_not = (fn) => fp_flow(fn, toBool, flipBool);

const or = (fnA, fnB) => (arg) => toBool(fnA(arg) || fnB(arg));

const and = (fnA, fnB) => (arg) => toBool(fnA(arg) && fnB(arg));

const ifElse = (condition) => (fnA, fnB) => (...arg) => condition(...arg) ? fnA(...arg) : fnB(...arg)

const eq = (a) => (b) => a === b;

const isLess = (a) => (b) => a < b;

const isNil = (a) => a === undefined || a === null;

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

const join = (monad) => Array.isArray(monad)
  ? monad.flat()
  : monad.join();

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

const bind = (...args) => (fn) => fn.bind(null, ...args)

const noop = () => null;

const curry = (fn) => (...args) => isLess(args.length)(fn.length)
  ? curry(bind(...args)(fn))
  : call(...args)(fn)

const isNothing = (func) => func.isNothing();

// IMPURE

const debug = (fn) => (value) => {
  console.log(fn(value));
  return value;
};

;// CONCATENATED MODULE: ./src/utils/functors/Maybe.js
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
    return this.isNothing() ? this : Maybe_Maybe.of(fn(this.__value));
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

const merge = curry((objA, objB) => Object.assign({}, objA, objB));

const set = (name) => (value) => ({ [name]: value })

const has = (name) => (obj) => name in obj

const pairs = (obj) => Object.entries(obj);
;// CONCATENATED MODULE: ./src/utils/set.js


const toSet = (arr_like) => new Set(arr_like)
;// CONCATENATED MODULE: ./src/utils/array.js







const first = prop(0);

const last = (arr) => Maybe.of(arr[arr.length - 1]);

const find = (fn) => (arr) => Maybe.of(arr.find(fn));

const filter = (fn) => (arr) => arr.filter(fn);

const reduce = (fn, defaultArg) => (arr) => isNil(defaultArg) ? arr.reduce(fn) : arr.reduce(fn, defaultArg)

const pick = (fn) => (arr) => arr.filter(flow(fn, not));

const toArray = (arg) => Array.from(arg);

const reverse = (arr) => arr.reverse();

const joinArr = (str) => (arr) => arr.join(str);

const concat = (arrA) => (arrB) => [...arrA, ...arrB];

const range = (from) => (to) => Array.from({length: to - from + 1}, (_, index) => index + from)

const isEmpty = fp_flow(prop('length'), map(eq(0)), value);

const take = (amount) => (arr) => arr.slice(0, amount)

const leave = (amount) => (arr) => arr.slice(amount)

const unique = fp_flow(toSet, toArray)

const chunk = (amount) => (arr) => amount === 0 
  ? [arr]
  : boolean_not(isEmpty)(arr) 
    ? [take(amount)(arr), ...chunk(amount)(leave(amount)(arr))]
    : arr


;// CONCATENATED MODULE: external "jsdom"
const external_jsdom_namespaceObject = require("jsdom");;
;// CONCATENATED MODULE: ./src/utils/string.js






const head = first;

const regex = curry((flags, str) => new RegExp(str, joinArr("")(flags)));

const toRegex = regex([]);

const stringifty = (value) => JSON.stringify(value);

const split = (splitter) => (str) => str.split(splitter);

const match = (regex) => (str) => Maybe_Maybe.of(str.match(regex));

const append = (suffix) => (str) => str + suffix;

const prepend = (prefix) => (str) => prefix + str;

const toLowerCase = (str) => str.toLowerCase();

const replace = curry((regex, replacement, str) => str.replace(regex, replacement))

const matches = (regex) => (str) =>
  regex.test(str) ? Right.of(str) : left(str);

const startsWith = (str) => matches(fp_flow(prepend("^"), toRegex)(str));

;// CONCATENATED MODULE: ./src/utils/dom/nodes.js








const querySelectorAll = (selector) => (doc) => toArray(doc.querySelectorAll(selector));

const querySelector = (selector) => fp_flow(
  querySelectorAll(selector),
  first,
);

const getAttribute = (atr) => (node) => Maybe_Maybe.of(node.getAttribute(atr));

const nodeName = fp_flow(prop('tagName'), map(toLowerCase))

const textContent = prop('textContent')
;// CONCATENATED MODULE: ./src/utils/dom/links.js







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

;// CONCATENATED MODULE: ./src/utils/dom/index.js








const domFromHTML = (html) => new external_jsdom_namespaceObject.JSDOM(html);

const getDocument = fp_flow(prop("window"), chain(prop("document")));
;// CONCATENATED MODULE: ./src/utils/functors/Task.js



class Task {
  constructor(fn) {
    this.task = fn;
  }

  static of(x) {
    return new Task((resolve) => resolve(x));
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
}
;// CONCATENATED MODULE: external "node-fetch"
const external_node_fetch_namespaceObject = require("node-fetch");;
var external_node_fetch_default = /*#__PURE__*/__webpack_require__.n(external_node_fetch_namespaceObject);
;// CONCATENATED MODULE: ./src/utils/fetching.js




const getURL = (url) => new Task((resolve) => 
  external_node_fetch_default()(url, {method: 'GET', headers: { "Content-Type": 'text/plain'}})
    .then(resolve)
    .catch(left)
)

const extractHTML = (response) => new Task((resolve) =>
  response.text()
    .then(resolve)
    .catch(left)
)


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
;// CONCATENATED MODULE: ./src/utils/number.js


const toInt = unary(parseInt);

const toFloat = unary(parseFloat)

;// CONCATENATED MODULE: ./src/utils/index.js










;// CONCATENATED MODULE: ./src/generatePageLink.js



const generatePageLink = ({ url }) => (page) => url.params.map(fp_flow(
  merge({page}),
  pairs,
  reduce(((link, [key, value]) => replace(`{{${key}}}`, value, link)), url.base)
))

/* harmony default export */ const src_generatePageLink = (generatePageLink);

;// CONCATENATED MODULE: ./src/getProductData.js


const getProductData = ({url, data, parsers}) => getURL(url)
  .chain(extractHTML)
  .map(fp_flow(
    domFromHTML,
    getDocument,
    chain((document) => (
      data
        .map((dataNode) => set(dataNode.id)(
          fp_flow(
            dataNode.multiple 
              ? querySelectorAll(dataNode.selector)
              : querySelector(dataNode.selector),
            map(has(dataNode.parser.type)(parsers) 
              ? parsers[dataNode.parser.type](dataNode.parser.args)
              : noop),
            dataNode.multiple 
              ? id
              : value
          )(document)
        ))
        .concat([{url}])
        .reduce(merge)
    )),
  ))

/* harmony default export */ const src_getProductData = (getProductData);
;// CONCATENATED MODULE: ./src/getProductLinks.js




const getProductLinks = ({url, productSelector}) => getURL(url)
  .chain(extractHTML)
  .map(fp_flow(
    domFromHTML,
    getDocument,
    chain(fp_flow(
      querySelectorAll(productSelector),
      filter(isAnchorToSubpage(url)),
      map(fp_flow(
        prop("href"),
        chain(fp_flow(
          startsWith('/'),
          either(
            fp_flow(
              append,
              map_r(origin(url)),
            ),
            Maybe_Maybe.of
          ),
        ))
      )),
      filter(boolean_not(isNothing)),
      map(fp_flow(
        value,
        replace(/#.*/)(''),
      )),
      unique,
    )),
  ));

/* harmony default export */ const src_getProductLinks = (getProductLinks);
;// CONCATENATED MODULE: ./src/parsers.js




const imageURL = () => fp_flow(
  ifElse(
    fp_flow(
      nodeName,
      map(eq('img')),
      value,
    )
  )(Maybe_Maybe.of, querySelector('img')),
  chain(getAttribute('src')),
  value
)

const price = ({currency = ''}) => fp_flow(
  textContent,
  value,
  match(regex(['i', 'g'] ,`\\d[\\d\\s]*([,\\.]\\d*)?\\s*${currency}`)),
  chain(fp_flow(
    head,
    map(fp_flow(
      replace(',', '.'),
      replace(regex(['g'], '\\s' ), ''),
      toFloat,
      ifElse(isNaN)(wrap(null), id)
    ))
  )),
  value,
)

const parsers_text = ({replacements = []}) => fp_flow(
  textContent,
  map(fp_flow(
    id,
    ...replacements.map(fp_flow(
      ifElse(fp_flow(
        prop('length'), 
        map(eq(2)),
        value,
      ))(
        ([toReplace, replacement]) => replace(regex(['g', 'i'], toReplace), replacement),
        id
      )
    ))
  )),
  value,
)

const attribute = ({ attribute }) => fp_flow(
  getAttribute(attribute),
  value,
)

const count = ({selector}) => fp_flow(
  querySelectorAll(selector),
  prop('length'),
  value
)
;// CONCATENATED MODULE: ./src/__config.js


const morele = {
  selectors: {
    product: 'a.cat-product-image.productLink',
  },
  url: {
    base: "https://www.morele.net/kategoria/{{category}}/,,,,,,,,0,,,,/{{page}}/",
    params: [
      {category: "laptopy-31"},
      {category: "lodowki-do-zabudowy-261"}
    ]
  },
  pages: { from: 1, to: 1},
  data: [
    {
      id: 'image',
      parser: {
        type: 'imageURL',
        args: { }
      },
      selector: '[itemprop=image]',
      multiple: false,
    },
    {
      id: 'price',
      parser: { 
        type: 'price',
        args: { currency: 'zł' }
      },
      selector: '.product-price',
      multiple: false,
    },
    {
      id: 'name',
      parser: {
        type: 'text',
        args: { }
      },
      selector: '.prod-name',
      multiple: false,
    },
    {
      id: 'features',
      parser: {
        type: 'text',
        args: { 
          replacements: [
            ['\n', ''],
          ]
        },
      },
      selector: '.prod-main-features li:not([class])',
      multiple: true,
    },
    {
      id: 'id',
      parser: {
        type: 'text',
        args: { }
      },
      selector: '[itemprop=sku]',
      multiple: false,
    }
  ]
};

const xkom = {
  selectors: {
    product: 'a[href^="/p/"]',
  },
  url: {
    base: "https://www.x-kom.pl/{{group}}/c/{{category}}.html?page={{page}}",
    params: [
      {category: "1590-smartfony-i-telefony", group: 'g-4'},
      // {category: '1663-tablety', group: 'g-4'},
      // {category: '89-dyski-twarde-hdd-i-ssd', group: 'g-5'},
    ]
  },
  pages: { from: 1, to: 1},
  data: [
    {
      id: 'image',
      parser: {
        type: 'imageURL',
        args: { }
      },
      selector: '#app img[src$=jpg]',
      multiple: false,
    },
    {
      id: 'stars',
      parser: {
        type: 'count',
        args: { selector: 'img[src$="985a91ae09e6b303.svg"]' }
      },  
      selector: 'a[href="#Opinie"]',
      multiple: false,
    },
    {
      id: 'price',
      parser: { 
        type: 'price',
        args: { currency: 'zł' }
      },
      selector: '#app div[order="3"] .iVazGO',
      multiple: false,
    },
    {
      id: 'discount',
      parser: {
        type: 'price',
        args: { currency: 'zł'},
      },
      selector: '#app .cuTTER',
      multiple: false
    },
    {
      id: 'name',
      parser: {
        type: 'text',
        args: { }
      },
      selector: '#app h1',
      multiple: false,
    },
    {
      id: 'manufacturer',
      parser: {
        type: 'text',
        args: { }
      },
      selector: '#app .iIoJeH',
      multiple: false,
    },
    {
      id: 'comments',
      parser: {
        type: 'text',
        args: { 
          replacements: [
            ['.... Rozwiń dalej', '']
          ]
        }
      },
      selector: 'p.gjgIIq',
      multiple: true,
    }
  ]
};
;// CONCATENATED MODULE: ./src/index.js









const getLinksTasks = ({config, chunkSize}) => fp_flow(
  chain(src_generatePageLink(config)),
  map(fp_flow(
    set('url'),
    merge({productSelector: config.selectors.product}),
    src_getProductLinks
  )),
  chunk(chunkSize)
)(range(config.pages.from)(config.pages.to))
 

const getDataTasks = ({config, chunkSize}) => fp_flow(
  join,
  unique,
  map(fp_flow(
    set('url'),
    merge(config),
    src_getProductData,
  )),
  chunk(chunkSize),
);

// IMPURE CALLING CODE

const executeChunks = ifElse(isEmpty)(
  wrap([]),
  (chunks) => Promise.all(chunks[0].map(run))
    .then(fp_flow(
      (data) => [data], 
      concat,
      async (concat) => concat(await executeChunks(leave(1)(chunks))))
    )
    .catch(wrap([]))
);

(async(config) => {
  const linkChunks = await executeChunks(getLinksTasks({config, chunkSize: 2}));
  const dataChunks = await executeChunks(getDataTasks({config, chunkSize: 2})(join(linkChunks)))

  console.log(join(dataChunks))
})(merge(_config_namespaceObject.defaultConfig, merge(morele, { parsers: parsers_namespaceObject })));







/******/ })()
;