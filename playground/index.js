const R = require(`ramda`)
const {exec} = require(`./pg-pool`)
const {query, select, from, table, limit} = require(`../lib`)

const user = table(`user`, `u`)
const {id: code, name, email} = user

const queryUser = query(
  select(code, name, email.as(`login`)),
  from(user),
  limit(3),
)

// The query will include exec function inside soon
const findUsers = R.pipe(
  queryUser,
  exec,
)

async function playground() {
  const users = await findUsers()

  console.info(queryUser())
  console.info(users)
}

playground()