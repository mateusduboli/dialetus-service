//  Present in node.js 11.00
const flatMap = (acc, element) => {
  const accDefault = acc || []
  if (Array.isArray(element)) {
    return accDefault.concat(element)
  }
  accDefault.push(element)
  return accDefault
}

// Present in node.js 12.00
const fromEntries = (acc, entry) => {
  const accDefault = acc || {}
  const [key, value] = entry
  accDefault[key] = value
  return accDefault
}

module.exports = {
  flatMap,
  fromEntries,
}
