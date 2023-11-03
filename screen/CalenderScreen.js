import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Calendar } from 'react-native-calendars';
import MonthMapping from '../appConst/monthMapping.json'
import { colors } from '../theme/styles';
import IconComponent from '../components/IconComponent/IconComponent';
import SafeView from '../components/SafeView/SafeView';
import moment from 'moment'

const CalenderScreen = ({ navigation }) => {

    const periodStart = '11/04/2023';


    const [markingDates, setMarkingDates] = useState({})

    const markPeriod = () => {

        const tempMark = {};

        for (let i = 0; i < 10; i++) {
            if (i == 0) {
                tempMark[moment().add(i, 'days').format('YYYY-MM-DD')] = { startingDay: true, color: 'green' }
            } else if (i == 9) {
                tempMark[moment().add(i, 'days').format('YYYY-MM-DD')] = { selected: true, color: 'green', endingDay: true }
            } else {
                tempMark[moment().add(i, 'days').format('YYYY-MM-DD')] = { selected: true, color: 'green', textColor: 'gray' }
            }
        }

        setMarkingDates(tempMark)
    }


    useEffect(() => {
        markPeriod()
    }, [])



    return (
        <SafeView style={{ backgroundColor: '#fff' }}>
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

                markedDates={markingDates}
                markingType='period'
                enableSwipeMonths
                renderHeader={(date) => {
                    const currdate = new Date(date);
                    return <Text
                        style={{ fontSize: 25, color: colors.primaryLight }}
                    >{MonthMapping[currdate.getMonth()]} {currdate.getFullYear()}</Text>
                }}
            />
            <View style={{ padding: 15, borderColor: colors.borderColor, borderWidth: 1, borderRadius: 8, flexDirection: 'column', margin: 20, gap: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                        <View style={{ width: 14, height: 14, backgroundColor: colors.primaryLight, borderRadius: 7, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: 8, height: 8, backgroundColor: colors.white, borderRadius: 4 }}></View>
                        </View>
                        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: colors.black }} >Period</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                        <View style={{ width: 14, height: 14, backgroundColor: colors.primaryLight, borderRadius: 7 }}></View>
                        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: colors.black }} >Expected period</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                        <View style={{ width: 14, height: 14, backgroundColor: colors.primaryLight, borderRadius: 7 }}></View>
                        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: colors.black }} >Ovulation</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                        <View style={{ width: 14, height: 14, backgroundColor: colors.primaryLight, borderRadius: 7 }}></View>
                        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: colors.black }} >Fertile</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity onPress={() => {
                navigation.navigate('ScollableInfiniteCalendar')
            }}>
                <View style={{ padding: 15, borderColor: colors.borderColor, borderWidth: 1, borderRadius: 8, flexDirection: 'column', margin: 20, gap: 10 }}>
                    <Text style={{ color: colors.black, textAlign: 'center' }}>Edit periods dates</Text>
                </View>
            </TouchableOpacity>
        </SafeView >

    )
}

export default CalenderScreen

const styles = StyleSheet.create({})