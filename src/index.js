import generatePageLink from './generatePageLink';
import getProductData from './getProductData';
import getProductLinks from './getProductLinks';

import * as parsers from './parsers';
import * as _ from './utils';

import * as configs from './__config'

const getLinksTasks = ({config, chunkSize}) => _.flow(
  _.chain(generatePageLink(config)),
  _.map(_.flow(
    _.set('url'),
    _.merge({productSelector: config.selectors.product}),
    getProductLinks
  )),
  _.chunk(chunkSize)
)(_.range(config.pages.from)(config.pages.to))
 

const getDataTasks = ({config, chunkSize}) => _.flow(
  _.join,
  _.unique,
  _.map(_.flow(
    _.set('url'),
    _.merge(config),
    getProductData,
  )),
  _.chunk(chunkSize),
);

// IMPURE CALLING CODE

const executeChunks = _.ifElse(_.isEmpty)(
  _.wrap([]),
  (chunks) => Promise.all(chunks[0].map(_.run))
    .then(_.flow(
      (data) => [data], 
      _.concat,
      async (concat) => concat(await executeChunks(_.leave(1)(chunks))))
    )
    .catch(_.wrap([]))
);

(async(config) => {
  const linkChunks = await executeChunks(getLinksTasks({config, chunkSize: 2}));
  const dataChunks = await executeChunks(getDataTasks({config, chunkSize: 3})(_.join(linkChunks)))

  console.log(_.join(dataChunks))
})(_.merge(configs.defaultConfig, _.merge(configs.morele, { parsers })));






