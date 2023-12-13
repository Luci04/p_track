import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import CalenderScreen from '../screen/CalendarScreens/CalenderScreen';
import ScollableInfiniteCalendar from '../components/ScollableInfiniteCalendar/ScollableInfiniteCalendar';
import MeditationScreen from '../screen/CalendarScreens/MeditationScreen';
import { colors } from '../theme/styles';


const Stack = createStackNavigator();

const CalenderScreenNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                animationEnabled: true,
                headerShown: false,
                animationTypeForReplace: 'push',
                headerShadowVisible: false
            }}
            initialRouteName='CalenderScreen'
        >
            <Stack.Screen name="CalenderScreen" component={CalenderScreen} />
            <Stack.Screen name="MeditationScreen"
                options={{
                    headerLeftContainerStyle: {
                        borderRadius: 999,
                        // margin: 15
                    },
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: colors.primary,
                    },
                    title: "",
                    headerShown: true
                }} component={MeditationScreen} />
            <Stack.Screen name="ScollableInfiniteCalendar" component={ScollableInfiniteCalendar} />
        </Stack.Navigator>
    )
}

export default CalenderScreenNavigator;


const styles = StyleSheet.create({})