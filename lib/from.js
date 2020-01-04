const type = require(`./types`)

const strOnly = value => (
  typeof value === `string`
)

function quote(value) {
  const str = value.trim()
  return str.match(/\s/) ? str : `"${str}"`
}

function from(...args) {
  const builder = () => {
    if (!args.length) {
      throw new Error(`Missing "from" function parameters`)
    }

    const tables = args.filter(strOnly).map(quote).join(`, `)
    return `FROM ${tables}`
  }

  builder.type = type.FROM
  return builder
}

module.exports = from