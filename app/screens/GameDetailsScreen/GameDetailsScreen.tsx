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
import {Button} from '../../components/Button'
import {Empty} from '../../components/Empty'
import {Icon} from '../../components/Icon'
import {Text} from '../../components/Text'
import {type ScreenProps} from '../../navigators/AppNavigator'
import {api} from '../../services/api'
import {useGlobalState} from '../../services/state'
import {Game} from '../../services/types'
import {colors, sizes} from '../../theme'
import {Switch} from '../../components/Switch'

interface ReviewsProps {
  gameId: number
}

export const GameDetailsScreen = ({route}: ScreenProps<'GameDetails'>) => {
  const gameId = route.params.gameId

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
    summary,
  } = game ?? {}

  return (
    <ScrollView style={$scrollView} contentContainerStyle={$contentContainer}>
      {screenshots ? (
        <Image
          blurRadius={10}
          source={{uri: screenshots?.[0].imageUrl}}
          style={$imageBackground}
        />
      ) : (
        <View style={$imageBackground} />
      )}
      {id ? (
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
      ) : null}
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
              <View style={[$informationRow, $ratingWrapper]}>
                <Text preset="label2" text="Rating: " />
                {Array.from({length: totalRatingStars ?? 0}).map((_, i) => (
                  <Icon
                    color={colors.tokens.borderRatingActive}
                    key={i}
                    name="star"
                  />
                ))}
              </View>
            </View>

            <View style={$descriptionWrapper}>
              <Text text={summary} />
            </View>
          </>
        )}
      </View>

      <Reviews gameId={gameId} />
    </ScrollView>
  )
}

const Reviews = ({gameId}: ReviewsProps) => {
  const state = useGlobalState()
  const {bottom: paddingBottom} = useSafeAreaInsets()

  const reviews = gameId ? state.reviews[gameId] ?? [] : []

  return (
    <>
      <View style={$reviewsHeaderWrapper}>
        <Text preset="label2">
          Reviews: <Text preset="title2" text={reviews.length.toString()} />
        </Text>
        <Button
          text="Write A Review"
          onPress={() =>
            state.appendReview(gameId, Math.random().toString(36).substr(2, 10))
          }
        />
      </View>

      <View style={[reviews.length === 0 && {paddingBottom}]}>
        {reviews.map((review, index) => (
          <View
            key={index}
            style={[
              $reviewWrapper,
              index + 1 === reviews.length && {paddingBottom},
            ]}>
            <Text text={review} />
          </View>
        ))}
      </View>
    </>
  )
}

const $scrollView: ViewStyle = {
  backgroundColor: colors.tokens.backgroundSurface100,
  flex: 1,
}

const $contentContainer: ViewStyle = {
  flexGrow: 1,
}

const $bodyWrapper: ViewStyle = {
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

const $ratingWrapper: ViewStyle = {
  alignItems: 'center',
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
  backgroundColor: colors.primitives.purpleMuted400,
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
}

const $headerWrapper: ViewStyle = {
  alignItems: 'flex-end',
  flexDirection: 'row',
  paddingVertical: sizes.spacing.md,
  paddingLeft: ($image.width as number) + sizes.spacing.md,
}

const $reviewsHeaderWrapper: ViewStyle = {
  padding: sizes.spacing.md,
  rowGap: sizes.spacing.md,
}

const $reviewWrapper: ViewStyle = {
  borderColor: colors.tokens.borderBase,
  borderTopWidth: sizes.border.sm,
  padding: sizes.spacing.md,
  backgroundColor: colors.tokens.backgroundSurface200,
}
