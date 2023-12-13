import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigator from './BottomNavigator';
import OnBoardingItem from '../components/OnBoardingItem/OnBoardingItem';
import { getDataItem } from '../utility/storage';
import OnBoardingScreen from '../screen/OnBoardingScreen/OnBoardingScreen';


const Stack = createStackNavigator();

const MainNavigator = () => {

    const [onBoarded, setOnBoarded] = useState(false)

    const getVar = async () => {
        const data = await getDataItem('UserOnboarding');

        if (data) {
            setOnBoarded(true);
        } else {
            setOnBoarded(false);
        }
    }

    useEffect(() => {
        getVar();
    }, [])


    return (
        <Stack.Navigator
            screenOptions={{
                animationEnabled: true,
                headerShown: false,
                animationTypeForReplace: 'push',
                headerShadowVisible: false
            }}
            // initialRouteName={onBoarded ? 'AppScreen' : 'OnBoardingScreen'}
            initialRouteName={'OnBoardingScreen'}
        >
            <Stack.Screen name="AppScreen" component={BottomNavigator} />
            <Stack.Screen name="OnBoardingScreen"
                // options={{
                //     headerLeftContainerStyle: {
                //         borderRadius: 999,
                //         // margin: 15
                //     },
                //     headerTintColor: '#fff',
                //     headerStyle: {
                //         backgroundColor: colors.primary,
                //     },
                //     title: "",
                //     headerShown: true
                // }} 
                component={OnBoardingScreen} />
        </Stack.Navigator>
    )
}

export default MainNavigator;
