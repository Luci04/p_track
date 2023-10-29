import { StyleSheet, Text, View, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CalendarList } from 'react-native-calendars'
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/styles';
import XDate from 'xdate'
import SafeView from '../SafeView/SafeView';
import Modal from "react-native-modal";



const ScollableInfiniteCalendar = () => {


    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };

    const navigation = useNavigation();

    const [state, setState] = useState({
        isFromDatePicked: false,
        isToDatePicked: false,
        markedDates: {},
        fromDate: '',
        holidayList: {}
    })

    const setupMarketDate = (fromDate, toDate, markedDates) => {

        let mFromDate = new XDate(fromDate);
        let mToDate = new XDate(toDate);

        let range = mFromDate.diffDays(mToDate);

        console.log(range);

        if (range > 0) {

            for (let i = 1; i <= range; i++) {

                let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd');

                let dateList = Object.keys(state.holidayList);

                let filterList = dateList.filter(d => d == tempDate);

                if (filterList[0] == tempDate) {
                    break;
                } else {
                    if (i < range) {
                        markedDates[tempDate] = {
                            customStyles: {
                                container: styles.middleDateStyle,
                                text: styles.textStyle
                            }
                        }
                    } else {
                        markedDates[tempDate] = {
                            endingDay: true,
                            customStyles: {
                                container: styles.endDateStyle,
                                text: styles.textStyle
                            }
                        }
                    }
                }

            }
        }

        return [markedDates, range]

    }

    const onDayPress = (day) => {
        if (!state.isFromDatePicked || (state.isFromDatePicked && state.isToDatePicked)) {
            setupStartMarker(day);
        } else if (!state.isToDatePicked) {
            let markedDates = { ...state.markedDates };

            let [mMarkedDates, range] = setupMarketDate(
                state.fromDate,
                day.dateString,
                markedDates,
            )

            if (range >= 0) {
                setState({
                    ...state,
                    isFromDatePicked: true,
                    isToDatePicked: true,
                    markedDates: mMarkedDates,
                })

                //OnSuccess
            } else {
                setupStartMarker(day);
            }
        }
    }

    const setupStartMarker = (day) => {
        let markedDate = {
            [day.dateString]: {
                startingDay: true,
                customStyles: {
                    container: styles.startDateStyle,
                    text: styles.textStyle
                }
            }
        }

        setState({
            ...state,
            fromDate: day.dateString,
            isFromDatePicked: true,
            isToDatePicked: false,
            markedDates: markedDate
        })
    }

    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
        return () =>
            navigation.getParent()?.setOptions({
                tabBarStyle: {
                    height: 60,
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    right: 16,
                    borderRadius: 16,
                    elevation: 1,
                    display: 'flex'
                },
            });
    }, [navigation]);


    return (
        <SafeView>

            <Modal>
                <View style={{ flex: 1 }}>
                    <Text>I am the modal content!</Text>
                </View>
            </Modal>

            <CalendarList
                onDayPress={onDayPress}
                pastScrollRange={3}
                futureScrollRange={3}
                markingType={'custom'}
                markedDates={state.markedDates}
                theme={{
                    calendarBackground: colors.white
                }}
                firstDay={1}
            />
        </SafeView>

    )
}

export default ScollableInfiniteCalendar

const styles = StyleSheet.create({
    startDateStyle: {
        backgroundColor: colors.primary,
        width: "100%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 0,
        borderWidth: 1,
        borderColor: colors.black
    },
    endDateStyle: {
        backgroundColor: colors.primary,
        width: "100%",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 20,
        borderWidth: 1,
        borderColor: colors.black
    },
    middleDateStyle: {
        backgroundColor: colors.primaryLight,
        width: '100%',
        borderRightWidth: 0,
        borderColor: colors.black,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    textStyle: {
        fontSize: 15,
        color: colors.white
    },
    disableDateStyle: {
        backgroundColor: 'transparent'
    }

})