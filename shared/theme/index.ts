import * as colorBackgroundSemantics from './tokens/colorBackgroundSemantics'
import * as colorBorderSemantics from './tokens/colorBorderSemantics'
import * as colorTextSemantics from './tokens/colorTextSemantics'
import * as colorTintSemantics from './tokens/colorTintSemantics'
import * as sizeBorderSemantics from './tokens/sizeBorderSemantics'
import * as sizeRadiusSemantics from './tokens/sizeRadiusSemantics'
import * as sizeSpacingSemantics from './tokens/sizeSpacingSemantics'

//  prettier-ignore
const hexAlphaSuffixes = ['00', '03', '05', '08', '0A', '0D', '0F', '12', '14', '17', '1A', '1C', '1F', '21', '24', '26', '29', '2B', '2E', '30', '33', '36', '38', '3B', '3D', '40', '42', '45', '47', '4A', '4D', '4F', '52', '54', '57', '59', '5C', '5E', '61', '63', '66', '69', '6B', '6E', '70', '73', '75', '78', '7A', '7D', '80', '82', '85', '87', '8A', '8C', '8F', '91', '94', '96', '99', '9C', '9E', 'A1', 'A3', 'A6', 'A8', 'AB', 'AD', 'B0', 'B3', 'B5', 'B8', 'BA', 'BD', 'BF', 'C2', 'C4', 'C7', 'C9', 'CC', 'CF', 'D1', 'D4', 'D6', 'D9', 'DB', 'DE', 'E0', 'E3', 'E6', 'E8', 'EB', 'ED', 'F0', 'F2', 'F5', 'F7', 'FA', 'FC', 'FF'] as const

export function changeHexAlpha(hexColor: string, opacityPercentage: number) {
  if (!/^#(?:[a-f\d]{6}(?:[a-f\d]{2})?)$/i.test(hexColor)) return hexColor

  const suffix =
    hexAlphaSuffixes[Math.min(Math.max(Math.round(opacityPercentage), 0), 100)]

  if (hexColor.length === 7) return `${hexColor}${suffix}`

  return `${hexColor.slice(0, 7)}${suffix}`
}

const colors = {
  background: colorBackgroundSemantics,
  text: colorTextSemantics,
  tint: colorTintSemantics,
  border: colorBorderSemantics,
  manipulators: { changeHexAlpha },
}

const sizes = {
  radius: sizeRadiusSemantics,
  border: sizeBorderSemantics,
  spacing: sizeSpacingSemantics,
}

export { colors, sizes }
export * from './fonts'
