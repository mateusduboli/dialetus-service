const dialectHelper = require('../../helpers/dialect')

const search = (req, res) => {
  const dialects = dialectHelper.search(req.query.q)
  console.log('result', dialects)
  if (Object.keys(dialects).length !== 0) {
    return res.json(dialects)
  }
  return res.status(404).send({ error: 'Not found!' })
}

module.exports = search
