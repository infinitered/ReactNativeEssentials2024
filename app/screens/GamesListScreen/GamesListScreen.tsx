import {useNavigation} from '@react-navigation/native'
import React, {useCallback, useEffect} from 'react'
import {FlatList, ViewStyle} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Card} from '../../components/Card'
import {api} from '../../services/api'
import {useGlobalState} from '../../services/state'
import {colors, sizes} from '../../theme'
import {Empty} from '../../components/Empty'

export const GamesListScreen = () => {
  const {bottom: paddingBottom} = useSafeAreaInsets()

  const navigation = useNavigation()

  const {setGames, games} = useGlobalState()

  const getGames = useCallback(async () => {
    const response = await api.getGames()

    if (response.ok) {
      setGames(response.data)
    }
  }, [setGames])

  useEffect(() => {
    getGames()
  }, [getGames])

  return (
    <FlatList
      data={games}
      style={$list}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={[{paddingBottom}, $contentContainer]}
      ListEmptyComponent={<Empty />}
      renderItem={({item}) => (
        <Card
          onPress={() => navigation.navigate('GameDetails', {gameId: item.id})}
          name={item.name}
          rating={item.totalRatingStars}
          releaseDate={item.releaseDate.human}
          imageUrl={item.cover.imageUrl}
        />
      )}
    />
  )
}

const $list: ViewStyle = {
  backgroundColor: colors.tokens.backgroundSurface100,
}

const $contentContainer: ViewStyle = {
  rowGap: sizes.spacing.lg,
  paddingHorizontal: sizes.spacing.md,
}
