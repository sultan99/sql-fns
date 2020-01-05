const {from} = require(`../index`)
const {table} = require(`../index`)

describe(`From tests in PG dialect`, () => {
  it(`throws error if no param is passed`, () => {
    expect(from).toThrow(Error)
  })

  it(`creates "from" clause by passed string type`, () => {
    const input = from(`user`)
    const result = `FROM "user"`

    expect(input()).toBe(result)
  })

  it(`creates "from" clause by passed query type`, () => {
    const input = from(`(SELECT * FROM admin)`)
    const result = `FROM (SELECT * FROM admin)`

    expect(input()).toBe(result)
  })

  it(`creates "from" clause by passed table type`, () => {
    const product = table(`product`, `p`)
    const input = from(product)
    const result = `FROM "product" p`

    expect(input()).toBe(result)
  })
})
