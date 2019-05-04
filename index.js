const sra = require('./stable-roommates-algorithm')
const utils = require('./utils')

const completePrefs = [
  [1,3,5,2,4],
  [3,4,5,0,2],
  [3,4,5,0,1],
  [5,2,0,4,1],
  [5,2,3,1,0],
  [0,1,3,2,4]
]

const partialPrefs = [
  [1,16,14],
  [0,12,14],
  [10,11,14],
  [13,16,5],
  [5,12,17],
  [4,7,8],
  [4,9,2],
  [17,8,9],
  [6,11,1],
  [16,0,6],
  [2,4,11],
  [8,13,16],
  [4,7,2],
  [16,8,10],
  [8,7,1],
  [5,3,4],
  [2,13,12],
  [7,3,14]
]

const matching0 = sra.computeMatches(completePrefs)

console.log('Matching list for complete preferences')
console.log(matching0)

utils.seed(42)

let configurationFound = false
while (!configurationFound) {
  const match = sra.computeMatches(utils.fillWithRandom(partialPrefs))

  if (match !== null) {
    configurationFound = true
    console.log('\nMatching for partial preferences:')
    console.log(match)
  }
}

