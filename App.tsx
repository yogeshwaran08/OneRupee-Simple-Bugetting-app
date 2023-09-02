/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppNavigator from './src/navigation';
import {AuthContextProvier} from './src/screens/AuthFlow/authContext';

function App(): JSX.Element {
  return (
    <AuthContextProvier>
      <AppNavigator />
    </AuthContextProvier>
  );
}

export default App;
