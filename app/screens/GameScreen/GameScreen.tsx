import React from 'react'
import {Text} from '../../components/Text'
import {type ScreenProps} from '../../navigators/AppNavigator'
import {
  Image,
  ImageBackground,
  type ImageStyle,
  ScrollView,
  type ViewStyle,
  View,
} from 'react-native'
import {useGlobalState} from '../../services/state'

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

  return {isLoading, game, reviews: reviews[gameId] ?? []}
}

export const GameScreen = ({route}: ScreenProps<'Game'>) => {
  const {gameId} = route.params
  const {isLoading, game, reviews} = useFindGame(gameId) // NOTE: this will be updated to be from the api

  if (isLoading) {
    return <Text text="Loading" />
  }

  if (!game) {
    return <Text text="Game not found" />
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
    <ScrollView contentContainerStyle={$contentContainer}>
      <ImageBackground
        blurRadius={10}
        imageStyle={$imageBackgroundImage}
        source={{uri: imageBackground}}
        style={$imageBackground}>
        <Image resizeMode="cover" source={{uri: image}} style={$image} />
      </ImageBackground>
      <View style={$wrapper}>
        <View style={$content}>
          <Text text={name} />
          <Text text={releaseDate} />
          <Text text={`${rating}/5`} />
          <Text text={`Genre: ${genre}`} />
          <Text text={`Studio: ${studio}`} />
        </View>
        <Text text={description} />
        <Text text={`Reviews: ${reviews.length}`} />
        {reviews.map((review, index) => (
          <Text key={index} text={review} />
        ))}
      </View>
    </ScrollView>
  )
}

const $contentContainer: ViewStyle = {
  flex: 1,
}

const $wrapper: ViewStyle = {
  padding: 20,
}

const $content: ViewStyle = {
  alignSelf: 'flex-end',
}

const $imageBackgroundImage: ImageStyle = {
  height: '100%',
}

const $imageBackground: ImageStyle = {
  height: '25%',
  width: '100%',
}

const $image: ImageStyle = {
  height: 150,
  left: 25,
  position: 'absolute',
  top: '50%',
  width: 100,
}
