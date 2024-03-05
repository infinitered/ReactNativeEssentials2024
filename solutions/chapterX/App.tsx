import React from 'react'
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context'

import { AppNavigator } from './navigators/AppNavigator'
import { setupNotifications } from './services/notifications'
import { GlobalStateProvider } from './services/state'

setupNotifications()

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
