import React from 'react';
import {AppNavigator} from './navigators/AppNavigator';
import {GameProvider} from './services/state';

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

const App = (): React.JSX.Element => {
  return (
    <GameProvider>
      <AppNavigator />
    </GameProvider>
  );
};

export default App;
