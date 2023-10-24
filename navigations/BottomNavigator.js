import React, { useEffect, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingScreen from '../screen/SettingScreen';
import IconComponent from '../components/IconComponent/IconComponent';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import uuid from 'react-native-uuid'
import { colors } from '../theme/styles';
import CalenderScreen from '../screen/CalenderScreen';
import StatsScreen from '../screen/StatsScreen';
import PremiumScreen from '../screen/PremiumScreen';
import * as Animatable from 'react-native-animatable';


const Tab = createBottomTabNavigator();

const TabArr = [
    {
        name: 'Calender',
        label: 'Calender',
        component: CalenderScreen,
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
        component: PremiumScreen,
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
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 60,
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    right: 16,
                    borderRadius: 16,
                    elevation: 1,
                },
            }}
        >
            {
                TabArr.map((item, index) => {
                    return <Tab.Screen
                        key={uuid.v4()}
                        name={item.name}
                        options={{
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
