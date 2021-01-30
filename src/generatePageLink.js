import { Identity } from './utils/functors/Identity'

import * as _ from './utils'

const prepareUrl = (separators) => (values) => _.flow(
  _.replace(separators.category)(values.category),
  _.replace(separators.page)(values.page)
)


const generatePageLink = ({ categories, separators, url }) => _.flow(
  _.set('page'),
  _.merge,
  _.map_r(categories.map(_.set('category'))),
  _.map(_.flow(
    prepareUrl(separators),
    _.map_r(Identity.of(url)),
    _.value
  ))
);

export default generatePageLink;
