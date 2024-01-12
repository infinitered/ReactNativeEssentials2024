import Reactotron from 'reactotron-react-native'

Reactotron.configure({ name: require('../../package.json').name })
  .useReactNative()
  .connect()
