# Stable roommates problem

A Javascript implementation of the Irving's algorithm for the [stable roommates problem](https://en.wikipedia.org/wiki/Stable_roommates_problem).

If you are interested in the actual implementation, go straight to the `stable-roommates-algorithm.js` file.

The preferences matrix is expected to be of the form:

```
[
  [1,3,5,2,4],
  [3,4,5,0,2],
  [3,4,5,0,1],
  [5,2,0,4,1],
  [5,2,3,1,0],
  [0,1,3,2,4]
]
```

where a row *i* is the ordered list of preferences of *i*.

## A few notes about incomplete preferences lists

This implementation of the algorithm doesn't support partial lists of preferences, but there's a trick.

If you don't want to provide full lists of preferences, the function `fillWithRandom` of `utils.js` can help you filling randomly the remaining preferences. Be aware that in this way you could end up with no stable matching. A simple workaround is to re-run the algorithm with newly random filled preferences lists. You can find an example of this in the `index.js` file.

## Complexity

This implementation is not intended to be efficient, thus the actual Irving's algorithm complexity of *O(n^2)* is not guaranteed.
