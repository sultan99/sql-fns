const {Pool} = require(`pg`)

const pool = new Pool({
  database: `playground`,
  host: `localhost`,
  user: `postgres`,
  password: `postgres`,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

async function exec(sql) {
  const client = await pool.connect()
  const res = await client.query(sql)
  client.release(true)
  return res.rows
}

async function execList(list) {
  const client = await pool.connect()
  const res = await Promise.all(
    list.map(sql => client.query(sql)),
  )
  client.release(true)
  return res.map(({rows}) => rows)
}

module.exports = {
  exec,
  execList,
}