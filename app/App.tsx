import React from 'react'
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context'

import { GamesListScreen } from './screens/GamesListScreen'

const App = (): React.JSX.Element | null => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GamesListScreen />
    </SafeAreaProvider>
  )
}

export default App
