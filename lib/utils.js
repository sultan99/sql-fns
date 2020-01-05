const type = require(`./types`)

const {isArray} = Array
const isFrom = value => value.type === type.FROM
const isFunction = value => typeof value === `function`
const isLimit = value => value.type === type.LIMIT
const isOrderBy = value => value.type === type.ORDERBY
const isQuery = value => value.type === type.QUERY
const isSelect = value => value.type === type.SELECT
const isString = value => typeof value === `string`
const isTable = value => value.type === type.TABLE

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
}
