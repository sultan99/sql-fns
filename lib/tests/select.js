const {select} = require(`../index`)

describe(`Select tests in PG dialect`, () => {
  it(`creates default select`, () => {
    const input = select()
    const result = `SELECT *`

    expect(input()).toBe(result)
  })

  it(`creates select from str`, () => {
    const input = select(`name || surname as fullname`)
    const result = `SELECT name || surname as fullname`

    expect(input()).toBe(result)
  })

  it(`creates select from listed cols`, () => {
    const input = select(`id`, `name`)
    const result = `SELECT id, name`

    expect(input()).toBe(result)
  })

  it(`creates select from array of cols`, () => {
    const input = select([`id`, `name`])
    const result = `SELECT id, name`

    expect(input()).toBe(result)
  })
})
