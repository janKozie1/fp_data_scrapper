import { Right } from '../functors/Either'

import { flow, map, isLeft, value, either } from '../fp'
import { getAttribute } from './nodes';
import { startsWith } from '../string'
import { flipBool } from '../boolean'

export const isAnchorToSubpage = (root) => flow(
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
