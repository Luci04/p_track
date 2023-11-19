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
import { createTable, getDBConnection, readData, readNote, saveNote } from './db-service'
// import FingerprintScanner from 'react-native-fingerprint-scanner';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import { BackHandler } from 'react-native';
import notifee from '@notifee/react-native';
import moment from 'moment';

export default function App() {

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);

    } catch (error) {
      console.error(error);
    }
  }, []);

  async function onDisplayNotification() {

    try {


      // Request permissions (required for iOS)
      await notifee.requestPermission()

      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      // Display a notification
      await notifee.displayNotification({
        title: 'Notification Title',
        body: 'Main body content of the notification',
        android: {
          channelId,
          // optional, defaults to 'ic_launcher'.
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: 'default',
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadDataCallback()
    onDisplayNotification();
  }, [loadDataCallback])


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