/**
 * @format
 */

import React, { useEffect } from 'react'
import { AppRegistry } from 'react-native'
import BootSplash from 'react-native-bootsplash'

import { name as appName } from './app.json'
import AppAssignment from './app/App'
import { setupMockServer } from './msw'
import {
  setupTrainingAppModeSelector,
  TrainingBanner,
} from './shared/utils/trainingHelper'
import AppChapter7 from './solutions/chapter7/App'

const activeAppMode = setupTrainingAppModeSelector()

setupMockServer()

if (__DEV__) {
  import('./shared/utils/reactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  )
}

const appFileRegistry = {
  assignment: AppAssignment,
  chapter1: AppChapter7,
  chapter2: AppChapter7,
  chapter3: AppChapter7,
  chapter4: AppChapter7,
  chapter5: AppChapter7,
  chapter6: AppChapter7,
  chapter7: AppChapter7,
}

const AppMode = appFileRegistry[activeAppMode]

function App() {
  useEffect(() => {
    setTimeout(() => {
      BootSplash.hide({ fade: true })
    }, 500)
  }, [])

  return (
    <>
      <AppMode />
      <TrainingBanner appMode={activeAppMode} />
    </>
  )
}

AppRegistry.registerComponent(appName, () => App)
