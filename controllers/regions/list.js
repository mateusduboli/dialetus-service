const dialects = require('../../dialects')

module.exports = (req, res) => {
  const regions = Object.entries(dialects.byRegion).map(
    ([name, dialectBySlug]) => {
      return {
        name,
        total: Object.keys(dialectBySlug).length,
      }
    }
  )

  res.json(regions)
}
