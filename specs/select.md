# Select

| Description          | Type     | Default |
|----------------------|----------|---------|
| sql select statement | string   |         |
| list of columns      | [string] | "*"     |


```js
import {select} from 'sql-fns'

select()
select(`*`)
select(`name || surname as fullname`) // no way to apply alias later
select(`id`, `name`)
select([`id`, `name`])
```

🧬 Not sure to chain select
```js
import {select, except} from 'sql-fns'

select(`*`).except(`password`)
select(`*`).except(`email`, `password`)
select(`*`).except([`email`, `password`])
```

🧬 Is except good name?
```js
import {except} from 'sql-fns'

const findUsers = query(
  except(`email`, `password`),
  from(`user`),
)
```