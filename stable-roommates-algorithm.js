function rejectSymmetrically(i, j, prefs) {
  const indexJ = prefs[i].indexOf(j)
  if (indexJ > -1) prefs[i].splice(indexJ, 1)
  const indexI = prefs[j].indexOf(i)
  if (indexI > -1) prefs[j].splice(indexI, 1)
}

function acceptProposal(i, preferred, proposals, accepts) {
  proposals[i] = preferred
  accepts[preferred] = i
}

function wouldBreakup(preferred, i, accepts, prefs) {
  const indexCurrentProposal = prefs[preferred].indexOf(accepts[preferred])
  const indexNewProposal = prefs[preferred].indexOf(i)
  // TODO add -1 check?
  return indexNewProposal < indexCurrentProposal
}

function breakupFor(preferred, i, proposals, accepts, prefs) {
  proposals[i] = preferred
  const oldAccept = accepts[preferred]
  accepts[preferred] = i
  rejectSymmetrically(preferred, oldAccept, prefs)
  return oldAccept
}


function firstPhase(prefs) {
  const unmatched = [ ...Array(prefs.length).keys() ]

  const proposals = {}
  const accepts = {}

  while (unmatched.length > 0) {
    const i = unmatched[0]
    const preferred = prefs[i][0]

    if (!accepts[preferred]) {
      // the preferred is free
      acceptProposal(i, preferred, proposals, accepts)
      unmatched.shift()
    } else if (wouldBreakup(preferred, i, accepts, prefs)) {
      // preferred is willing to breakup
      preferredOldAccept = breakupFor(preferred, i, proposals, accepts, prefs)
      unmatched[0] = preferredOldAccept
    } else {
      rejectSymmetrically(i, preferred, prefs)
    }
  }

  return { prefs, accepts }
}

function secondPhase(prefs, accepts) {
  for (let i = 0; i < prefs.length; i++) {
    const indexAccept = prefs[i].indexOf(accepts[i])
    if (indexAccept > -1) {
      // deep copy, just to be sure
      const toRemove = JSON.parse(JSON.stringify(prefs[i].slice(indexAccept + 1)))
      toRemove.forEach(r => rejectSymmetrically(i, r, prefs))
    }
  }

  return prefs
}

function getRotation(i, prefs, secondChoices, lastChoices) {
  if (lastChoices.slice(0,-1).indexOf(lastChoices[lastChoices.length - 1]) !== -1) {
    // preference cycle
    return { secondChoices, lastChoices }
  }

  const second = prefs[i][1]

  // at a given point in the recursion, we find that the current i has no second
  // preference, hence there are no other rotations to remove, thus no stable matching exists.
  // NOTE: this is just an intuition without actual proof
  if (second === undefined) {
    return { secondChoices: null, lastChoices: null }
  }

  secondChoices.push(second)
  const secondLastIndex = prefs[second].length - 1
  const secondLast = prefs[second][secondLastIndex]
  lastChoices.push(secondLast)

  return getRotation(secondLast, prefs, secondChoices, lastChoices)
}

function removeRotation(secondChoices, lastChoices, prefs) {
  let i = lastChoices.indexOf(lastChoices[lastChoices.length - 1])

  for (i++; i < lastChoices.length; i++) {
    rejectSymmetrically(secondChoices[i-1], lastChoices[i], prefs)
  }
}

function thirdPhase(prefs) {
  let i = 0

  while (i < prefs.length) {
    if (prefs[i].length === 1) {
      i++
    } else {
      const { secondChoices, lastChoices } = getRotation(i, prefs, [], [i])

      // no stable matching exists
      if (secondChoices === null || lastChoices === null) {
        return null
      }

      removeRotation(secondChoices, lastChoices, prefs)

      // if any list becomes empty, return null (no stable matching exists)
      if (prefs.some(p => p.length === 0)) {
        return null
      }
      i = 0
    }
  }

  return prefs
}

/**
 * Returns the matching list with the given preferences, or null if no stable
 * matching exists.
 *
 * @param {Array.<Array>} preferences
 */
function computeMatches(preferences) {
  let { prefs, accepts } = firstPhase(preferences)
  prefs = secondPhase(prefs, accepts)
  return thirdPhase(prefs)
}

module.exports = {
  computeMatches
}