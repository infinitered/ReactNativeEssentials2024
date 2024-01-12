const StyleDictionary = require('style-dictionary')
const camelCase = require('camelCase')
const deepmerge = require('deepmerge')
const figmaVariables = require('./shared/theme/tokens/figmaVariables.json')

StyleDictionary.registerTransform({
  type: `name`,
  name: `name/ti/camel/strip`,
  transformer: (token, platform) => {
    const blacklistedPathSegments = (platform.options ?? {}).stripFromPath ?? []

    const whitelistedPathSegments = token.path.filter(
      path => !blacklistedPathSegments.includes(path),
    )

    return camelCase(whitelistedPathSegments)
  },
})

const figmaVariablesCollectionNames = Object.keys(figmaVariables)

function addCollectionNameToToken(tokens, collectionName) {
  if (typeof tokens === 'object' && tokens.type) {
    tokens.extensions = {
      ...tokens.extensions,
      ['ReactNativeEssentials']: { collectionName },
    }
  } else {
    Object.keys(tokens).forEach(k => {
      addCollectionNameToToken(tokens[k], collectionName)
    })
  }
}

// strip collection name from collections record and add it to the extensions attr instead
const figmaVariablesCollections = Object.entries(figmaVariables).map(
  ([collectionName, collection]) => {
    const collectionNamesWithSuffix = figmaVariablesCollectionNames.map(
      n => `${n}.`,
    )

    const regexp = new RegExp(collectionNamesWithSuffix.join('|'), 'g')

    const collectionJson = JSON.stringify(collection).replace(regexp, '')

    const parsedCollection = JSON.parse(collectionJson)

    addCollectionNameToToken(parsedCollection, collectionName)

    return parsedCollection
  },
)

const designTokens = deepmerge.all(Object.values(figmaVariablesCollections))

function isSemanticToken(token) {
  return (
    token.original.extensions.ReactNativeEssentials.collectionName ===
    'semantics'
  )
}

/**
 * Generates a file configuration object for design tokens.
 *
 * @param {Object} params - The parameters for file configuration.
 * @param {'color' | 'size'} params.category - The category of the token.
 * @param {'background' | 'border' | 'text' | 'tint' | 'spacing' | 'radius'} params.type - The type of the token.
 * @param {function} params.tokenPredicateFn - A function that takes a token and returns a boolean indicating whether the token should be included.
 * @param {string} params.fileName - The name of the file to which the tokens will be written.
 * @returns {Object} An object containing the format, destination, and filter function for the design tokens.
 */
function createFileConfig({ category, type, tokenPredicateFn, fileName }) {
  return {
    format: 'javascript/es6',
    destination: fileName,
    filter: token =>
      (category ? token.attributes.category === category : true) &&
      (type ? token.attributes.type === type : true) &&
      (tokenPredicateFn ? tokenPredicateFn(token) : true),
  }
}

module.exports = {
  tokens: designTokens,
  platforms: {
    'color: semantics': {
      transforms: ['attribute/cti', 'name/ti/camel/strip', 'color/hex8'],
      buildPath: './shared/theme/tokens/',
      options: {
        stripFromPath: ['color', 'background', 'tint', 'text', 'border'],
      },
      files: [
        createFileConfig({
          category: 'color',
          type: 'background',
          tokenPredicateFn: isSemanticToken,
          fileName: 'colorBackgroundSemantics.ts',
        }),
        createFileConfig({
          category: 'color',
          type: 'tint',
          tokenPredicateFn: isSemanticToken,
          fileName: 'colorTintSemantics.ts',
        }),
        createFileConfig({
          category: 'color',
          type: 'text',
          tokenPredicateFn: isSemanticToken,
          fileName: 'colorTextSemantics.ts',
        }),
        createFileConfig({
          category: 'color',
          type: 'border',
          tokenPredicateFn: isSemanticToken,
          fileName: 'colorBorderSemantics.ts',
        }),
      ],
    },
    'size: semantics': {
      transforms: ['attribute/cti', 'name/ti/camel/strip'],
      buildPath: './shared/theme/tokens/',
      options: { stripFromPath: ['size', 'spacing', 'radius', 'border'] },
      files: [
        createFileConfig({
          category: 'size',
          type: 'spacing',
          tokenPredicateFn: isSemanticToken,
          fileName: 'sizeSpacingSemantics.ts',
        }),
        createFileConfig({
          category: 'size',
          type: 'radius',
          tokenPredicateFn: isSemanticToken,
          fileName: 'sizeRadiusSemantics.ts',
        }),
        createFileConfig({
          category: 'size',
          type: 'border',
          tokenPredicateFn: isSemanticToken,
          fileName: 'sizeBorderSemantics.ts',
        }),
      ],
    },
  },
}
