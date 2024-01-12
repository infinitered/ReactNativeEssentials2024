import React from 'react'
import {
  Image,
  Pressable,
  View,
  type ImageStyle,
  type ViewStyle,
} from 'react-native'
import {colors, sizes} from '../../../shared/theme'
import {Rating} from './Rating'
import {Text} from './Text'

interface CardProps {
  name: string
  imageUrl: string
  releaseDate: string
  rating: number
  onPress: () => void
}

export const Card = (props: CardProps) => {
  const {name, imageUrl, releaseDate, rating = 0, onPress} = props
  return (
    <Pressable onPress={onPress}>
      <View style={$reflection} />
      <View style={$card}>
        <Image source={{uri: imageUrl}} style={$image} />
        <View style={$contentWrapper}>
          <Text numberOfLines={1} preset="headline2" text={name} />

          <View style={$contentRow}>
            <Text preset="label2" text="Released:" />
            <Text preset="title2" text={releaseDate} />
          </View>

          <Rating rating={rating} />
        </View>
      </View>
    </Pressable>
  )
}

const $card: ViewStyle = {
  backgroundColor: colors.tokens.backgroundButtonBase,
  borderColor: colors.tokens.borderBase,
  borderRadius: sizes.radius.md,
  borderWidth: sizes.border.sm,
  flexDirection: 'row',
  padding: sizes.spacing.md,
  columnGap: sizes.spacing.md,
}

const $reflection: ViewStyle = {
  backgroundColor: colors.tokens.backgroundButtonReflectionPressed,
  borderRadius: sizes.radius.md,
  bottom: -sizes.tokens.spacingButtonReflectionOffset,
  height: '100%',
  position: 'absolute',
  right: -sizes.tokens.spacingButtonReflectionOffset,
  width: '100%',
}

const $contentWrapper: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  rowGap: sizes.spacing.xs,
}

const $image: ImageStyle = {
  borderColor: colors.tokens.borderBase,
  borderRadius: sizes.radius.sm,
  borderWidth: sizes.border.sm,
  height: 120,
  width: 90,
}

const $contentRow: ViewStyle = {
  flexDirection: 'row',
  columnGap: sizes.spacing.xs,
  alignItems: 'center',
}
