const R = require(`ramda`)
const {LIMIT} = require(`./types`)

module.exports = (value = 50) => {
  const limit = R.always(`LIMIT ${value}`)
  limit.type = LIMIT

  return limit
}
