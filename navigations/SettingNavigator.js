import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets, TransitionSpecs, CardStyleInterpolators, HeaderStyleInterpolators } from '@react-navigation/stack';
import SettingScreen from '../screen/SettingScreen';
import MedicineRemainder from '../screen/SettingScreens/MedicineRemainder';
import CycleRemainder from '../screen/SettingScreens/CycleRemainder';
import ContraceptionRemainder from '../screen/SettingScreens/ContraceptionRemainder';
import MeditationRemainder from '../screen/SettingScreens/MeditationRemainder';
import DailyLoggingRemainder from '../screen/SettingScreens/DailyLoggingRemainder';
import TrackingRemainder from '../screen/SettingScreens/TrackingRemainder';
import SecureAccessScreen from '../screen/SettingScreens/SecureAccessScreen';
import YourNameScreen from '../screen/SettingScreens/YourNameScreen';


const Stack = createStackNavigator();

const SettingNavigator = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                animationEnabled: true,
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
            }}
            initialRouteName='SettingScreen'
        >
            <Stack.Screen name="SettingScreen" component={SettingScreen} />
            <Stack.Screen name="Cycle Remainder" options={{ headerShown: true }} component={CycleRemainder} />
            <Stack.Screen name="Medicine Remainder" options={{ headerShown: true }} component={MedicineRemainder} />
            <Stack.Screen name="Contraception Remainder" options={{ headerShown: true }} component={ContraceptionRemainder} />
            <Stack.Screen name="Meditation Remainder" options={{ headerShown: true }} component={MeditationRemainder} />
            <Stack.Screen name="Daily Logging Remainder" options={{ headerShown: true }} component={DailyLoggingRemainder} />
            <Stack.Screen name="Tracking Remainder" options={{ headerShown: true }} component={TrackingRemainder} />

            <Stack.Screen name="Secure Accesss" options={{ headerShown: true }} component={SecureAccessScreen} />
            <Stack.Screen name="Your Name Screen" options={{ headerShown: true, title: "Your Name" }} component={YourNameScreen} />

        </Stack.Navigator>
    )
}

export default SettingNavigator;


const styles = StyleSheet.create({})