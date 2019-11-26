const path = require('path')
const glob = require('glob')

const { flatMap } = require('../helpers/polyfill')
const { slugifyDialect } = require('../helpers/string')

const PATTERN_DIALECTS = path.join(__dirname, '/*.json')

const findDialectFiles = pathPattern => {
  return glob.sync(pathPattern)
}

const loadDialect = filePath => {
  const region = path.basename(filePath, '.json')
  const loadedDialects = require(filePath)
  return loadedDialects.map(loadedDialect => {
    return {
      ...loadedDialect,
      region,
      slug: slugifyDialect(loadedDialect.dialect),
    }
  })
}

const buildIndexes = (indexes, dialect) => {
  const regionsWithSlug = indexes.regionBySlug[dialect.slug] || []
  regionsWithSlug.push(dialect.region)
  indexes.regionBySlug[dialect.slug] = regionsWithSlug

  const dialectRegion = indexes.byRegion[dialect.region] || {}
  dialectRegion[dialect.slug] = dialect
  indexes.byRegion[dialect.region] = dialectRegion

  return indexes
}

const loadAllDialects = () =>
  findDialectFiles(PATTERN_DIALECTS)
    .map(loadDialect)
    .reduce(flatMap, [])
    .reduce(buildIndexes, {
      regionBySlug: {},
      byRegion: {},
    })

module.exports = Object.freeze({
  ...loadAllDialects(),
  loadDialect,
  buildIndexes,
  findDialectFiles,
  PATTERN_DIALECTS,
})
