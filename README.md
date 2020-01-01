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
import {alias, query, where, like} from 'sql-fns'

const {age, gender} = alias()

const findBrides = query(
  findUser,
  where(
    age.between(18, 24),
    gender.equals(`female`),
  ),
  limit(100)
)

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
import {alias, query, join} from 'sql-fns'

const [c, u] = alias(`cnt`, `usr`)
const {code: countyCode} = c
const {age} = u

const findTeenagers = query(
  findUser(u),
  join(`country`, c).on(u.countryId, c.id),
  limit(100)
)

// we can pass json or functions of alias
const users = await findTeenagers(
  age.between(10, 19),
  countyCode.equals(`LU`),
)

// SELECT * FROM "user" usr
//   JOIN "country" cnt ON usr.country_id = cnt.id
//  WHERE usr.age BETWEEN 10 AND 19
//    AND cnt.code = 'LU'
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
import {mutation, not} from 'sql-fns'

const banUsers = mutation(
  updateUsers,
  where({role: not(`admin`)}),
)

await banUsers()

// UPDATE "user" SET status = 'banned' WHERE age < 18 AND role <> 'admin';
```

## To be continued ...
You are welcome to [follow](https://github.com/sultan99/sql-fns/stargazers) or [join](https://github.com/sultan99/sql-fns/network/members) the project.