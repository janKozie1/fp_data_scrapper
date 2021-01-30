import * as _ from './utils'


const generatePageLink = ({ url }) => (page) => url.params.map(_.flow(
  _.merge({page}),
  _.pairs,
  _.reduce(((link, [key, value]) => _.replace(`{{${key}}}`, value, link)), url.base)
))

export default generatePageLink;
