import React from 'react'
import { Image, ScrollView, TextStyle, View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { colors, sizes } from '../../shared/theme'
import { games } from '../../shared/utils/sampleGames'
import { Card } from '../components/Card'

export const GamesListScreen = () => {
  const { bottom: paddingBottom, top: paddingTop } = useSafeAreaInsets()

  return (
    <ScrollView
      style={[$screen, { paddingBottom, paddingTop }]}
      contentContainerStyle={{ flex: 1, gap: 20 }}>
      {games.map((game, index) => (
        <Card
          key={index}
          name={game.name}
          imageUrl={game.cover.imageUrl}
          releaseDate={game.releaseDate.human}
          rating={3}
        />
      ))}
    </ScrollView>
  )
}

const $screen: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background.primary,
  paddingHorizontal: sizes.spacing.md,
}
