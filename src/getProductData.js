import * as _ from './utils';

const getProductData = ({url, data, parsers}) => _.getURL(url)
  .chain(_.extractHTML)
  .map(_.flow(
    _.domFromHTML,
    _.getDocument,
    _.chain((document) => (
      data
        .map((dataNode) => _.set(dataNode.id)(
          _.flow(
            dataNode.multiple 
              ? _.querySelectorAll(dataNode.selector)
              : _.querySelector(dataNode.selector),
            _.map(parsers[dataNode.parser.type](dataNode.parser.args) || _.noop),
            dataNode.multiple 
              ? _.id
              : _.value
          )(document)
        ))
        .concat([{url}])
        .reduce(_.merge)
    )),
  ))

export default getProductData;