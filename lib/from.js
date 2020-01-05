const type = require(`./types`)
const {isString, isTable} = require(`./utils`)

function quote(value) {
  const str = value.trim()
  return str.match(/\s/) ? str : `"${str}"`
}

function toString(arg) {
  if (isString(arg)) {
    return quote(arg)
  }

  if (arg && isTable(arg)) {
    const [table, alias] = arg()
    return `${quote(table)} ${alias}`
  }

  throw new Error(`Wrong "from" parameter type`)
}

module.exports = (...args) => {
  if (!args.length) {
    throw new Error(`Missing "from" function parameters`)
  }

  const from = () => {
    const tables = args
      .map(toString)
      .join(`, `)

    return `FROM ${tables}`
  }
  from.type = type.FROM

  return from
}
