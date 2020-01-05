const R = require(`ramda`)
const from = require(`./from`)
const limit = require(`./limit`)
const select = require(`./select`)
const {SELECT, FROM, ORDERBY, LIMIT, QUERY} = require(`./types`)
const {createFunction, throwError} = require(`./utils`)
const {isSelect, isFrom} = require(`./utils`)
const {isTable, isLimit, isString} = require(`./utils`)

const order = [
  SELECT,
  FROM,
  ORDERBY,
  LIMIT,
]

const checkParams = R.when(
  R.propEq(`length`, 0),
  throwError(`Missing query parameters`),
)

const sort = (a, b) => (
  order.indexOf(a.type) - order.indexOf(b.type)
)

const toTable = fn => (
  isTable(fn) ? from(fn) : fn()
)

const addSelect = R.when(
  R.none(isSelect),
  R.append(select()),
)

const addFrom = R.when(
  R.propEq(`length`, 1),
  R.when(
    R.any(R.either(isString, isTable)),
    R.over(R.lensIndex(0), from),
  ),
)

const addLimit = R.when(
  R.allPass([R.none(isLimit), R.any(isFrom)]),
  R.append(limit()),
)

const query = createFunction(QUERY)(
  checkParams,
  addFrom,
  addSelect,
  addLimit,
  R.sort(sort),
  R.map(toTable),
  R.join(` `),
  R.concat(R.__, `;`),
)

module.exports = query