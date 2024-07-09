import { Image, ImageStyle, View, ViewStyle } from 'react-native'
import { Text } from './Text'
import { colors, sizes } from '../../shared/theme'
import { Icon } from './Icon'

interface CardProps {
  name: string
  imageUrl: string
  releaseDate: string
  rating: number
}
export const Card = ({ name, imageUrl, releaseDate, rating }: CardProps) => {
  return (
    <View>
      <View style={$reflection} />

      <View style={$container}>
        <Image source={{ uri: imageUrl }} style={$image} />
        <View style={$contentContainer}>
          <Text preset="headline2" numberOfLines={1}>
            {name}
          </Text>
          <View style={$rowContent}>
            <Text preset="label2">Released:</Text>
            <Text preset="title2">{releaseDate}</Text>
          </View>
          <View style={$rowContent}>
            <Text preset="label2">Rating:</Text>
            {Array.from({ length: rating }).map((_, i) => (
              <Icon color={colors.tint.accent} key={i} name="star" />
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  flexDirection: 'row',
  backgroundColor: colors.background.brand,
  padding: sizes.spacing.md,
  borderRadius: sizes.radius.md,
  borderWidth: sizes.border.sm,
  borderColor: colors.border.base,
}

const $image: ImageStyle = {
  width: 90,
  height: 120,
  borderRadius: sizes.radius.sm,
  borderWidth: sizes.border.sm,
  borderColor: colors.border.base,
}

const $contentContainer: ViewStyle = {
  marginLeft: sizes.spacing.md,
  flex: 1,
  justifyContent: 'center',
  rowGap: sizes.spacing.xxs,
}

const $rowContent: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: sizes.spacing.xs,
}

const $reflection: ViewStyle = {
  position: 'absolute',
  right: -6,
  bottom: -6,
  width: '100%',
  height: '100%',
  backgroundColor: colors.background.reflection,
  borderRadius: sizes.radius.md,
}
