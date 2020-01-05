const R = require(`ramda`)
const {exec} = require(`./pg-pool`)
const {query, select, from, table, where, limit} = require(`../lib`)

const user = table(`user`, `u`)

const queryUser = query(
  select(user.name, user.email),
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
  console.log(users)
}

playground()