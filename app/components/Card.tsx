import React from 'react'
import {
  Image,
  type ImageStyle,
  Pressable,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native'
import {type Game} from '../services/types'
import {Text} from './Text'
import {Icon} from './Icon'
import {colors, sizes} from '../theme'

interface CardProps
  extends Pick<Game, 'name' | 'rating' | 'releaseDate' | 'image'> {
  onPress: () => void
}

export const Card = (props: CardProps) => {
  const {image, name, releaseDate, rating, onPress} = props
  return (
    <View>
      <View style={$reflection} />
      <Pressable style={$card} onPress={onPress}>
        <Image source={{uri: image}} style={$image} />
        <View style={$contentWrapper}>
          <Text
            numberOfLines={1}
            preset="headline2"
            text={name}
            style={$title}
          />
          <Text preset="label2" style={$released}>
            Released: <Text preset="title2" text={releaseDate} />
          </Text>
          <View style={$ratingWrapper}>
            <Text preset="label2" text="Rating: " />
            {Array.apply(0, new Array(rating)).map((_, i) => (
              <Icon
                color={colors.tokens.borderRatingActive}
                key={i}
                name="star"
              />
            ))}
          </View>
        </View>
      </Pressable>
    </View>
  )
}

const $card: ViewStyle = {
  backgroundColor: colors.tokens.backgroundButtonBase,
  borderColor: colors.tokens.borderBase,
  borderRadius: sizes.radius.md,
  borderWidth: sizes.border.sm,
  flexDirection: 'row',
  padding: sizes.spacing.md,
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
  marginStart: sizes.spacing.md,
  justifyContent: 'center',
}

const $image: ImageStyle = {
  borderColor: colors.tokens.borderBase,
  borderRadius: sizes.radius.sm,
  borderWidth: sizes.border.sm,
  height: 120,
  width: 90,
}

const $title: TextStyle = {
  marginBottom: sizes.spacing.xs,
}

const $released: TextStyle = {
  marginBottom: sizes.spacing.xs,
}

const $ratingWrapper: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
}
