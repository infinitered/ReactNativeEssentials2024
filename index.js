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
import AppChapter1 from './solutions/chapter1/App'
import AppChapter2 from './solutions/chapter2/App'
import AppChapter3 from './solutions/chapter3/App'
import AppChapter4 from './solutions/chapter4/App'
import AppChapter5 from './solutions/chapter5/App'
import AppChapter6 from './solutions/chapter6/App'
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
  chapter1: AppChapter1,
  chapter2: AppChapter2,
  chapter3: AppChapter3,
  chapter4: AppChapter4,
  chapter5: AppChapter5,
  chapter6: AppChapter6,
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
