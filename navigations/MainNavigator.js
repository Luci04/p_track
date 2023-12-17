import { BackHandler, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigator from './BottomNavigator';
import OnBoardingItem from '../components/OnBoardingItem/OnBoardingItem';
import { getDataItem, getDataObject } from '../utility/storage';
import OnBoardingScreen from '../screen/OnBoardingScreen/OnBoardingScreen';
import { UserContext } from '../context/UserContext';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import SettingNavigator from './SettingNavigator';


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

    const { setAuthenticated, authenticated } = useContext(UserContext)
    const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })

    rnBiometrics.isSensorAvailable()
        .then((resultObject) => {
            const { available, biometryType } = resultObject

            if (available && biometryType === BiometryTypes.TouchID) {
                console.log('TouchID is supported')
            } else if (available && biometryType === BiometryTypes.FaceID) {
                console.log('FaceID is supported')
            } else if (available && biometryType === BiometryTypes.Biometrics) {
                console.log('Biometrics is supported')
            } else {
                console.log('Biometrics not supported')
            }
        })

    const callSecureAuth = async () => {

        const data = await getDataObject('SecureAccess');

        if (data) {
            setAuthenticated(false);
            rnBiometrics
                .simplePrompt({ promptMessage: 'Confirm fingerprint' })
                .then((resultObject) => {
                    const { success } = resultObject

                    if (success) {
                        console.log('successful biometrics provided')
                        setAuthenticated(true)
                    } else {
                        BackHandler.exitApp();
                        console.log('user cancelled biometric prompt')
                    }
                })
                .catch(() => {
                    BackHandler.exitApp();
                    console.log('biometrics failed')

                })
        } else {
            setAuthenticated(true);
        }


    }


    useEffect(() => {
        // getVar();
        callSecureAuth();
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
