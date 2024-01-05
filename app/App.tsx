import React from 'react';
import {AppNavigator} from './navigators/AppNavigator';
import {GlobalStateProvider} from './services/state';

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

const App = (): React.JSX.Element => {
  return (
    <GlobalStateProvider>
      <AppNavigator />
    </GlobalStateProvider>
  );
};

export default App;
