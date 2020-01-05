const {select, table} = require(`../index`)

describe(`Select tests in PG dialect`, () => {
  it(`creates default select`, () => {
    const input = select()
    const result = `SELECT *`

    expect(input()).toBe(result)
  })

  it(`creates select from string`, () => {
    const input = select(`name || surname as fullname`)
    const result = `SELECT name || surname as fullname`

    expect(input()).toBe(result)
  })

  it(`creates select from listed string`, () => {
    const input = select(`id`, `name`)
    const result = `SELECT id, name`

    expect(input()).toBe(result)
  })

  it(`creates select from array of strings`, () => {
    const input = select([`id`, `name`])
    const result = `SELECT id, name`

    expect(input()).toBe(result)
  })

  test(`select column with alias and "as" function`, () => {
    const {id, name} = table(`user`, `u`)
    const input = select(id.as(`no`), name)
    const result = `SELECT u.id AS no, u.name`

    expect(input()).toBe(result)
  })
})
