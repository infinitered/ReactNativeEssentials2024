import { MMKV } from 'react-native-mmkv'
import Reactotron from 'reactotron-react-native'

const REACTOTRON_ASYNC_CLIENT_ID = 'REACTOTRON_ASYNC_CLIENT_ID'

const storage = new MMKV({ id: REACTOTRON_ASYNC_CLIENT_ID })

const getClientId = () => {
  return Promise.resolve(storage.getString(REACTOTRON_ASYNC_CLIENT_ID)!)
}

const setClientId = (clientId: any) => {
  storage.set(REACTOTRON_ASYNC_CLIENT_ID, clientId)
  return Promise.resolve()
}

Reactotron.configure({
  name: require('../../package.json').name,
  getClientId,
  setClientId,
})
  .useReactNative()
  .connect()
