# Where
Function has required parameter table name

| Description    | Type              | Default |
|----------------|-------------------|---------|
| sql table name | string! or table! |         |



```js
import {where} from 'sql-fns'

const findPost = query(
  table(post),
  where(
    post.id = 1324,
    post.isPublished.equals(true),
  )
)

const posts = await findPost({title: equals(`Hot news`)})
```

### Function instead of `where`
```js
const findPosts = query(`post`)

const posts = await findPosts(post => [
  post.tag.in([`js`, `ts`]), // can be post.tag.in(`js`, `ts`)
  post.tag.equals([`js`, `ts`]), // can be post.tag.equals(`js`, `ts`)
  post.age.between(18, 35),
  post.title.like(`%tutorial%`),
  or(
    post.id.is(null),
    post.id.isNot(null),
    post.id.notIn(`js`, `ts`),
    post.id.ne(`js`, `ts`), // shorten ne == notEquals -> <>
    post.id.eq(1), // shorten eq == equals -> =
    post.id.gt(1), // shorten gt == greaterThan -> >
    post.id.ge(1), // shorten ge == greaterOrEqual -> >=
    post.id.lt(1), // shorten lt == lessThan -> <
    post.id.le(1), // shorten le == lessOrEqual -> <=
  )
])
```

