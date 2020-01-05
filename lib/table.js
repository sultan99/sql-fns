const R = require(`ramda`)
const {TABLE} = require(`./types`)
const {isString, createHandler} = require(`./utils`)

const quote = R.when(
  isString,
  str => `'${str}'`,
)

const toColumn = alias => column => {
  const aliasCol = [alias, column].filter(Boolean).join(`.`)
  const toString = R.always(aliasCol)
  toString.type = TABLE
  toString.as = id => R.always(`${aliasCol} AS ${id}`)
  toString.equals = value => R.always(`${aliasCol} = ${quote(value)}`)
  toString.like = value => R.always(`${aliasCol} LIKE ${quote(value)}`)

  return toString
}

module.exports = (name, alias) => {
  const table = R.always([name, alias])
  const handler = createHandler(
    R.ifElse(
      R.equals(`type`),
      R.always(TABLE),
      toColumn(alias),
    ),
  )

  table.type = TABLE

  return new Proxy(table, handler)
}