import { Right } from "./Either";
import { Maybe } from "./Maybe";

import {
  getURL,
  extractHTML,
  domFromHTML,
  querySelectorAll,
  debug,
  flow,
  id,
  left,
  prop,
  map,
  chain,
  toArray,
  filter,
  contains,
  getAttribute,
  __stop,
  matches,
  value,
  toBool,
  either,
  startsWith,
  isLeft,
  flipBool,
  merge,
  toUrl,
  origin,
  prepend,
  append,
  not,
  isNothing,
} from "./utils";

const getDocument = flow(
  prop("window"),
  chain(prop("document")
  )
);

const isAnchorToSubpage = (root) => flow(
  getAttribute("href"),
  map(
    flow(
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
    flow(
      domFromHTML,
      getDocument,
      chain(
        flow(
          querySelectorAll(config.selectors.product),
          toArray,
          filter(isAnchorToSubpage(config.baseUrl)),
          map(flow(
            prop("href"),
            chain(flow(
              startsWith('/'),
              either(
                (relativeLink) => origin(config.baseUrl).map(append(relativeLink)),
                Maybe.of
              ),
            ))
          )),
          filter(not(isNothing)),
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
