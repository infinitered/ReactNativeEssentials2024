import React from 'react';
import {Text} from '../../components/Text';
import {Pressable} from 'react-native';
import {type ScreenProps} from '../../navigators/AppNavigator';

export const GamesListScreen = ({navigation}: ScreenProps<'GamesList'>) => {
  return (
    <>
      <Text text=" Games List Screen" />
      <Pressable
        onPress={() => {
          navigation.navigate('Game', {gameId: '1'});
        }}>
        <Text text="navigate to game screen" />
      </Pressable>
    </>
  );
};
