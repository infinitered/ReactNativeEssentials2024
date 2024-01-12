import React from 'react'
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import {colors, sizes} from '../../../shared/theme'
import {Icon, IconProps} from './Icon'
import {Text} from './Text'

interface ButtonProps extends Omit<PressableProps, 'children'> {
  /**
   * The text to display.
   */
  text?: string
  /**
   * The icon to be displayed before the text.
   */
  icon?: IconProps['name']
  /**
   * Override the style of the button face element.
   */
  style?: StyleProp<ViewStyle>
}

export const Button = (props: ButtonProps) => {
  const {text, icon, style: $faceOverride, ...RestPressableProps} = props

  const $reflectionStyle: PressableProps['style'] = state => [
    $reflection,
    state.pressed && $reflectionPressed,
  ]

  const $faceStyle: PressableProps['style'] = state => [
    $face,
    $faceOverride,
    state.pressed && $facePressed,
  ]

  const $textStyle: PressableProps['style'] = state => [
    $text,
    state.pressed && $textPressed,
  ]

  const iconColor = (state: PressableStateCallbackType) =>
    state.pressed
      ? colors.tokens.textButtonPressed
      : colors.tokens.textButtonBase

  return (
    <Pressable {...RestPressableProps} style={$pressable}>
      {state => (
        <>
          <View style={$reflectionStyle(state)} />

          <View style={$faceStyle(state)}>
            {!!icon && <Icon name={icon} size={18} color={iconColor(state)} />}

            <Text preset="label1" text={text} style={$textStyle(state)} />
          </View>
        </>
      )}
    </Pressable>
  )
}

const $pressable: ViewStyle = {
  height: sizes.tokens.spacingButtonHeight,
}

const $reflection: ViewStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  bottom: -sizes.tokens.spacingButtonReflectionOffset,
  right: -sizes.tokens.spacingButtonReflectionOffset,
  borderRadius: sizes.radius.md,
  backgroundColor: colors.tokens.backgroundButtonReflectionBase,
}

const $reflectionPressed: ViewStyle = {
  backgroundColor: colors.tokens.backgroundButtonReflectionPressed,
}

const $face: ViewStyle = {
  flex: 1,
  borderWidth: sizes.border.sm,
  borderRadius: sizes.radius.md,
  flexDirection: 'row',
  paddingHorizontal: sizes.spacing.md,
  alignItems: 'center',
  justifyContent: 'center',
  columnGap: sizes.spacing.xs,
  backgroundColor: colors.tokens.backgroundButtonBase,
  borderColor: colors.tokens.borderButtonBase,
}

const $facePressed: ViewStyle = {
  backgroundColor: colors.tokens.backgroundButtonPressed,
  borderColor: colors.tokens.borderButtonPressed,
}

const $text: TextStyle = {
  color: colors.tokens.textButtonBase,
}

const $textPressed: TextStyle = {
  color: colors.tokens.textButtonPressed,
}
