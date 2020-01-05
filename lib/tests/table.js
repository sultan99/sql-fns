const {TABLE} = require(`../types`)
const {table} = require(`../index`)

describe(`Table tests`, () => {
  test(`instance should have type table`, () => {
    const user = table(`user`)

    expect(user.type).toBe(TABLE)
  })

  it(`creates "table" clause with single parameter`, () => {
    const user = table(`user`)

    expect(user.id()).toBe(`id`)
  })

  it(`creates "table" clause with alias`, () => {
    const user = table(`user`, `u`)

    expect(user.id()).toBe(`u.id`)
  })

  it(`should return table name & alias`, () => {
    const user = table(`user`, `u`)
    const [tableName, tableAlias] = user()

    expect(tableName).toBe(`user`)
    expect(tableAlias).toBe(`u`)
  })

  test(`column with "as" function`, () => {
    const post = table(`post`, `p`)
    const {title} = post

    expect(title.as(`caption`)()).toBe(`p.title AS caption`)
    expect(post.createdAt.as(`created`)()).toBe(`p.createdAt AS created`)
  })

  test(`column with "equals" function`, () => {
    const {id, code} = table(`user`, `u`)

    expect(id.equals(123)()).toBe(`u.id = 123`)
    expect(code.equals(`UK`)()).toBe(`u.code = 'UK'`)
  })

  it(`column with "like" function`, () => {
    const {sku} = table(`product`)

    expect(sku.like(`KS944%`)()).toBe(`sku LIKE 'KS944%'`)
  })
})
