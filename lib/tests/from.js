const {from} = require(`../index`)

describe(`From tests in PG dialect`, () => {
  it(`throws error if no param is passed`, () => {
    const input = from()

    expect(input).toThrow(Error)
  })

  it(`creates "from" expression by passed value`, () => {
    const input = from(`user`)
    const result = `FROM "user"`

    expect(input()).toBe(result)
  })

  it(`creates "from" expression from sub-query`, () => {
    const input = from(`(SELECT * FROM admin)`)
    const result = `FROM (SELECT * FROM admin)`

    expect(input()).toBe(result)
  })
})
