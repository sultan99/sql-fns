const type = require(`./types`)

function limit(value = 50) {
  const setLimit = () => `LIMIT ${value}`
  setLimit.type = type.LIMIT

  return setLimit
}

module.exports = limit