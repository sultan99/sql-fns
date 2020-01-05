const type = require(`./types`)
const {isString} = require(`./utils`)

const quote = value => (
  isString(value) ? `'${value}'` : value
)

const toColumn = (alias, column) => {
  const aliasCol = [alias, column].filter(Boolean).join(`.`)
  const toString = () => aliasCol
  toString.type = type.TABLE
  toString.as = id => () => `${aliasCol} AS ${id}`
  toString.equals = value => () => `${aliasCol} = ${quote(value)}`
  toString.like = value => () => `${aliasCol} LIKE ${quote(value)}`

  return toString
}

function table(name, alias) {
  const self = () => [name, alias]
  const handler = {
    get: (target, key) => (
      key === `type` ? self.type : toColumn(alias, key)
    ),
  }
  self.type = type.TABLE

  return new Proxy(self, handler)
}

module.exports = table