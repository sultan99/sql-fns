const type = require(`./types`)

module.exports = (value = 50) => {
  const limit = () => `LIMIT ${value}`
  limit.type = type.LIMIT

  return limit
}
