import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Calendar } from 'react-native-calendars';
import MonthMapping from '../appConst/monthMapping.json'
import { colors } from '../theme/styles';
import IconComponent from '../components/IconComponent/IconComponent';
import SafeView from '../components/SafeView/SafeView';
import moment from 'moment'
import { UserContext } from '../context/UserContext';

const CalenderScreen = ({ navigation }) => {

    const { periodStart, setPeriodStart, markedPeriodDate } = useContext(UserContext);

    const [historyMarkedDates, setHistoryMarkedDates] = useState([])
    const [markingDates, setMarkingDates] = useState({})

    // const parseDates = () => {

    //     console.log("Result", result);

    //     setHistoryMarkedDates(result);
    // }


    function compareDates(dateString1, dateString2) {
        const date1 = new Date(dateString1);
        const date2 = new Date(dateString2);

        if (date1.getTime() === date2.getTime()) {
            return 'equal';
        } else if (date1 < date2) {
            return 'smaller';
        } else {
            return 'greater';
        }
    }

    function calculateOvulationCycle(firstDayOfLastPeriod, cycleLength) {
        // Convert the first day of the last period to a Date object
        const lastPeriodDate = new Date(firstDayOfLastPeriod);

        // Calculate the ovulation date
        const ovulationDate = new Date(lastPeriodDate);
        ovulationDate.setDate(lastPeriodDate.getDate() + (cycleLength - 14)); // Most women ovulate around day 14

        return ovulationDate;
    }

    function calculateFertileRange(firstDayOfLastPeriod, cycleLength) {
        const lastPeriodDate = new Date(firstDayOfLastPeriod);

        const ovulationDay = new Date(lastPeriodDate);
        ovulationDay.setDate(lastPeriodDate.getDate() + Math.floor(cycleLength / 2)); // Estimated ovulation day

        const fertileStart = new Date(ovulationDay);
        fertileStart.setDate(ovulationDay.getDate() - 5); // 5 days before estimated ovulation

        const fertileEnd = new Date(ovulationDay);
        fertileEnd.setDate(ovulationDay.getDate() + 4); // 4 days after estimated ovulation

        return [fertileStart, fertileEnd];
    }

    const markPeriod = () => {

        const result = [];

        if (markedPeriodDate?.length) {

            let currentStartDate = markedPeriodDate[0];
            let length = 1;

            for (let i = 0; i < markedPeriodDate.length; i++) {
                const currentDate = markedPeriodDate[i];
                const nextDate = new Date(currentDate);
                nextDate.setDate(nextDate.getDate() + 1);
                const formattedNextDate = nextDate.toISOString().split('T')[0];

                if (formattedNextDate === markedPeriodDate[i + 1]) {
                    length++;
                } else {
                    result.push({ startDate: currentStartDate, length: length });
                    currentStartDate = markedPeriodDate[i + 1];
                    length = 1;
                }
            }
        }

        result.sort((a, b) => {
            const dateA = new Date(a.startDate);
            const dateB = new Date(b.startDate);

            if (dateA < dateB) {
                return -1;
            } else if (dateA > dateB) {
                return 1;
            } else {
                return 0;
            }
        });


        const tempMark = {};
        const today = moment().format('YYYY-MM-DD');

        let startingDate = periodStart


        if (result.length) {
            startingDate = result[result.length - 1].startDate;

            for (let element of result) {

                if (element.length == 1) {
                    tempMark[element.startDate] = {
                        customStyles: {
                            container: styles.singledateSelection,
                            text: styles.periodDate
                        }
                    }
                } else {

                    tempMark[element.startDate] = {
                        customStyles: {
                            container: compareDates(today, element.startDate) !== 'greater' ? styles.expectedPeriodStartDateStyle : styles.periodStartDateStyle,
                            text: styles.periodDate
                        }
                    }

                    for (let i = 1; i <= element.length - 2; i++) {
                        const currDate = moment(element.startDate).add(i, 'days').format('YYYY-MM-DD')
                        tempMark[currDate] = {
                            customStyles: {
                                container: compareDates(today, currDate) == 'greater' ? styles.periodMiddleDateStyle : styles.expectedPeriodMiddleDateStyle,
                                text: styles.periodDate
                            }
                        }
                    }

                    const currDate = moment(element.startDate).add(element.length - 1, 'days').format('YYYY-MM-DD')

                    tempMark[currDate] = {
                        customStyles: {
                            container: compareDates(today, currDate) == 'greater' ? styles.periodEndDateStyle : styles.expectedPeriodEndDateStyle,
                            text: styles.periodDate
                        }
                    }
                }
            }
        }

        // const x = calculateFertileRange(startingDate, 28)


        for (let j = 0; j < 450; j++) {
            for (let i = 0; i < 5; i++) {

                if (j > 0) {
                    const currDate = moment(startingDate).add(j * 28 + i, 'days').format('YYYY-MM-DD');
                    if (i == 0) {
                        tempMark[currDate] = {
                            customStyles: {
                                container: compareDates(today, currDate) !== 'greater' ? styles.expectedPeriodStartDateStyle : styles.periodStartDateStyle,
                                text: styles.periodDate
                            }
                        }
                    } else if (i == 4) {
                        tempMark[currDate] = {
                            customStyles: {
                                container: compareDates(today, currDate) == 'greater' ? styles.periodEndDateStyle : styles.expectedPeriodEndDateStyle,
                                text: styles.periodDate
                            }
                        }
                    } else {
                        tempMark[currDate] = {
                            customStyles: {
                                container: compareDates(today, currDate) == 'greater' ? styles.periodMiddleDateStyle : styles.expectedPeriodMiddleDateStyle,
                                text: styles.periodDate
                            }
                        }
                    }
                }
            }

            const ovulateDate = moment(calculateOvulationCycle(
                moment(startingDate).add(j * 28, 'days').format('YYYY-MM-DD')
                , 28)).format('YYYY-MM-DD')

            tempMark[ovulateDate] = {
                customStyles: {
                    container: styles.ovulationDateStyle,
                    text: styles.periodDate
                }
            }

            for (let i = 1; i <= 5; i++) {
                const currDate = moment(ovulateDate).subtract(i, 'days').format('YYYY-MM-DD');

                const sameMonth = moment(ovulateDate).isSame(moment(), 'month') && moment(ovulateDate).isSame(moment(), 'year');

                if (sameMonth) {
                    tempMark[currDate] = {
                        customStyles: {
                            container: i == 5 ? styles.fertileStartDateStyle : i == 1 ? styles.fertileEndDateStyle : styles.fertileMiddleDateStyle,
                            text: styles.periodDate
                        }
                    }
                } else {
                    tempMark[currDate] = {
                        customStyles: {
                            container: i == 5 ? styles.expectedFertileStartDateStyle : i == 1 ? styles.expectedFertileEndDateStyle : styles.expectedFertileMiddleDateStyle,
                            text: styles.periodDate
                        }
                    }
                }



            }

            for (let i = 1; i <= 4; i++) {
                const currDate = moment(ovulateDate).add(i, 'days').format('YYYY-MM-DD');

                const sameMonth = moment(ovulateDate).isSame(moment(), 'month') && moment(ovulateDate).isSame(moment(), 'year');

                if (sameMonth) {
                    tempMark[currDate] = {
                        customStyles: {
                            container: i == 4 ? styles.fertileEndDateStyle : i == 1 ? styles.fertileStartDateStyle : styles.fertileMiddleDateStyle,
                            text: styles.periodDate
                        }
                    }
                } else {
                    tempMark[currDate] = {
                        customStyles: {
                            container: i == 4 ? styles.expectedFertileEndDateStyle : i == 1 ? styles.expectedFertileStartDateStyle : styles.expectedFertileMiddleDateStyle,
                            text: styles.periodDate
                        }
                    }
                }
            }
        }
        setPeriodStart(startingDate);
        setMarkingDates(tempMark)
    }

    useEffect(() => {
        // parseDates()
        markPeriod()
    }, [markedPeriodDate])



    return (
        <SafeView style={{ backgroundColor: '#fff' }}>
            <Calendar
                theme={{
                    todayTextColor: colors.white,
                    todayBackgroundColor: colors.primary,
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
                markingType='custom'
                enableSwipeMonths
                renderHeader={(date) => {
                    const currdate = new Date(date);
                    return <Text
                        style={{ fontSize: 25, color: colors.primaryLight, fontFamily: 'Inter-Regular' }}
                    >{MonthMapping[currdate.getMonth()]} {currdate.getFullYear()}</Text>
                }}
            />
            <View style={{ padding: 15, borderColor: colors.borderColor, borderWidth: 1, borderRadius: 8, flexDirection: 'column', margin: 20, gap: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                        <View style={{ width: 14, height: 14, backgroundColor: colors.primaryLight, borderRadius: 7, justifyContent: 'center', alignItems: 'center' }}>
                        </View>
                        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: colors.black }} >Period</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                        <View style={{ width: 14, height: 14, backgroundColor: colors.primaryLight, borderRadius: 7, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: 8, height: 8, backgroundColor: colors.white, borderRadius: 4 }}></View>
                        </View>
                        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: colors.black }} >Expected period</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                        <View style={{ width: 14, height: 14, backgroundColor: '#c6c2ff', borderRadius: 7 }}></View>
                        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: colors.black }} >Ovulation</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                        <View style={{ width: 14, height: 14, backgroundColor: "#e5e7ff", borderRadius: 7 }}></View>
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

