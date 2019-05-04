const sra = require('./stable-roommates-algorithm');

test('returns a stable matching which exists', () => {
  const matchingExists0 = [
    [1,3,5,2,4],
    [3,4,5,0,2],
    [3,4,5,0,1],
    [5,2,0,4,1],
    [5,2,3,1,0],
    [0,1,3,2,4]
  ]

  const matchingExists1 = [
    [2,3,1,5,4],
    [5,4,3,0,2],
    [1,3,4,0,5],
    [4,1,2,5,0],
    [2,0,1,3,5],
    [4,0,2,3,1]
  ]

  expect(sra.computeMatches(matchingExists0)).toEqual([ [ 5 ], [ 4 ], [ 3 ], [ 2 ], [ 1 ], [ 0 ] ]);
  expect(sra.computeMatches(matchingExists1)).toEqual([ [ 5 ], [ 3 ], [ 4 ], [ 1 ], [ 2 ], [ 0 ] ]);
});

test('returns null if no stable matching exists', () => {
  const noMatchingExists = [
    [1,2,3],
    [2,0,3],
    [0,1,3],
    [0,1,2]
  ]

  expect(sra.computeMatches(noMatchingExists)).toBe(null);
});