const {from} = require(`../index`)
const {query} = require(`../index`)
const {select} = require(`../index`)

describe(`Query tests`, () => {
  it(`throws error if no param is passed`, () => {
    const input = query()

    expect(input).toThrow(Error)
  })

  it(`creates query from table name`, () => {
    const input = query(`users`)
    const result = `SELECT * FROM "users" LIMIT 50;`

    expect(input()).toBe(result)
  })

  it(`creates query using select`, () => {
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
})
