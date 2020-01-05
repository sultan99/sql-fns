# From

| Description     | Type           | Default |
|-----------------|----------------|---------|
| name of table   | string!        |         |
| table for table | table function |         |

```js
import {from} from 'sql-fns'

const findPosts = query(
  from(`post`)
)

const posts = await findPosts()

// SELECT * FROM "post" LIMIT 50

const findAuthors = query(
  select(`a.*`),
  from(`author a`),
  orderBy(`a.name`)
)

const authors = await findAuthors()

// SELECT a.* FROM "authors" a ORDER BY a.name LIMIT 50
```


### Example with table

```js
import {table} from 'sql-fns'

const u = table(`usr`)
const findUsers = query(
  from(`user`, u),
  orderBy(u.name)
)

const users = findUser()

// SELECT * FROM "user" usr ORDER BY usr.name LIMIT 50
```
