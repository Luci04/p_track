import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import PremiumScreen from '../screen/PremiumScreen';

const Stack = createStackNavigator();

const PremiumStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                animationEnabled: true,
                headerShown: false,
                animationTypeForReplace: 'push'
            }}>
            <Stack.Screen name="PremiumScreen" component={PremiumScreen} />
        </Stack.Navigator>
    )
}

export default PremiumStackNavigator

const styles = StyleSheet.create({})