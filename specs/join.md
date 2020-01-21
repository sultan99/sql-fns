# Join
Function has required parameter table name

| Description    | Type              | Default |
|----------------|-------------------|---------|
| sql table name | string! or table! |         |

It has chain function `on`.

```js
import {join, table} from 'sql-fns'

const post = table(`post`, `p`)
const author = table(`author`, `a`)

const findPosts = query(
  from(`post`),
  join(author).on(author.id, post.authorId)
)

const posts = await findPosts(p)

// SELECT * FROM "post" p JOIN "author" a ON a.id = p.author_id LIMIT 50

```

### Currying table joins

```js
const tag = table(`tag`)
const author = table(`author`)

export const joinAuthor = join(author).on(author.id, R.prop(`authorId`))
export const joinTag = join(tag)

// In some other file
import {joinAuthor, joinTag} from './db/models'

const findPost = query(
  table(post),
  joinAuthor,
  joinTag.on(R.prop(`id`), post.tagId)
)

const findComments = query(
  table(comment),
  joinAuthor,
  joinTag.on(R.prop(`id`), comment.tagId)
)
```