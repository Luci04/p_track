import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { CalendarList } from 'react-native-calendars'
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/styles';
import XDate from 'xdate'
import SafeView from '../SafeView/SafeView';
import Modal from "react-native-modal";
import { UserContext } from '../../context/UserContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import TranslatedText from '../TranslatedText/TranslatedText';



const ScollableInfiniteCalendar = () => {

    const { markedPeriodDate, setMarkedPeriodDate, periodLength } = useContext(UserContext);


    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const navigation = useNavigation();

    const [state, setState] = useState({
        isFromDatePicked: false,
        isToDatePicked: false,
        markedDates: {},
        fromDate: '',
        holidayList: {}
    })

    const [selectedDates, setSelectedDates] = useState(markedPeriodDate)

    const setupMarketDate = (fromDate, toDate, markedDates) => {

        let mFromDate = new XDate(fromDate);
        let mToDate = new XDate(toDate);
        let range = mFromDate.diffDays(mToDate);

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

    function generateDateObject(dateArray) {
        const dateObject = {};


        for (const element of dateArray) {
            const formattedDate = element;

            const customStyles = {
                startingDay: true,
                customStyles: {
                    container: styles.singledateSelection,
                    text: styles.textStyle
                }
            };

            dateObject[formattedDate] = customStyles;
        }

        return dateObject;
    }

    function sortDateRangesByStartDate(dateRanges) {
        dateRanges.sort((a, b) => {
            const dateA = new Date(a);
            const dateB = new Date(b);

            if (dateA < dateB) {
                return -1;
            } else if (dateA > dateB) {
                return 1;
            } else {
                return 0;
            }
        });

        return dateRanges;
    }

    const saveDate = () => {
        setMarkedPeriodDate(sortDateRangesByStartDate(selectedDates));
        navigation.goBack();
    }


    return (
        <SafeView>
            <CalendarList
                style={{ height: "90%" }}
                onDayPress={(d) => {
                    if (selectedDates.filter(date => date === d.dateString).length) {
                        setSelectedDates(selectedDates.filter(date => date !== d.dateString));
                    } else {

                        let dateArray = [d.dateString];

                        for (let i = 1; i < periodLength; i++) {
                            dateArray.push(moment(d.dateString).add(i, 'days').format('YYYY-MM-DD'));
                        }

                        const UniquesDates = new Set([...selectedDates, ...dateArray]);

                        setSelectedDates(Array.from(UniquesDates));
                    }
                }}
                pastScrollRange={3}
                futureScrollRange={0}
                markingType={'custom'}
                markedDates={generateDateObject(selectedDates)}
                theme={{
                    textDayFontFamily: 'Inter-Regular',
                    textMonthFontFamily: 'Inter-Regular',
                    todayTextColor: colors.primary,
                    calendarBackground: colors.white
                }}
                firstDay={1}
                maxDate={moment().format('YYYY-MM-DD')}
            />
            <View style={{
                backgroundColor: '#fff',
                alignItems: 'center',
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-around'
            }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <View style={{
                        backgroundColor: colors.primary,
                        paddingHorizontal: 25,
                        paddingVertical: 15,
                        borderRadius: 50
                    }}>
                        <TranslatedText style={{ color: '#fff' }}>
                            cancle
                        </TranslatedText>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={saveDate}
                >
                    <View style={{
                        paddingHorizontal: 25,
                        paddingVertical: 15,
                        borderRadius: 50
                    }}>
                        <TranslatedText style={{ color: colors.primary }}>
                            save
                        </TranslatedText>
                    </View>
                </TouchableOpacity>
            </View>
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
    singledateSelection: {
        backgroundColor: colors.primaryLight,
        borderRadius: 999,
    },
    textStyle: {
        fontSize: 15,
        color: colors.white
    },
    disableDateStyle: {
        backgroundColor: 'transparent'
    }

})