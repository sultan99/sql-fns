const from = require(`./from`)
const limit = require(`./limit`)
const select = require(`./select`)
const type = require(`./types`)
const {isFunction, isSelect} = require(`./utils`)

// clause -> sql query clauses, etc. select, from, order by...
const clauseOrder = [
  type.SELECT,
  type.FROM,
  type.ORDERBY,
  type.LIMIT,
]

const firstOnly = clauseType => (clause, index, list) => {
  const isType = value => value.type === clauseType

  return isType(clause) ? index === list.findIndex(isType) : true
}

const sortClauses = (a, b) => (
  clauseOrder.indexOf(a.type) - clauseOrder.indexOf(b.type)
)

module.exports = (...args) => {
  if (!args.length) {
    throw new Error(`Missing query parameters`)
  }

  const query = () => {
    const singleSelect = args.length === 1 && isSelect(args[0])
    const defaultExps = singleSelect ? [] : [select(), from(args[0]), limit()]

    return args
      .concat(defaultExps)
      .filter(isFunction)
      .filter(firstOnly(type.SELECT))
      .filter(firstOnly(type.FROM))
      .filter(firstOnly(type.LIMIT))
      .sort(sortClauses)
      .map(fn => fn())
      .join(` `)
      .concat(`;`)
  }
  query.type = type.QUERY

  return query
}
