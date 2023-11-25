import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SettingScreen from '../screen/SettingScreen';
import MedicineRemainder from '../screen/SettingScreens/MedicineRemainder';


const Stack = createStackNavigator();

const SettingNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                animationEnabled: true,
                headerShown: false,
                animationTypeForReplace: 'push'
            }}
            initialRouteName='SettingScreen'
        >
            <Stack.Screen name="SettingScreen" component={SettingScreen} />
            <Stack.Screen name="MedicineRemainder" component={MedicineRemainder} />
        </Stack.Navigator>
    )
}

export default SettingNavigator;


const styles = StyleSheet.create({})