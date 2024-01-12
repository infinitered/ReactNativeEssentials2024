import {DevSettings, Platform} from 'react-native'
import {MMKV} from 'react-native-mmkv'

export const storage = new MMKV({id: '@RNEssentials/training'})

export type AppModes = (typeof appModes)[number]['value']

const appModes = [
  {label: 'Assignment', value: 'assignment'},
  {label: 'Chapter 1 Solution', value: 'chapter1'},
  {label: 'Chapter 2 Solution', value: 'chapter2'},
  {label: 'Chapter 3 Solution', value: 'chapter3'},
  {label: 'Chapter 4 Solution', value: 'chapter4'},
  {label: 'Chapter 5 Solution', value: 'chapter5'},
  {label: 'Chapter 6 Solution', value: 'chapter6'},
  {label: 'Chapter 7 Solution', value: 'chapter7'},
] as const

export function setupAppModeSelector() {
  const activeAppMode =
    (storage.getString('appMode') as AppModes) || 'assignment'

  appModes.forEach(f => {
    const title = ['⚈', f.label, Platform.OS === 'android' ? false : '⚈']
      .filter(Boolean)
      .join(' ')

    DevSettings.addMenuItem(title, () => {
      storage.set('appMode', f.value)
      DevSettings.reload()
    })
  })

  return activeAppMode
}
