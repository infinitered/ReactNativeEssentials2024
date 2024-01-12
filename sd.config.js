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
      ['ReactNativeEssentials']: {collectionName},
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

function isPrimitiveToken(token) {
  return (
    token.original.extensions.ReactNativeEssentials.collectionName ===
    'primitives'
  )
}

function isSemanticToken(token) {
  return (
    token.original.extensions.ReactNativeEssentials.collectionName ===
    'semantics'
  )
}

function isFunctionalToken(token) {
  return (
    token.original.extensions.ReactNativeEssentials.collectionName === 'tokens'
  )
}

module.exports = {
  tokens: designTokens,
  platforms: {
    'color: primitives & tokens': {
      transforms: ['attribute/cti', 'name/ti/camel/strip', 'color/hex8'],
      buildPath: './shared/theme/tokens/',
      options: {stripFromPath: ['color']},
      files: [
        {
          format: 'javascript/es6',
          destination: 'colorPrimitives.ts',
          filter: token => token.type === 'color' && isPrimitiveToken(token),
        },
        {
          format: 'javascript/es6',
          destination: 'colorTokens.ts',
          filter: token => token.type === 'color' && isFunctionalToken(token),
        },
      ],
    },
    'size: primitives & tokens': {
      transforms: ['attribute/cti', 'name/ti/camel/strip'],
      buildPath: './shared/theme/tokens/',
      options: {stripFromPath: ['size']},
      files: [
        {
          format: 'javascript/es6',
          destination: 'sizePrimitives.ts',
          filter: token =>
            token.type === 'dimension' && isPrimitiveToken(token),
        },
        {
          format: 'javascript/es6',
          destination: 'sizeTokens.ts',
          filter: token =>
            token.type === 'dimension' && isFunctionalToken(token),
        },
      ],
    },
    'size: semantics': {
      transforms: ['attribute/cti', 'name/ti/camel/strip'],
      buildPath: './shared/theme/tokens/',
      options: {stripFromPath: ['size', 'spacing', 'radius', 'border']},
      files: [
        {
          format: 'javascript/es6',
          destination: 'sizeSpacingSemantics.ts',
          filter: token =>
            token.type === 'dimension' &&
            token.path.includes('spacing') &&
            isSemanticToken(token),
        },
        {
          format: 'javascript/es6',
          destination: 'sizeRadiusSemantics.ts',
          filter: token =>
            token.type === 'dimension' &&
            token.path.includes('radius') &&
            isSemanticToken(token),
        },
        {
          format: 'javascript/es6',
          destination: 'sizeBorderSemantics.ts',
          filter: token =>
            token.type === 'dimension' &&
            token.path.includes('border') &&
            isSemanticToken(token),
        },
      ],
    },
  },
}
