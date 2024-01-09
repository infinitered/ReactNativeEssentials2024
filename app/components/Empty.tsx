import React from 'react'
import {TextStyle, View, ViewStyle} from 'react-native'
import {colors, sizes} from '../theme'
import {Icon, IconProps} from './Icon'
import {Text} from './Text'

export const Empty = (props: {text?: string; icon?: IconProps['name']}) => {
  return (
    <View style={$emptyContentWrapper}>
      <Icon
        color={colors.tokens.textEmptyBase}
        size={36}
        name={props.icon ?? 'frown'}
      />
      <Text
        preset="display"
        text={props.text ?? "There's\nNothing Here..."}
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
