import {
  Oxanium_400Regular,
  Oxanium_600SemiBold,
  Oxanium_500Medium,
  Oxanium_700Bold,
} from '@expo-google-fonts/oxanium'

export const customFontsToLoad = {
  Oxanium_400Regular,
  Oxanium_600SemiBold,
  Oxanium_500Medium,
  Oxanium_700Bold,
}

const primitives = {
  oxanium: {
    regular: 'Oxanium_400Regular',
    medium: 'Oxanium_500Medium',
    semiBold: 'Oxanium_600SemiBold',
    bold: 'Oxanium_700Bold',
  },
}

export const fonts = {
  primitives,
  primary: primitives.oxanium,
}
