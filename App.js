/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigator from './navigations/BottomNavigator';
import { PaperProvider } from 'react-native-paper';
import { UserContext, UserProvider } from './context/UserContext';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import { BackHandler } from 'react-native';
import moment from 'moment';
import notifee, { EventType } from '@notifee/react-native';
import MainNavigator from './navigations/MainNavigator';

export default function App() {

  notifee.onBackgroundEvent(async (event) => {
    if (event.type === EventType.NOTIFICATION_TAP) {
      console.log('Notification tapped:', event.notificationId);
    } else if (event.type === EventType.NOTIFICATION_RECEIVED) {
      console.log('Notification received:', event.notificationId);
    }
  });

  // useEffect(() => {
  //   onDisplayNotification();
  // }, [])


  return (
    <NavigationContainer>
      <PaperProvider>
        <UserProvider>
          <MainNavigator />
        </UserProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}
