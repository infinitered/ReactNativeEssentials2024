import {useFonts} from 'expo-font'
import React from 'react'
import {AppNavigator} from './navigators/AppNavigator'
import {GlobalStateProvider} from './services/state'
import {customFontsToLoad} from './theme'
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context'

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

const App = (): React.JSX.Element | null => {
  const [areFontsLoaded] = useFonts(customFontsToLoad)

  if (!areFontsLoaded) {
    return null
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GlobalStateProvider>
        <AppNavigator />
      </GlobalStateProvider>
    </SafeAreaProvider>
  )
}

export default App
