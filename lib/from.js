const R = require(`ramda`)
const {FROM} = require(`./types`)
const {call, createFunction, throwError} = require(`./utils`)
const {isString, isTable} = require(`./utils`)

const quote = R.pipe(
  R.trim,
  R.unless(
    R.test(/\s/),
    str => `"${str}"`,
  ),
)

const tableToStr = R.pipe(
  call,
  R.over(R.lensIndex(0), quote),
  R.filter(Boolean),
  R.join(` `),
)

const toString = R.pipe(
  R.when(isString, quote),
  R.when(isTable, tableToStr),
)

const checkParams = R.when(
  R.propEq(`length`, 0),
  throwError(`Missing "from" function parameters`),
)

const from = createFunction(FROM)(
  checkParams,
  R.map(toString),
  R.join(`, `),
  R.concat(`FROM `),
)

module.exports = from
