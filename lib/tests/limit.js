const {limit} = require(`../index`)

describe(`Limit tests in PG dialect`, () => {
  it(`creates default limit`, () => {
    const input = limit()
    const result = `LIMIT 50`

    expect(input()).toBe(result)
  })

  it(`creates limit by passed integer value`, () => {
    const input = limit(1)
    const result = `LIMIT 1`

    expect(input()).toBe(result)
  })
})
