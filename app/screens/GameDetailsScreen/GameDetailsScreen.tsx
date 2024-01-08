import React from 'react'
import {Text} from '../../components/Text'
import {type ScreenProps} from '../../navigators/AppNavigator'
import {
  Image,
  type ImageStyle,
  ScrollView,
  type ViewStyle,
  View,
  type TextStyle,
} from 'react-native'
import {useGlobalState} from '../../services/state'
import {colors, sizes} from '../../theme'
import {Button} from '../../components/Button'
import {Icon} from '../../components/Icon'

interface ReviewsProps {
  gameId: string
}

const useFindGame = (gameId: string) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const {reviews} = useGlobalState()
  const game = {
    id: 1,
    name: 'Super Mario Bros. Wonder',
    rating: 4,
    description:
      'The next evolution of 2D side-scrolling Super Mario Bros. games is headed to Nintendo Switch!\n\nWhen you touch a Wonder Flower in the game, the wonders of the world unlock – pipes could come alive, hordes of enemies may appear, characters might change their looks, for example – transforming the gameplay in unpredictable ways. Excitement and different surprises await in each course. Super Mario Bros. Wonder features Princess Peach, Princess Daisy and Yoshi as playable characters, in addition to familiar characters like Mario, Luigi and Toad.',
    imageBackground:
      'https://images.igdb.com/igdb/image/upload/t_screenshot_big/scn3et.jpg',
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6nnl.png',
    releaseDate: 'Oct 20, 2023',
    genre: 'Platform',
    studio: 'Nintendo',
  }

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [gameId])

  return {
    isLoading,
    game,
    reviews: [
      'If you liked the first two Spyro games, you will like this one.',
      "I liked the first Spyro, in particular its linearity: the levels were simple to navigate, the paths were clear to see, and if there was an area that was difficult to access, it was generally optional. The only challenge was the enemies and their variety. The second Spyro introduced the idea of gems-for-minigames, which I did not love, to be honest, especially for the vague emphasis on the fact that you have to do them to eventually progress. The third Spyro took it to the extreme, and it's basically unplayable if you want to play a game that resembles the first Spyro.",
      'The levels are a mess that is hard to navigate, you have to collect eggs to progress (which means searching the levels to the eternity) from the very beginning, and enemies are not the focus anymore. In other words, Spyro 3 is the worst of the two games, and I am extremely disappointed.',
    ],
  } // reviews[gameId] ?? [] // TODO: REVERT ME
}

export const GameDetailsScreen = ({route}: ScreenProps<'GameDetails'>) => {
  // const {gameId} = route.params // TODO: REVERT ME
  const gameId = '1'
  const {isLoading, game} = useFindGame(gameId) // TODO: this will be updated to be from the api

  if (isLoading) {
    return <Text text="Loading" />
  }

  if (!game) {
    return <EmptyScreen />
  }

  const {
    name,
    rating,
    description,
    imageBackground,
    image,
    releaseDate,
    genre,
    studio,
  } = game

  return (
    <ScrollView style={$scrollView}>
      <View style={$imageWrapper}>
        <Image
          blurRadius={10}
          source={{uri: imageBackground}}
          style={$imageBackground}
        />
      </View>
      <View style={$bodyShift}>
        <View style={$bodyWrapper}>
          <View style={$headerWrapper}>
            <Image resizeMode="cover" source={{uri: image}} style={$image} />
            <Text preset="headline1" text={name} style={$name} />
          </View>
          <View style={$informationWrapper}>
            <Text preset="label2" style={$informationText}>
              Released: <Text preset="title2" text={releaseDate} />
            </Text>
            <Text preset="label2" style={$informationText}>
              Genre: <Text preset="title2" text={genre} />
            </Text>
            <Text preset="label2" style={$informationText}>
              Studio: <Text preset="title2" text={studio} />
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
          <Text text={description} style={$description} />
        </View>
        <Reviews gameId={gameId} />
      </View>
    </ScrollView>
  )
}