const styles = StyleSheet.create({
    periodStartDateStyle: {
        backgroundColor: colors.primaryLight,
        width: "100%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 0,
    },
    periodDate: {
        fontFamily: 'Inter-Regular',
        fontSize: 16
    },
    periodEndDateStyle: {
        backgroundColor: colors.primaryLight,
        width: "100%",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 20,
    },
    periodMiddleDateStyle: {
        backgroundColor: colors.primaryLight,
        width: '100%',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    expectedPeriodStartDateStyle: {
        width: "100%",
        borderWidth: 1,
        borderColor: colors.primaryLight,
        borderRightWidth: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 0,
    },
    expectedPeriodEndDateStyle: {
        width: "100%",
        borderWidth: 1,
        borderColor: colors.primaryLight,
        borderLeftWidth: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 20,
    },
    expectedPeriodMiddleDateStyle: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.primaryLight,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    ovulationDateStyle: {
        // borderWidth: 1,
        backgroundColor: '#c6c2ff',
        borderRadius: 9999
        // borderRadius
    },
    fertileStartDateStyle: {
        backgroundColor: '#e5e7ff',
        width: "100%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 0,
    },
    fertileEndDateStyle: {
        backgroundColor: '#e5e7ff',
        width: "100%",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 20,
    },
    fertileMiddleDateStyle: {
        backgroundColor: '#e5e7ff',
        width: '100%',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    expectedFertileStartDateStyle: {
        width: "100%",
        borderWidth: 1,
        borderColor: '#e5e7ff',
        borderRightWidth: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 0,
    },
    expectedFertileEndDateStyle: {
        width: "100%",
        borderWidth: 1,
        borderColor: '#e5e7ff',
        borderLeftWidth: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 20,
    },
    expectedFertileMiddleDateStyle: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#e5e7ff',
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    singledateSelection: {
        backgroundColor: colors.primaryLight,
        borderRadius: 999,
    },
})