const chai = require('chai')
const app = require('../../server')

describe('Integration: Dialect Search endpoint', () => {
  let server
  const expectedResponse = {
    gauches: [
      {
        slug: 'baita',
        dialect: 'Baita',
        region: 'gauches',
        meanings: ['Grande', 'Imenso'],
        examples: ['Bah tchê, que baita de um problema tu arranjaste?!'],
      },
    ],
    paranes: [
      {
        slug: 'baita',
        dialect: 'Baita',
        region: 'paranes',
        meanings: ['grande', 'enorme', 'de grandes proporções'],
        examples: ['Mas que baita susto tu me deu'],
      },
    ],
  }

  before(() => {
    server = app.listen()
  })

  after(() => server.close())

  it('GET `/search?q=baita` should return all available dialects', async () => {
    const res = await chai
      .request(server)
      .get('/search?q=baita')
      .redirects(0)

    expect(res).to.have.status(200)
    expect(res.body).to.eql(expectedResponse)
  })
})
