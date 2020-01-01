const {query} = require(`../index`)

describe(`Query tests`, () => {
  test(`Jest testing`, () => {
    const input = query()
    const result = `query`

    expect(input).toBe(result)
  })
})
