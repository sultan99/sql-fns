# sql-fns
Yet another SQL builder for Node.js.

At this moment just blue-prints of api. Implementation would be later, the final aim is to make "ORM" base on this SQL builder with the same FP approach.

Features:
 - less verbose & human readable syntax
 - curried & composable functions
 - compatible with fp libraries like [ramda](https://github.com/ramda/ramda), [lodash/fp](https://github.com/lodash/lodash/wiki/FP-Guide)

### Templates
Dead simple just use plain text to build SQL:

```js
import {sql} from 'sql-fns'

const findUserByName = name => sql`
  SELECT * FROM "user"
   WHERE name = '${name}'
   LIMIT 1
`

const bob = await findUserByName(`Bob`)

// SELECT * FROM "user" WHERE name = 'Bob' LIMIT 1
```

### Query function
Plain text is ok in some cases, but much better to use functions to build more reusable queries.
```js
import {query, select, from, limit, gt} from 'sql-fns'

const findUser = query(
  select(`*`),
  from(`user`),
  limit(1)
)

const bob = await findUser({name: `Bob`})
const pal = await findUser({isCrazy: `yes`, age: gt(21)})

// SELECT * FROM "user" WHERE name = 'Bob' LIMIT 1
// SELECT * FROM "user" WHERE is_crazy = 'yes' AND age > 21 LIMIT 1

/* middleware applied to convert camelCase to snake_case */
```

### Recomposing existing query
Here we reuse the existing `findUser` query by adding new conditions and rewriting limit to a new value.
```js
import {where, like} from 'sql-fns'

const findBrides = findUser(user => [
  where(
    user.age.between(18, 24),
    user.gender.equals(`female`),
  ),
  limit(100),
])

const brides = await findBrides({bio: like(`%sexy%`)})

// SELECT * FROM "user"
//  WHERE age BETWEEN 18 AND 24
//    AND gender = 'female'
//    AND bio like '%sexy%'
//  LIMIT 100
```

### Join and rule
Alias and table join

```js
import {table, join} from 'sql-fns'

const country = table(`country`, `c`)
const {code: countryCode} = country

const findTeenagers = findUser(user => [
  join(country).on(user.countryId, country.id),
  limit(100),
])

// for where clause we can pass json or function
const users = await findTeenagers(({age}) => [
  age.between(10, 19),
  countryCode.equals(`LU`),
])

// SELECT * FROM "user" u
//   JOIN "country" c ON u.country_id = c.id
//  WHERE u.age BETWEEN 10 AND 19
//    AND c.code = 'LU'
//  LIMIT 100
```

### Mutations
Insert one ore more records.
```js
import {insert} from 'sql-fns'

const createUsers = insert(`user`)

const id = await createUsers({name: `Bob`, age: 13})

const ids = await createUsers([
  {name: `Foo`, age: 12},
  {name: `Bar`, age: 34},
])
```

Update records
```js
import {update, lt} from 'sql-fns'

const updateUsers = update(`user`)

await updateUsers(
  set({status: `banned`}),
  where({age: lt(18)}),
)
```

All mutation functions are extendable similar to queries.
```js
const banUsers = updateUsers(user =>
  user.role.not(`admin`),
)

await banUsers()

// UPDATE "user" SET status = 'banned' WHERE age < 18 AND role <> 'admin';
```

## To be continued ...
You are welcome to [follow](https://github.com/sultan99/sql-fns/stargazers) or [join](https://github.com/sultan99/sql-fns/network/members) the project.