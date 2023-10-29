import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Calendar } from 'react-native-calendars';
import MonthMapping from '../appConst/monthMapping.json'
import { colors } from '../theme/styles';
import IconComponent from '../components/IconComponent/IconComponent';
import SafeView from '../components/SafeView/SafeView';

const CalenderScreen = ({ navigation }) => {


    return (
        <SafeView>
            <Calendar
                theme={{
                    todayTextColor: colors.white,
                    todayBackgroundColor: colors.primary
                }}
                renderArrow={(direction) => {
                    if (direction === 'left') {
                        return <IconComponent
                            iconType={'Entypo'}
                            size={20}
                            color={colors.primary}
                            iconName={'chevron-with-circle-left'} />
                    } else {
                        return <IconComponent
                            iconType={'Entypo'}
                            size={20}
                            color={colors.primary}
                            iconName={'chevron-with-circle-right'} />
                    }
                }}

                renderHeader={(date) => {
                    const currdate = new Date(date);
                    return <Text
                        style={{ fontSize: 25, color: colors.primaryLight }}
                    >{MonthMapping[currdate.getMonth()]} {currdate.getFullYear()}</Text>
                }}
            />
            <View style={{ padding: 15, borderColor: colors.lightGrey, borderWidth: 1, borderRadius: 8, flexDirection: 'column', margin: 20, gap: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                        <View style={{ width: 10, height: 10, backgroundColor: colors.primaryLight, borderRadius: 5 }}></View>
                        <Text>Period</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                        <View style={{ width: 10, height: 10, backgroundColor: colors.primaryLight, borderRadius: 5 }}></View>
                        <Text>Expected period</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                        <View style={{ width: 10, height: 10, backgroundColor: colors.primaryLight, borderRadius: 5 }}></View>
                        <Text>Ovulation</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                        <View style={{ width: 10, height: 10, backgroundColor: colors.primaryLight, borderRadius: 5 }}></View>
                        <Text>Fertile</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity onPress={() => {
                navigation.navigate('ScollableInfiniteCalendar')
            }}>
                <View style={{ padding: 15, borderColor: colors.lightGrey, borderWidth: 1, borderRadius: 8, flexDirection: 'column', margin: 20, gap: 10 }}>
                    <Text style={{ color: colors.black, textAlign: 'center' }}>Edit periods dates</Text>
                </View>
            </TouchableOpacity>
        </SafeView >

    )
}

export default CalenderScreen

const styles = StyleSheet.create({})