/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
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
import {Pressable, useColorScheme, type ViewStyle} from 'react-native'
import {GameDetailsScreen} from '../screens/GameDetailsScreen/GameDetailsScreen'
import {GamesListScreen} from '../screens/GamesListScreen/GamesListScreen'
import {ReviewScreen} from '../screens/ReviewScreen/ReviewScreen'
import {MMKV} from 'react-native-mmkv'
import {safeParse} from '../utils/safeParse'
import {colors, fonts} from '../theme'
import {Icon} from '../components/Icon'
import {spacing12} from '../theme/tokens/sizePrimitives'

export const storage = new MMKV({id: '@RNEssentials/navigation/state'})

const initNavigation = safeParse(storage.getString('state'), undefined)

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  GamesList: undefined
  GameDetails: {gameId: number}
  Review: {gameId: number}
}

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>

export type ScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const renderBackButton = (navigation: NavigationHelpers<AppStackParamList>) => {
  return (
    navigation.canGoBack() && (
      <Pressable style={$backButton} onPress={() => navigation.goBack()}>
        <Icon
          name="arrow-left-circle"
          size={30}
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
          borderTopColor: colors.tokens.textBase,
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
      <Stack.Screen name="GameDetails" component={GameDetailsScreen} />
      <Stack.Screen
        name="Review"
        component={ReviewScreen}
        options={{presentation: 'modal'}}
      />
    </Stack.Navigator>
  )
}

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

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
  marginRight: spacing12,
}
