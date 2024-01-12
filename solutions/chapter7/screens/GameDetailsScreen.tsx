import {useNavigation} from '@react-navigation/native'
import React, {useCallback, useEffect, useState} from 'react'
import {
  Image,
  ScrollView,
  View,
  type ImageStyle,
  type TextStyle,
  type ViewStyle,
} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {api} from '../../../shared/services/api'
import {Game, type Reviews} from '../../../shared/services/types'
import {colors, sizes} from '../../../shared/theme'
import {Button} from '../components/Button'
import {Empty} from '../components/Empty'
import {Rating} from '../components/Rating'
import {Switch} from '../components/Switch'
import {Text} from '../components/Text'
import {type ScreenProps} from '../navigators/AppNavigator'
import {useGlobalState} from '../services/state'

interface ReviewsProps {
  gameId: number
  reviews: Reviews[keyof Reviews]
}

export const GameDetailsScreen = ({route}: ScreenProps<'GameDetails'>) => {
  const {bottom: paddingBottom} = useSafeAreaInsets()
  const gameId = route.params.gameId
  const state = useGlobalState()
  const reviews = gameId ? state.reviews[gameId] ?? [] : []

  const {favorites, toggleFavorite} = useGlobalState()
  const [game, setGame] = useState<Game | undefined>()

  const getGame = useCallback(async () => {
    const response = await api.getGame(gameId)

    if (response.ok) {
      setGame(response.data)
    }
  }, [setGame, gameId])

  useEffect(() => {
    getGame()
  }, [getGame])

  const {
    id,
    cover,
    screenshots,
    name,
    releaseDate,
    genres,
    involvedCompanies,
    totalRatingStars,
    totalRatingCount,
    summary,
  } = game ?? {}

  return (
    <ScrollView
      style={$scrollView}
      contentContainerStyle={[$contentContainer, {paddingBottom}]}>
      {screenshots ? (
        <Image
          blurRadius={10}
          source={{uri: screenshots?.[0].imageUrl}}
          style={$imageBackground}
        />
      ) : (
        <View style={$imageBackground} />
      )}
      {!!id && (
        <View style={$favoriteWrapper}>
          <Text
            style={$favoriteLabel}
            preset="title1"
            text="Add to Favorites"
          />
          <Switch
            isEnabled={Boolean(
              favorites.find(favoriteGameId => favoriteGameId === id),
            )}
            toggleSwitch={() => toggleFavorite(id)}
          />
        </View>
      )}
      <View style={$bodyWrapper}>
        <View style={$headerWrapper}>
          {cover ? (
            <Image
              resizeMode="cover"
              source={{uri: cover?.imageUrl}}
              style={$image}
            />
          ) : (
            <View style={$image} />
          )}

          <Text preset="headline1" text={name} />
        </View>

        {!game ? (
          <Empty text={'Loading\nPlease Wait...'} icon="loader" />
        ) : (
          <>
            <View style={$informationWrapper}>
              <View style={$informationRow}>
                <Text preset="label2" text="Released:" />
                <Text
                  preset="title2"
                  text={releaseDate?.human}
                  style={$informationValue}
                />
              </View>
              <View style={$informationRow}>
                <Text preset="label2" text="Genre:" />
                <Text
                  preset="title2"
                  text={genres?.map(g => g.name).join(', ')}
                  style={$informationValue}
                />
              </View>
              <View style={$informationRow}>
                <Text preset="label2" text="Studio:" />
                <Text
                  preset="title2"
                  text={involvedCompanies?.map(c => c.company.name).join(', ')}
                  style={$informationValue}
                />
              </View>
              {!!totalRatingStars && (
                <Rating
                  ratingsCount={totalRatingCount}
                  rating={totalRatingStars}
                />
              )}
            </View>

            <View style={$descriptionWrapper}>
              <Text text={summary} />
            </View>
          </>
        )}
      </View>

      <Reviews gameId={gameId} reviews={reviews} />
    </ScrollView>
  )
}

const Reviews = ({gameId, reviews}: ReviewsProps) => {
  const navigation = useNavigation()

  return (
    <>
      <View style={$reviewsHeaderWrapper}>
        <Text preset="label2">
          Reviews: <Text preset="title2" text={reviews.length.toString()} />
        </Text>
        <Button
          text="Write A Review"
          onPress={() => navigation.navigate('Review', {gameId})}
        />
      </View>

      {reviews.map((review, index) => (
        <View key={index} style={$reviewWrapper}>
          <Text text={review} />
        </View>
      ))}
    </>
  )
}

const $scrollView: ViewStyle = {
  flex: 1,
  backgroundColor: colors.tokens.backgroundSurface200,
}

const $contentContainer: ViewStyle = {
  flexGrow: 1,
}

const $bodyWrapper: ViewStyle = {
  backgroundColor: colors.tokens.backgroundSurface100,
  paddingHorizontal: sizes.spacing.md,
  flexGrow: 1,
}

const $informationWrapper: ViewStyle = {
  paddingVertical: sizes.spacing.md,
  rowGap: sizes.spacing.xs,
}

const $informationRow: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'flex-start',
  columnGap: sizes.spacing.xs,
}

const $informationValue: TextStyle = {
  flex: 1,
  top: -2,
}

const $descriptionWrapper: ViewStyle = {
  paddingVertical: sizes.spacing.md,
}

const $favoriteWrapper: ViewStyle = {
  position: 'absolute',
  right: sizes.spacing.md,
  top: sizes.spacing.md,
  flexDirection: 'row',
  alignItems: 'center',
  gap: sizes.spacing.xs,
}

const $favoriteLabel: TextStyle = {
  color: colors.primitives.white1000,
}

const $imageBackground: ImageStyle = {
  height: 175,
  width: '100%',
  backgroundColor: colors.tokens.backgroundSurface200,
  borderColor: colors.tokens.borderBase,
  borderBottomWidth: sizes.border.sm,
}

const $image: ImageStyle = {
  borderColor: colors.tokens.borderBase,
  borderRadius: sizes.radius.sm,
  borderWidth: sizes.border.sm,
  height: 153,
  marginEnd: sizes.spacing.md,
  width: 115,
  backgroundColor: colors.tokens.backgroundSurface200,
  position: 'absolute',
  bottom: 0,
}

const $headerWrapper: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
  paddingVertical: sizes.spacing.md,
  paddingLeft: ($image.width as number) + sizes.spacing.md,
  minHeight: 104,
}

const $reviewsHeaderWrapper: ViewStyle = {
  padding: sizes.spacing.md,
  rowGap: sizes.spacing.md,
  borderColor: colors.tokens.borderBase,
  borderTopWidth: sizes.border.sm,
}

const $reviewWrapper: ViewStyle = {
  borderColor: colors.tokens.borderBase,
  borderTopWidth: sizes.border.sm,
  padding: sizes.spacing.md,
}
