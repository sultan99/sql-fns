# Select

| Parameter | type     | default | Description          | Result            |
|-----------|----------|:-------:|----------------------|-------------------|
| anonymous | string   |         | sql select statement | function → string |
| anonymous | [string] |   "*"   | list of columns      | function → string |


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