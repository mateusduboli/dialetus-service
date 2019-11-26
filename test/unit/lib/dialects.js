const path = require('path')

describe('dialects', () => {
  describe('findDialectFiles', () => {
    it('finds dialect files', () => {
      const dialects = require('../../../dialects')
      const dialectFiles = dialects.findDialectFiles(dialects.PATTERN_DIALECTS)

      expect(dialectFiles).to.not.be.empty // eslint-disable-line no-unused-expressions
    })
    it('returns empty when looking into the wrong path', () => {
      const dialects = require('../../../dialects')
      const dialectFiles = dialects.findDialectFiles('wrong-path')

      expect(dialectFiles).to.be.empty // eslint-disable-line no-unused-expressions
    })
  })
  describe('loadDialects', () => {
    it('should load a given dialect', () => {
      const dialects = require('../../../dialects')
      const filePath = path.join(__dirname, '../../../dialects/piauies.json')

      const actual = dialects.loadDialect(filePath)
      expect(actual).to.be.an('array')
    })
    it('should raise when failed to load dialect', () => {
      const dialects = require('../../../dialects')

      expect(dialects.loadDialect.bind('non-existing-dialect')).to.throw()
    })
  })
  describe('buildIndexes', () => {
    describe('should create 2 indexes based on dialects as input', () => {
      const indexes = {
        regionBySlug: {},
        byRegion: {},
      }

      const dialectList = [
        {
          slug: 'dialect1',
          region: 'region1',
        },
        {
          slug: 'dialect3',
          region: 'region2',
        },
        {
          slug: 'dialect2',
          region: 'region1',
        },
      ]

      const dialects = require('../../../dialects')

      const results = dialectList.reduce(dialects.buildIndexes, indexes)

      console.debug(results)
      console.debug(Object.keys(dialects.byRegion))
    })
  })
})
