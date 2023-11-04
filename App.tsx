/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomNavigator from './navigations/BottomNavigator';
import {PaperProvider} from 'react-native-paper';
import {UserProvider} from './context/UserContext';

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <UserProvider>
          <BottomNavigator />
        </UserProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}
