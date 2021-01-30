import { Maybe } from './utils/functors/Maybe';

import * as _ from "./utils";

export const imageURL = () => _.flow(
  _.ifElse(
    _.flow(
      _.nodeName,
      _.map(_.eq('img')),
      _.value,
    )
  )(Maybe.of, _.querySelector('img')),
  _.chain(_.getAttribute('src')),
  _.value
)

export const price = ({currency = ''}) => _.flow(
  _.textContent,
  _.value,
  _.match(_.regex(['i', 'g'])(`\\d+([,\\.]\\d*)?\\s*${currency}`)),
  _.chain(_.flow(
    _.head,
    _.map(_.flow(
      _.replace(',', '.'),
      _.toFloat,
      _.ifElse(isNaN)(_.wrap(null), _.id)
    ))
  )),
  _.value,
)

export const text = ({replacements = []}) => _.flow(
  _.textContent,
  _.map(_.flow(
    _.id,
    ...replacements.map(_.flow(
      _.ifElse(_.flow(
        _.prop('length'), 
        _.map(_.eq(2)),
        _.value,
      ))(
        ([toReplace, replacement]) => _.replace(_.regex(['g', 'i'])(toReplace), replacement),
        _.id
      )
    ))
  )),
  _.value,
)

export const attribute = ({ attribute }) => _.flow(
  _.getAttribute(attribute),
  _.value,
)