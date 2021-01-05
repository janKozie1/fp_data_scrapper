import { 
  getURL,
  extractHTML,
  domFromHTML,
  querySelectorAll,
  debug,
  flow,
  id,
  prop,
  not,
  map,
  chain,
  toArray,
  filter,
  contains,
  getAttribute,
  isNothing,
  value,
  toBool
} from './utils';

const getDocument = flow(
  prop('window'),
  chain(prop('document')),
)

const isAnchorToSubpage = (root) => flow(
  getAttribute('href'),
  chain(contains(/^(https?)/)),
  chain(contains(root)),
  debug(id),
  value,
  toBool
)



getURL('https://www.empik.com')
  .chain(extractHTML)
  .map(flow(
    domFromHTML,
    getDocument,
    map(flow(
      querySelectorAll('a'),
      toArray,
      filter(isAnchorToSubpage('https://www.empik.com')),
      map(flow(
        prop('href'),
        debug(id)
      ))
    ))
  ))
  .run()