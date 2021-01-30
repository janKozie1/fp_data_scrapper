import { Maybe } from "./utils/functors/Maybe";

import * as _ from "./utils";

const getProductLinks = ({url, productSelector}) => _.getURL(url)
  .chain(_.extractHTML)
  .map(_.flow(
    _.domFromHTML,
    _.getDocument,
    _.chain(_.flow(
      _.querySelectorAll(productSelector),
      _.filter(_.isAnchorToSubpage(url)),
      _.map(_.flow(
        _.prop("href"),
        _.chain(_.flow(
          _.startsWith('/'),
          _.either(
            _.flow(
              _.append,
              _.map_r(_.origin(url)),
            ),
            Maybe.of
          ),
        ))
      )),
      _.filter(_.not(_.isNothing)),
      _.map(_.flow(
        _.value,
        _.replace(/#.*/)(''),
      )),
      _.unique,
    )),
  ));

export default getProductLinks;