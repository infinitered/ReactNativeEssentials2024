import React from 'react'
import {ScrollView, ViewStyle} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Button} from '../components/Button'
import {Text} from '../components/Text'
import {colors, sizes} from '../theme'
import {useNavigation} from '@react-navigation/native'
import {Card} from '../components/Card'

const text = 'Thank you, Mario! But our princess is in another castle!'

export function TmpDevScreen() {
  const {bottom} = useSafeAreaInsets()

  const {navigate} = useNavigation()

  return (
    <ScrollView
      style={$scrollView}
      contentContainerStyle={[$contentContainerStyle, {paddingBottom: bottom}]}>
      <Button
        text="Go To List"
        icon="sun"
        onPress={() => navigate('GamesList')}
      />
      <Button
        text="Go To Details"
        style={$button}
        onPress={() => navigate('GameDetails', {gameId: 1})}
      />
      <Card
        name="Super Mario Bros. Wonder"
        rating={4}
        imageUrl="https://images.igdb.com/igdb/image/upload/t_cover_big/co6nnl.png"
        releaseDate="Oct 20, 2023"
        onPress={() => navigate('GameDetails', {gameId: 1})}
      />
      <Text preset="display" text={text} />
      <Text preset="headline1" text={text} />
      <Text preset="headline2" text={text} />
      <Text preset="title1" text={text} />
      <Text preset="title2" text={text} />
      <Text preset="label1" text={text} />
      <Text preset="label2" text={text} />
      <Text preset="body" text={text} />
    </ScrollView>
  )
}

const $scrollView: ViewStyle = {
  backgroundColor: colors.tokens.backgroundSurface100,
}

const $contentContainerStyle: ViewStyle = {
  rowGap: sizes.spacing.md,
  padding: sizes.spacing.md,
}

const $button: ViewStyle = {
  backgroundColor: colors.tokens.backgroundSurface100,
}
