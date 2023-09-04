/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppNavigator from './src/navigation';
import {AuthContextProvier} from './src/screens/AuthFlow/authContext';
import {ToastProvider} from 'react-native-toast-notifications';

function App(): JSX.Element {
  return (
    <AuthContextProvier>
      <ToastProvider>
        <AppNavigator />
      </ToastProvider>
    </AuthContextProvier>
  );
}

export default App;
