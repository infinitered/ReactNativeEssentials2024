import {useNavigation} from '@react-navigation/native'
import React, {useCallback, useEffect, useMemo} from 'react'
import {SectionList, ViewStyle} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Card} from '../../components/Card'
import {Empty} from '../../components/Empty'
import {Pill} from '../../components/Pill'
import {api} from '../../services/api'
import {useGlobalState} from '../../services/state'
import {Game} from '../../services/types'
import {colors, sizes} from '../../theme'

function useGameData() {
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

  const gamesSectionList = useMemo(() => {
    const initialValue: {[k: number]: Game[]} = {}
    const gameListMap = games.reduce((acc, curr) => {
      const year = curr.releaseDate.y
      if (acc[year]) {
        acc[year].push(curr)
      } else {
        acc[year] = [curr]
      }
      return acc
    }, initialValue)

    return Object.entries(gameListMap).map(([k, v]) => ({
      year: k,
      key: k,
      data: v,
    }))
  }, [games])

  return gamesSectionList
}

export const GamesListScreen = () => {
  const {bottom: paddingBottom} = useSafeAreaInsets()
  const navigation = useNavigation()
  const games = useGameData()

  return (
    <SectionList
      sections={games}
      style={$list}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={[{paddingBottom}, $contentContainer]}
      ListEmptyComponent={<Empty />}
      initialNumToRender={6}
      maxToRenderPerBatch={20}
      windowSize={31}
      renderItem={({item}) => (
        <Card
          onPress={() => navigation.navigate('GameDetails', {gameId: item.id})}
          name={item.name}
          rating={item.totalRatingStars}
          releaseDate={item.releaseDate.human}
          imageUrl={item.cover.imageUrl}
        />
      )}
      renderSectionHeader={({section: {year}}) => <Pill text={year} />}
    />
  )
}

const $list: ViewStyle = {
  backgroundColor: colors.tokens.backgroundSurface100,
}

const $contentContainer: ViewStyle = {
  rowGap: sizes.spacing.lg,
  padding: sizes.spacing.md,
}
