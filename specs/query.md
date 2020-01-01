# Query
Function has mandatory input `from('table_name')` or `'name of table'`.

It returns function -> Promise
| Parameter        | type      |       default        | Description          |
|------------------|-----------|:--------------------:|----------------------|
| anonymous        | string    |                      | name of table        |
| query functions* | functions | select(*), limit(50) | sql-fns functions    |
| sub queries      | query     |                      | other query function |


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
