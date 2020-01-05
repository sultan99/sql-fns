const R = require(`ramda`)
const {SELECT} = require(`./types`)
const {call, createFunction, isArray} = require(`./utils`)

const toSelect = R.pipe(
  R.when(
    R.pipe(R.head, isArray),
    R.head,
  ),
  R.filter(Boolean),
  R.map(call),
  R.join(`, `),
  R.concat(`SELECT `),
)

const select = createFunction(SELECT)(
  R.ifElse(
    R.propEq(`length`, 0),
    R.always(`SELECT *`),
    toSelect,
  ),
)

module.exports = select