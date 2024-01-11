import React from 'react'
import {TextStyle, View, ViewStyle} from 'react-native'
import {Icon} from './Icon'
import {Text} from './Text'
import {colors, sizes} from '../theme'

interface RatingProps {
  rating: number
}

export const Rating = ({rating}: RatingProps) => {
  return (
    <View style={$container}>
      <Text style={$label} preset="label2" text="Rating:" />
      {Array.from({length: rating}).map((_, i) => (
        <Icon color={colors.tokens.borderRatingActive} key={i} name="star" />
      ))}
    </View>
  )
}

const $container: ViewStyle = {
  flexDirection: 'row',
  columnGap: sizes.spacing.xs,
  alignItems: 'center',
}

const $label: TextStyle = {
  lineHeight: 24,
}
