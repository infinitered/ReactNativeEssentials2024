import React from 'react'
import {TextStyle, View, ViewStyle} from 'react-native'
import {colors, sizes} from '../theme'
import {Icon} from './Icon'
import {Text} from './Text'

export const Empty = () => {
  return (
    <View style={$emptyContentWrapper}>
      <Icon color={colors.tokens.textEmptyBase} size={36} name="frown" />
      <Text
        preset="display"
        text={"There's\nNothing Here..."}
        style={$emptyText}
      />
    </View>
  )
}

const $emptyContentWrapper: ViewStyle = {
  flexDirection: 'row',
  paddingVertical: sizes.spacing.xl,
}

const $emptyText: TextStyle = {
  color: colors.tokens.textEmptyBase,
  marginStart: sizes.spacing.md,
}
