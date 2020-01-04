const from = require(`./from`)
const limit = require(`./limit`)
const select = require(`./select`)
const type = require(`./types`)

// exp -> sql expressions, etc. select, from, order by...
const expsOrders = [
  type.SELECT,
  type.FROM,
  type.ORDERBY,
  type.LIMIT,
]

const functionOnly = arg => typeof arg === `function`

const firstOnly = expType => (exp, index, list) => (
  exp.type === expType ? index === list.findIndex(v => v.type === expType) : true
)

const sortExps = (a, b) => (
  expsOrders.indexOf(a.type) - expsOrders.indexOf(b.type)
)

function query(...args) {
  const builder = () => {
    if (!args.length) {
      throw new Error(`Missing query parameters`)
    }

    const singleSelect = args.length === 1 && args[0].type === type.SELECT
    const defaultExps = singleSelect ? [] : [select(), from(args[0]), limit()]

    return args
      .concat(defaultExps)
      .filter(functionOnly)
      .filter(firstOnly(type.SELECT))
      .filter(firstOnly(type.FROM))
      .filter(firstOnly(type.LIMIT))
      .sort(sortExps)
      .map(fn => fn())
      .join(` `)
      .concat(`;`)
  }

  builder.type = type.QUERY
  return builder
}

module.exports = query