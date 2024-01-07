import React from 'react';
import {ScrollView, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Text} from '../components/Text';
import {sizes} from '../theme';

const text = 'Thank you, Mario! But our princess is in another castle!';

export function TmpDevScreen() {
  const {bottom} = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={[$contentContainerStyle, {paddingBottom: bottom}]}>
      <Text preset="display" text={text} />
      <Text preset="headline1" text={text} />
      <Text preset="headline2" text={text} />
      <Text preset="title1" text={text} />
      <Text preset="title2" text={text} />
      <Text preset="label1" text={text} />
      <Text preset="label2" text={text} />
      <Text preset="body" text={text} />
    </ScrollView>
  );
}

const $contentContainerStyle: ViewStyle = {
  rowGap: sizes.spacing.md,
};
