const {QUERY} = require(`../types`)
const {from, query, select, table, limit} = require(`../index`)

describe(`Query tests`, () => {
  it(`should have type query`, () => {
    expect(query(`table`).type).toBe(QUERY)
  })

  it(`throws error if no param is passed`, () => {
    expect(query).toThrow(Error)
  })

  it(`creates query with string`, () => {
    const input = query(`user`)
    const result = `SELECT * FROM "user" LIMIT 50;`

    expect(input()).toBe(result)
  })

  it(`creates query with table type`, () => {
    const user = table(`user`)
    const input = query(user)
    const result = `SELECT * FROM "user" LIMIT 50;`

    expect(input()).toBe(result)
  })

  it(`creates query using select function`, () => {
    const input = query(select(`now()`))
    const result = `SELECT now();`

    expect(input()).toBe(result)
  })

  it(`creates query using from`, () => {
    const input = query(from(`posts`))
    const result = `SELECT * FROM "posts" LIMIT 50;`

    expect(input()).toBe(result)
  })

  it(`creates query using from & select`, () => {
    const input = query(
      from(`posts`),
      select(`id`),
    )
    const result = `SELECT id FROM "posts" LIMIT 50;`

    expect(input()).toBe(result)
  })

  it(`creates query using from & limit`, () => {
    const input = query(
      from(`posts`),
      limit(),
    )
    const result = `SELECT * FROM "posts" LIMIT 50;`

    expect(input()).toBe(result)
  })
})
