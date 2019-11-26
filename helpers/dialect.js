const merge = require('deepmerge')
const dialects = require('../dialects')
const { slugifyDialect } = require('./string')
const { fromEntries } = require('./polyfill')

const find = (region, slugParam) => {
  const regionDialects = dialects.byRegion[region]
  if (regionDialects) {
    const dialect = regionDialects[slugParam]

    return dialect || null
  }

  return null
}

const getRegionAndSlugByVariation = variation => {
  const [region, name] = variation.split('.')

  return {
    region,
    slug: slugifyDialect(name),
  }
}

const mergeVariations = variations => {
  return variations
    .map(getRegionAndSlugByVariation)
    .reduce(
      (variations, variation) =>
        merge(variations, find(variation.region, variation.slug)),
      {}
    )
}

const get = (region, slugParam) => {
  const dialect = find(region, slugParam)

  if (!dialect) {
    return null
  }

  if (dialect.variations) {
    const variationsData = mergeVariations(dialect.variations)
    delete dialect.variations

    Object.entries(variationsData).forEach(([key, value]) => {
      if (!dialect[key]) {
        dialect[key] = value
      }
    })
  }

  return dialect
}

const getMultiple = (region, slugs) => {
  return slugs.map(slug => get(region, slug))
}

const search = word => {
  const searchTerm = slugifyDialect(word)
  const slugsByRegion = Object.entries(dialects.regionBySlug).reduce(
    (acc, [slug, regions]) => {
      if (!slug.includes(searchTerm)) return acc

      regions.forEach(region => {
        const resultSlugByRegion = acc[region] || []
        resultSlugByRegion.push(slug)
        acc[region] = resultSlugByRegion
      })

      return acc
    },
    {}
  )

  return Object.entries(slugsByRegion)
    .map(([region, slugs]) => [region, getMultiple(region, slugs)])
    .reduce(fromEntries, {})
}

module.exports = {
  get,
  find,
  search,
  getRegionAndSlugByVariation,
  mergeVariations,
}