const EmptyScreen = () => (
  <View style={$scrollView}>
    <View style={$imageWrapper}>
      <View style={[$imageBackground, $emptyBackgroundColor]} />
    </View>
    <View style={$bodyShift}>
      <View style={$bodyWrapper}>
        <View style={$headerWrapper}>
          <View style={[$image, $emptyBackgroundColor]} />
        </View>
        <View style={$emptyContentWrapper}>
          <Icon color={colors.tokens.textEmptyBase} size={36} name="frown" />
          <Text
            preset="display"
            text="There's Nothing Here..."
            style={$emptyText}
          />
        </View>
      </View>
    </View>
  </View>
)

const Reviews = ({gameId}: ReviewsProps) => {
  const {reviews} = useFindGame(gameId) // NOTE: this will be updated to be from the api
  return (
    <View style={$reviewsContainer}>
      <Text preset="label2" style={$reviewsLabel}>
        Reviews: <Text preset="title2" text={reviews.length.toString()} />
      </Text>
      <Button text="Write A Review" style={$reviewButton} />
      {reviews.length > 0 && (
        <View style={$reviewsWrapper}>
          {reviews.map((review, index) => (
            <View key={index} style={$reviewWrapper}>
              <Text text={review} />
            </View>
          ))}
        </View>
      )}
    </View>
  )
}

const $scrollView: ViewStyle = {
  backgroundColor: colors.tokens.backgroundSurface100,
  flex: 1,
}

const $emptyBackgroundColor: ViewStyle = {
  backgroundColor: colors.tokens.backgroundSurface200,
}

const $emptyContentWrapper: ViewStyle = {
  flexDirection: 'row',
  paddingVertical: sizes.spacing.xl,
}

const $emptyText: TextStyle = {
  color: colors.tokens.textEmptyBase,
  marginStart: sizes.spacing.md,
}

const $bodyShift: ViewStyle = {
  top: -50,
}

const $bodyWrapper: ViewStyle = {
  paddingHorizontal: sizes.spacing.md,
}

const $headerWrapper: ViewStyle = {
  alignItems: 'flex-end',
  flexDirection: 'row',
  marginBottom: sizes.spacing.md,
}

const $name: TextStyle = {
  flex: 1,
}

const $informationWrapper: ViewStyle = {
  paddingVertical: sizes.spacing.md,
}

const $informationText: ViewStyle = {
  marginBottom: sizes.spacing.xs,
}

const $ratingWrapper: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
}

const $description: TextStyle = {
  marginVertical: sizes.spacing.md,
}

const $imageWrapper: ViewStyle = {
  borderColor: colors.tokens.borderBase,
  borderBottomWidth: sizes.border.sm,
}

const $imageBackground: ImageStyle = {
  height: 175,
  width: '100%',
}

const $image: ImageStyle = {
  borderColor: colors.tokens.borderBase,
  borderRadius: sizes.radius.sm,
  borderWidth: sizes.border.sm,
  height: 153,
  marginEnd: sizes.spacing.md,
  width: 115,
}

const $reviewsContainer: ViewStyle = {
  marginVertical: sizes.spacing.md,
}

const $reviewsLabel: TextStyle = {
  marginBottom: sizes.spacing.md,
  paddingHorizontal: sizes.spacing.md,
}

const $reviewButton: ViewStyle = {
  marginHorizontal: sizes.spacing.md,
}

const $reviewsWrapper: ViewStyle = {
  backgroundColor: colors.tokens.backgroundSurface200,
  borderColor: colors.tokens.borderBase,
  borderTopWidth: sizes.border.sm,
  marginTop: sizes.spacing.md,
}

const $reviewWrapper: ViewStyle = {
  borderColor: colors.tokens.borderBase,
  borderBottomWidth: sizes.border.sm,
  paddingHorizontal: sizes.spacing.md,
  paddingVertical: sizes.spacing.md,
}
