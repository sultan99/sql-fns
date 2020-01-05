const type = require(`./types`)
const {isArray, isFunction} = require(`./utils`)

module.exports = (...args) => {
  const select = () => {
    if (!args.length) return `SELECT *`

    const cols = isArray(args[0]) ? args[0] : args
    const str = cols
      .filter(Boolean)
      .map(arg => isFunction(arg) ? arg() : arg)
      .join(`, `)

    return `SELECT ${str}`
  }
  select.type = type.SELECT

  return select
}
