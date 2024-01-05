import React from 'react';
import {AppNavigator} from './navigators/AppNavigator';

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

const App = (): React.JSX.Element => {
  return <AppNavigator />;
};

export default App;
