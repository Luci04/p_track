import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import SafeView from '../components/SafeView/SafeView'
import { colors } from '../theme/styles'
import emojiMap from '../appConst/emojiMapping';
import CalendarStrip from 'react-native-calendar-strip'
import moment from 'moment';
import { UserContext } from '../context/UserContext';


const StatsScreen = () => {

    const [selectedOptions, setSelectedOptions] = useState({
        "Sexual Activity": null,
        "Symptoms Activity": null,
        "Moods": null,
        "Contraception": null,
    })

    const [futurePeriodDayLeft, setFuturePeriodDayLeft] = useState(0);
    const [customDatesStyles, setCustomDatesStyles] = useState([]);
    const [isPeriodDay, setIsPeriodDay] = useState(false);
    const [nthePeriodDay, setNthPeriodDay] = useState(0);




    const [saveOptionVisible, setSaveOptionVisible] = useState(false);

    const { periodStart, setPeriodStart, markedPeriodDate, DateHistory, setDateHistory } = useContext(UserContext);

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


    const markingDates = () => {

        console.log(periodStart);

        let maxPeriodDateSmallerThanCurrent = null;
        let minPeriodDateGreaterThanCurrent = null;


        const tempCustomDateStyle = [];

        const result = [];

        if (markedPeriodDate?.length) {

            let currentStartDate = markedPeriodDate[0];
            let length = 1;

            for (let i = 0; i < markedPeriodDate.length; i++) {
                const currentDate = markedPeriodDate[i];
                const nextDate = new Date(currentDate);
                nextDate.setDate(nextDate.getDate() + 1);
                const formattedNextDate = nextDate.toISOString().split('T')[0];

                if (maxPeriodDateSmallerThanCurrent == null) {
                    maxPeriodDateSmallerThanCurrent = formattedNextDate;
                }

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

        for (const element of result) {
            const gap = element;
            if (gap.length == 1) {
                tempCustomDateStyle.push({
                    startDate: moment(gap.startDate), // Single date since no endDate provided
                    dateNameStyle: styles.dateNameStyle,
                    dateNumberStyle: styles.dateNumberStyle,
                    dateContainerStyle: {
                        backgroundColor: colors.primaryLight,
                        width: "100%",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                    }
                });
            } else {
                for (let j = 0; j < gap.length; j++) {
                    if (j == 0) {
                        tempCustomDateStyle.push({
                            startDate: moment(gap.startDate).add(j, 'days'), // Single date since no endDate provided
                            dateNameStyle: styles.dateNameStyle,
                            dateNumberStyle: styles.dateNumberStyle,
                            dateContainerStyle: {
                                backgroundColor: colors.primaryLight,
                                width: "100%",
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 0,
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 0,
                            }
                        });
                    } else if (j == gap.length - 1) {
                        tempCustomDateStyle.push({
                            startDate: moment(gap.startDate).add(j, 'days'), // Single date since no endDate provided
                            dateNameStyle: styles.dateNameStyle,
                            dateNumberStyle: styles.dateNumberStyle,
                            dateContainerStyle: {
                                backgroundColor: colors.primaryLight,
                                width: "100%",
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 20,
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 20,
                            },
                        });
                    } else {
                        tempCustomDateStyle.push({
                            startDate: moment(gap.startDate).add(j, 'days'), // Single date since no endDate provided
                            dateNameStyle: styles.dateNameStyle,
                            dateNumberStyle: styles.dateNumberStyle,
                            dateContainerStyle: {
                                backgroundColor: colors.primaryLight,
                                width: "100%",
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                            },
                        });
                    }
                }
            }
        }

        for (let j = 1; j < 450; j++) {

            const conditionalDate = moment(periodStart).add(j * 28, 'days').format('YYYY-MM-DD');

            if (compareDates(conditionalDate, moment().format('YYYY-MM-DD')) === 'greater') {
                break;
            }

            for (let i = 0; i < 5; i++) {
                const currDate = moment(periodStart).add(j * 28 + i, 'days').format('YYYY-MM-DD');


                if (i == 0) {
                    tempCustomDateStyle.push({
                        startDate: currDate, // Single date since no endDate provided
                        dateNameStyle: styles.dateNameStyle,
                        dateNumberStyle: styles.dateNumberStyle,
                        dateContainerStyle: {
                            backgroundColor: colors.primaryLight,
                            width: "100%",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 0,
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 0,
                        }
                    });

                } else if (i == 4) {
                    tempCustomDateStyle.push({
                        startDate: currDate,
                        dateNameStyle: styles.dateNameStyle,
                        dateNumberStyle: styles.dateNumberStyle,
                        dateContainerStyle: {
                            backgroundColor: colors.primaryLight,
                            width: "100%",
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 20,
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 20,
                        },
                    });
                } else {
                    tempCustomDateStyle.push({
                        startDate: currDate,
                        dateNameStyle: styles.dateNameStyle,
                        dateNumberStyle: styles.dateNumberStyle,
                        dateContainerStyle: {
                            backgroundColor: colors.primaryLight,
                            width: "100%",
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                        },
                    });
                }

            }

        }

        const today = moment().format('YYYY-MM-DD')

        console.log("Today::", today)

        //Till Cycle Length

        if (tempCustomDateStyle.filter((data) => data.startDate == today).length) {
            let count = 1;

            for (let i = 1; i < 5; i++) {
                const prevDate = moment().subtract(i, 'days').format('YYYY-MM-DD');
                if (tempCustomDateStyle.filter(data => data.startDate == prevDate).length) {
                    count++;
                } else {
                    break;
                }
            }

            setIsPeriodDay(true);
            setNthPeriodDay(count);
        }




        setCustomDatesStyles(tempCustomDateStyle);
    }

    useEffect(() => {
        markingDates();
    }, [periodStart])

    useEffect(() => {
        setSaveOptionVisible(true)
    }, [selectedOptions])

    const blackListFutureWeekDays = () => {
        const disableCount = 7 - moment().day();

        let blackListDate = [];

        for (let i = 1; i <= disableCount; i++) {
            blackListDate.push(moment().add(i, 'days'));
        }

        console.log(blackListDate)

        return blackListDate;
    }

    const handleFeelings = (type, id) => {
        const currSelectedOption = selectedOptions;

        if (currSelectedOption[type] === id) {
            setSelectedOptions({ ...selectedOptions, [type]: null })
        } else {
            setSelectedOptions({ ...selectedOptions, [type]: id })
        }
    }

    return (
        <SafeView style={{
            flex: 1,
        }}>
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 85, gap: 15
                }}
            >
                <CalendarStrip
                    onDateSelected={(data) => {
                        console.log(data);
                    }}
                    daySelectionAnimation={{
                        type: 'background',
                        borderWidth: 1,
                        highlightColor: '#eb848f'
                    }}
                    customDatesStyles={customDatesStyles}
                    calendarHeaderContainerStyle={{
                        paddingBottom: 10
                    }}
                    calendarHeaderStyle={{
                        fontFamily: 'Inter-Thin',
                        color: colors.primary,
                        fontSize: 18,
                    }}
                    style={{
                        paddingVertical: 10,
                        height: 100
                    }}
                    dateNameStyle={{
                        color: '#bfc0c7',
                        fontSize: 6,
                        fontFamily: 'Inter-Regular',
                    }}
                    maxDate={moment().format("YYYY-MM-DD")}
                    datesBlacklist={blackListFutureWeekDays()}
                    disabledDateNameStyle={{ color: 'grey' }}
                    disabledDateNumberStyle={{ color: 'grey' }}
                    dateNumberStyle={{
                        color: '#000',
                        fontFamily: 'Inter-Regular',
                        fontSize: 15,
                    }}


                />
                <View style={{ paddingHorizontal: 20, }}>
                    <View style={{ paddingTop: 10, }}>
                        {
                            isPeriodDay ? <>
                                <Text style={styles.heading}>Period</Text>
                                <Text style={styles.heading}>day {nthePeriodDay}</Text>
                                <Text style={styles.desc}>Hey Christa.How are you feeling today?</Text>
                            </>
                                : null
                        }

                    </View>
                    {
                        Object.keys(emojiMap).map(type => {
                            return <ScrollView key={type} contentContainerStyle={{ gap: 5, paddingVertical: 10 }}  >
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 5 }}>
                                    <Text style={{ color: '#000' }}>{type}</Text>
                                    {/* <Text style={{ color: '#000' }}>Select All</Text> */}
                                </View>
                                <ScrollView
                                    horizontal
                                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    {emojiMap[type].map((mood) => (
                                        <TouchableOpacity
                                            onPress={() => handleFeelings(type, mood.id)}
                                            key={mood.id}>
                                            <View
                                                style={{ gap: 5, width: 60 }}
                                            >
                                                <View style={{ padding: 15, borderColor: selectedOptions[type] === mood.id ? colors.primary : '#f7f8f9', borderWidth: 2, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 20, color: '#000' }}>{mood.emoji}</Text>
                                                </View>
                                                <Text style={{ fontSize: 9, color: '#000', textAlign: 'center' }} numberOfLines={1}>{mood.title}</Text>
                                            </View>
                                        </TouchableOpacity>

                                    ))}
                                </ScrollView>
                            </ScrollView>
                        })
                    }

                    {
                        saveOptionVisible ? <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setSaveOptionVisible(false);
                                }}
                            >
                                <View style={{ backgroundColor: colors.primary, paddingHorizontal: 20, paddingVertical: 15, borderRadius: 10 }}>
                                    <Text style={{ color: '#fff', fontSize: 15 }}>
                                        Cancle
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={{ backgroundColor: colors.primary, paddingHorizontal: 20, paddingVertical: 15, borderRadius: 10 }}>
                                    <Text style={{ color: '#fff', fontSize: 15 }}>
                                        Save
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View> : null
                    }
                </View>
            </ScrollView>
        </SafeView>
    )
}

export default StatsScreen

const styles = StyleSheet.create({
    heading: {
        fontSize: 80,
        lineHeight: 80,
        fontFamily: 'Inter-Bold',
        color: colors.primary,
    },
    desc: {
        paddingVertical: 10,
        fontSize: 25,
        fontFamily: 'Inter-SemiBold',
        color: '#bfc0c7'
    },
    dateNameStyle: {
        color: '#fff',
        fontSize: 6
    },
    dateNumberStyle: {
        color: '#fff',
        fontSize: 15
    }
})