const seedrandom = require('seedrandom');

function seed(value) {
  seedrandom(value, { global: true })
}

const isNotIn = (toExlude) => (element) => {
  return toExlude.every(e => e !== element)
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fillWithRandom(prefs) {
  const all = [ ...Array(prefs.length).keys() ]
  return prefs.map((ps, i) => {
    const filtered  = all.filter(isNotIn(ps.concat(i)))
    return ps.concat(shuffle(filtered))
  })
}

module.exports = {
  seed,
  fillWithRandom
}