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
import notifee, { AndroidNotificationSetting, EventType } from '@notifee/react-native';
import MainNavigator from './navigations/MainNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { I18nextProvider } from 'react-i18next';
import i18n from './languageService/i18next';

export default function App() {

  notifee.onBackgroundEvent(async (event) => {
    if (event.type === EventType.NOTIFICATION_TAP) {
      console.log('Notification tapped:', event.notificationId);
    } else if (event.type === EventType.NOTIFICATION_RECEIVED) {
      console.log('Notification received:', event.notificationId);
    }
  });

  const ForeGroundNotification = () => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    })
  }

  useEffect(() => {
    const unsubscribe = ForeGroundNotification();
    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <PaperProvider>
          <UserProvider>
            <I18nextProvider i18n={i18n}>
              <MainNavigator />
            </I18nextProvider>
          </UserProvider>
        </PaperProvider>
      </NavigationContainer>
    </GestureHandlerRootView>

  );
}
