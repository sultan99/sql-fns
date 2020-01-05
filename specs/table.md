# Table

| Description    | Type    | Default |
|----------------|---------|---------|
| SQL table name | string! |         |
| table alias    | string  |         |


```js
import {table} from 'sql-fns'

const user = table(`user`)

const findUsers = query(
  select(user.id.as(`no`), user.name),
  from(user),
  limit(50),
)

// SELECT u.id as no, u.name FROM "user" u LIMIT 50;
```

```js
import {table} from 'sql-fns'

const u = table(`user`)
const c = table(`country`)

const findUsers = query(
  select(u, c),
  from(u),
  join(c).on(u.countryId, c.id),
  limit(50),
)

// SELECT u.*, c.* 
//   FROM "user" u
//   JOIN "country" c ON u.countryId = c.id
//  LIMIT 50;
```

```js
import {table} from 'sql-fns'

const user = table(`user`, `a`)
const country = table(`country`, `b`)
const {code: countryCode} = country
const {name: userName} = user

const findUsers = query(
  select(user, country),
  from(user),
  where(
    code.equals(`US`),
    userName.like(`%ramp`),
  )
)

// SELECT a.*, b.* 
//   FROM "user" a
//   JOIN "country" b ON a.countryId = b.id
//  WHERE b.code = 'US'
//    AND a.name like '%ramp'
//  LIMIT 50;
```
