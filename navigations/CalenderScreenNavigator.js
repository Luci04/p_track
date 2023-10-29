import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import CalenderScreen from '../screen/CalenderScreen';
import ScollableInfiniteCalendar from '../components/ScollableInfiniteCalendar/ScollableInfiniteCalendar';


const Stack = createStackNavigator();

const CalenderScreenNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                animationEnabled: true,
                headerShown: false,
                animationTypeForReplace: 'push'
            }}
            initialRouteName='CalenderScreen'
        >
            <Stack.Screen name="CalenderScreen" component={CalenderScreen} />
            <Stack.Screen name="ScollableInfiniteCalendar" component={ScollableInfiniteCalendar} />
        </Stack.Navigator>
    )
}

export default CalenderScreenNavigator;


const styles = StyleSheet.create({})