const type = require(`./types`)

function select(...args) {
  const builder = () => {
    if (!args.length) return `SELECT *`

    const cols = Array.isArray(args[0]) ? args[0] : args
    const str = cols.filter(arg => typeof arg === `string`).join(`, `)
    return `SELECT ${str}`
  }

  builder.type = type.SELECT
  return builder
}

module.exports = select