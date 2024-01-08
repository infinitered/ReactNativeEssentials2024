import * as colorPrimitives from './tokens/colorPrimitives'
import * as colorTokens from './tokens/colorTokens'
import * as sizePrimitives from './tokens/sizePrimitives'
import * as sizeRadiusSemantics from './tokens/sizeRadiusSemantics'
import * as sizeBorderSemantics from './tokens/sizeBorderSemantics'
import * as sizeSpacingSemantics from './tokens/sizeSpacingSemantics'
import * as sizeTokens from './tokens/sizeTokens'

const colors = {
  primitives: colorPrimitives,
  tokens: colorTokens,
}

const sizes = {
  primitives: sizePrimitives,
  radius: sizeRadiusSemantics,
  border: sizeBorderSemantics,
  spacing: sizeSpacingSemantics,
  tokens: sizeTokens,
}

export {colors, sizes}
export * from './fonts'
