import { Maybe } from './functors/Maybe';

import { chain, flow } from './fp';
import { prop } from './object'

export const toUrl = (str) => {
    try {
        return Maybe.of(new URL(str))
    } catch {
        return Maybe.of(null)
    }
}

export const origin = flow(
    toUrl,
    chain(prop('origin'))
)