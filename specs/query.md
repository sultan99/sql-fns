# Query
Function has required parameter table name and returns function -> Promise

| Description              | Type                 | Default              |
|--------------------------|----------------------|----------------------|
| sql table name           | string! or function! |                      |
| sql-fns functions        | functions            | select(*), limit(50) |
| other sub query function | query                |                      |


Query functions:

select, except, alias, from, where, limit, joins, orderBy, groupBy, having
union


```js
import {query} from 'sql-fns'

const findPosts = query(`post`)

const posts = await findPosts()

// SELECT * FROM "post" LIMIT 50


const findUsers = query(
  from(`user`)
)

const users = findUser()

// SELECT * FROM "user" LIMIT 50

const findTeam = query(
  select(`*`),
  from(`team`),
  where({name: `Barcelona`}),
  limit(1)
)

const barcelona = await findTeam()

// SELECT * FROM "team" WHERE name = 'Barcelona' LIMIT 1
```
