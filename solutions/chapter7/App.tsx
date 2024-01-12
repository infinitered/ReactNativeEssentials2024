import React from 'react'
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'
import {AppNavigator} from './navigators/AppNavigator'
import {GlobalStateProvider} from './services/state'

const App = (): React.JSX.Element | null => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GlobalStateProvider>
        <AppNavigator />
      </GlobalStateProvider>
    </SafeAreaProvider>
  )
}

export default App
