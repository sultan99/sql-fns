const R = require(`ramda`)
const {FROM, LIMIT, ORDERBY} = require(`./types`)
const {QUERY, SELECT, TABLE} = require(`./types`)

const hasType = R.propEq(`type`)
const isArray = R.is(Array)
const isFrom = hasType(FROM)
const isFunction = R.is(Function)
const isLimit = hasType(LIMIT)
const isOrderBy = hasType(ORDERBY)
const isQuery = hasType(QUERY)
const isSelect = hasType(SELECT)
const isString = R.is(String)
const isTable = hasType(TABLE)

const call = R.when(
  isFunction,
  fn => fn(),
)

const createFunction = type => (...fns) => R.pipe(
  (...args) => args,
  ...fns,
  result => {
    const fn = () => result
    fn.type = type
    return fn
  },
)

const createHandler = get => ({
  get: R.flip(get),
})

const throwError = message => () => {
  throw new Error(message)
}

module.exports = {
  isArray,
  isFrom,
  isFunction,
  isLimit,
  isOrderBy,
  isQuery,
  isSelect,
  isString,
  isTable,
  call,
  createFunction,
  createHandler,
  throwError,
}
