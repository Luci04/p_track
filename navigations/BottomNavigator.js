import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingScreen from '../screen/SettingScreen';
import IconComponent from '../components/IconComponent/IconComponent';
import { BackHandler, StyleSheet, TouchableOpacity, View } from 'react-native';
import uuid from 'react-native-uuid'
import { colors } from '../theme/styles';
import CalenderScreen from '../screen/CalenderScreen';
import StatsScreen from '../screen/StatsScreen';
import PremiumScreen from '../screen/PremiumScreen';
import * as Animatable from 'react-native-animatable';
import PremiumStackNavigator from './PremiumStackNavigator';
import CalenderScreenNavigator from './CalenderScreenNavigator';
import SafeView from '../components/SafeView/SafeView';
import { UserContext } from '../context/UserContext';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';


const Tab = createBottomTabNavigator();

const TabArr = [
    {
        name: 'Calender',
        label: 'Calender',
        component: CalenderScreenNavigator,
        iconFamily: 'Ionicons',
        iconName: 'calendar-outline',
        activeIcon: 'calendar-sharp',
    },
    {
        name: 'Stats',
        label: 'Stats',
        component: StatsScreen,
        iconFamily: 'Ionicons',
        iconName: 'stats-chart-outline',
        activeIcon: 'stats-chart',
    },
    {
        name: 'Premium',
        label: 'Premium',
        component: PremiumStackNavigator,
        iconFamily: 'MaterialCommunityIcons',
        iconName: 'police-badge-outline',
        activeIcon: 'police-badge',
    },
    {
        name: 'Setting',
        label: 'Setting',
        component: SettingScreen,
        iconFamily: 'Ionicons',
        iconName: 'settings-outline',
        activeIcon: 'settings'
    }
]

const TabButton = ({ item, onPress, accessibilityState }) => {

    const focused = accessibilityState.selected;
    const viewRef = useRef(null);

    useEffect(() => {
        if (focused) {
            viewRef?.current?.animate({ 0: { scale: 1 }, 1: { scale: 1.3 } })
        } else {
            viewRef?.current?.animate({ 0: { scale: 1.3 }, 1: { scale: 1 } })
        }
    }, [focused])


    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={1}
        >
            <Animatable.View
                ref={viewRef}
                animation={'zoomIn'}
                duration={500}
            >
                <IconComponent
                    iconType={item.iconFamily}
                    iconName={focused ? item.activeIcon : item.iconName}
                    color={focused ? colors.primary : colors.primaryLight}
                    size={20} />
            </Animatable.View>
        </TouchableOpacity>
    )
}

const BottomNavigator = () => {

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


    useEffect(() => {

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

    }, [])

    return (<SafeView style={{ opacity: (authenticated ? 1 : 0) }}>
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {
                TabArr.map((item, index) => {
                    return <Tab.Screen
                        key={index}
                        name={item.name}
                        options={{
                            tabBarStyle: {
                                height: 60,
                                position: 'absolute',
                                bottom: 16,
                                left: 16,
                                right: 16,
                                borderRadius: 16,
                                elevation: 1,
                                display: item.label === 'Premium' ? 'none' : 'flex'
                            },
                            tabBarButton: (props) => <TabButton {...props} item={item} />,
                            tabBarLabel: item.label,
                            tabBarIcon: ({ color, focused }) => <IconComponent
                                iconType={item.iconFamily}
                                iconName={focused ? item.activeIcon : item.iconName}
                                color={'#000'} size={26} />
                        }}
                        component={item.component}
                    />
                })
            }
        </Tab.Navigator>
    </SafeView>

    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default BottomNavigator;
