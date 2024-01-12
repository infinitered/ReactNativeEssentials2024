import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigationHelpers,
} from '@react-navigation/native'
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import React from 'react'
import {Platform, Pressable, useColorScheme, type ViewStyle} from 'react-native'
import {GameDetailsScreen} from '../screens/GameDetailsScreen'
import {GamesListScreen} from '../screens/GamesListScreen'
import {ReviewScreen} from '../screens/ReviewScreen'
import {MMKV} from 'react-native-mmkv'
import {safeParse} from '../../../shared/utils/safeParse'
import {colors, fonts, sizes} from '../../../shared/theme'
import {Icon} from '../components/Icon'

export const storage = new MMKV({id: '@RNEssentials/navigation/state'})

const initNavigation = safeParse(storage.getString('state'), undefined)

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  GamesList: undefined
  GameDetails: {gameId: number; name: string}
  Review: {gameId: number}
}

export type ScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const renderBackButton = (navigation: NavigationHelpers<AppStackParamList>) => {
  return (
    navigation.canGoBack() && (
      <Pressable style={$backButton} onPress={() => navigation.goBack()}>
        <Icon
          name="arrow-left-circle"
          size={Platform.select({ios: 24, android: 30})}
          color={colors.tokens.textBase}
        />
      </Pressable>
    )
  )
}

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="GamesList"
      screenOptions={({navigation}) => ({
        contentStyle: {
          borderTopColor: colors.tokens.borderBase,
          borderTopWidth: 2,
        },
        headerLeft: () => renderBackButton(navigation),
        headerStyle: {
          backgroundColor: colors.tokens.backgroundHeaderList,
        },
        headerTitleAlign: 'center',
        headerTintColor: colors.tokens.textBase,
        headerTitleStyle: {
          fontSize: 24,
          fontFamily: fonts.primary.semiBold,
        },
      })}>
      <Stack.Screen
        name="GamesList"
        component={GamesListScreen}
        options={{title: 'Retro Games'}}
      />
      <Stack.Screen
        name="GameDetails"
        component={GameDetailsScreen}
        options={({route}) => ({title: route.params.name})}
      />
      <Stack.Screen
        name="Review"
        component={ReviewScreen}
        options={{
          animation: 'fade_from_bottom',
          presentation: 'transparentModal',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()

  return (
    <NavigationContainer
      initialState={initNavigation}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      onStateChange={state => storage.set('state', JSON.stringify(state))}
      {...props}>
      <AppStack />
    </NavigationContainer>
  )
}

const $backButton: ViewStyle = {
  marginRight: sizes.spacing.md,
}
