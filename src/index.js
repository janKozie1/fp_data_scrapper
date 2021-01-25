import { Right } from "./Either";
import { Identity } from "./Identity";
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
  ap,
  ap_r,
  set,
  replace,
  range,
  map_r,
  run,
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

const prepareUrl = (separators) => (values) => flow(
  replace(separators.category)(values.category),
  replace(separators.page)(values.page)
)


const getProductPageLinks = ({url, productSelector}) => getURL(url)
  .chain(extractHTML)
  .map(
    flow(
      domFromHTML,
      getDocument,
      chain(
        flow(
          querySelectorAll(productSelector),
          toArray,
          filter(isAnchorToSubpage(url)),
          map(flow(
            prop("href"),
            chain(flow(
              startsWith('/'),
              either(
                flow(
                  append,
                  Identity.of,
                  ap_r(origin(url)),
                ),
                Maybe.of
              ),
            ))
          )),
          filter(not(isNothing)),
          map(value)
        )
      ),
      debug(id)
    )
  );


const generatePageLink = ({ categories, separators, url }) => flow(
    set('page'),
    merge,
    map_r(categories.map(set('category'))),
    map(flow(
      prepareUrl(separators),
      map_r(Identity.of(url)),
      value
    ))
  );

const program = (config) => range(config.pages.from)(config.pages.to)
  .flatMap(generatePageLink(config))
  .map(flow(
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

program(merge(defaultConfig)(pageConfig)).forEach(run)

