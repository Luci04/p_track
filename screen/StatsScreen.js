import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, findNodeHandle } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import SafeView from '../components/SafeView/SafeView'
import { colors } from '../theme/styles'
import emojiMap from '../appConst/emojiMapping';
import CalendarStrip from 'react-native-calendar-strip'
import moment from 'moment';
import { UserContext } from '../context/UserContext';
import { deleteTable, getDBConnection, getNote, readData, saveNote } from '../db-service';


const StatsScreen = () => {

    const [selectedOptions, setSelectedOptions] = useState({
        "Sexual Activity": 4,
        "Symptoms Activity": 9,
        "Moods": 42,
        "Contraception": 49,
    })

    const [futurePeriodDayLeft, setFuturePeriodDayLeft] = useState(0);
    const [customDatesStyles, setCustomDatesStyles] = useState([]);
    const [isPeriodDay, setIsPeriodDay] = useState(false);
    const [nthePeriodDay, setNthPeriodDay] = useState(0);
    const [currentStartDate, setCurrentStartDate] = useState(moment().format('YYYY-MM-DD'))
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'))

    //ScrollView Refs
    const scroll1 = useRef(null)
    const scroll2 = useRef(null)
    const scroll3 = useRef(null)
    const scroll4 = useRef(null)




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
                    startDate: moment(gap.startDate).format('YYYY-MM-DD'), // Single date since no endDate provided
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
                            startDate: moment(gap.startDate).add(j, 'days').format('YYYY-MM-DD'), // Single date since no endDate provided
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
                            startDate: moment(gap.startDate).add(j, 'days').format('YYYY-MM-DD'), // Single date since no endDate provided
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
                            startDate: moment(gap.startDate).add(j, 'days').format('YYYY-MM-DD'), // Single date since no endDate provided
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

        setCustomDatesStyles(tempCustomDateStyle);
    }

    useEffect(() => {
        markingDates();
    }, [periodStart])

    useEffect(() => {
        setSaveOptionVisible(true)

    }, [selectedOptions])

    const fetchSelectedDateInfo = async () => {

        try {

            const result = await getNote(moment().format('YYYY-MM-DD'));

            console.log(result)

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        //Till Cycle Length

        if (customDatesStyles.filter((data) => data.startDate === selectedDate).length) {
            let count = 1;

            for (let i = 1; i < 5; i++) {
                const prevDate = moment(selectedDate).subtract(i, 'days').format('YYYY-MM-DD');
                if (customDatesStyles.filter(data => data.startDate == prevDate).length) {
                    count++;
                } else {
                    break;
                }
            }

            setIsPeriodDay(true);
            setNthPeriodDay(count);
        } else {
            setIsPeriodDay(false);
            setNthPeriodDay(0);
        }

        fetchSelectedDateInfo();

        // scrollToIfSelected();
    }, [currentStartDate])


    const scrollToElement = () => {

        if (selectedOptions['Sexual Activity']) {
            scroll1.current.scrollTo({ x: 0, y: (60 * (selectedOptions['Sexual Activity'])) + (selectedOptions['Sexual Activity'] + 1 > 1 ? 5 * (selectedOptions['Sexual Activity'] + 1) : 0), animated: true });
        }

        if (selectedOptions['Symptoms Activity']) {
            scroll2.current.scrollTo({ x: 0, y: (60 * (selectedOptions['Symptoms Activity'] - 5)) + (selectedOptions['Symptoms Activity'] - 5 + 1 > 1 ? 5 * (selectedOptions['Symptoms Activity'] - 5 + 1) : 0), animated: true });
        }

        if (selectedOptions["Moods"]) {
            scroll3.current.scrollTo({ x: 0, y: (60 * (selectedOptions["Moods"] - 38)) + (selectedOptions["Moods"] - 38 + 1 > 1 ? 5 * (selectedOptions["Moods"] - 38 + 1) : 0), animated: true });
        }

        if (selectedOptions["Contraception"]) {
            scroll4.current.scrollTo({ x: 0, y: (60 * (selectedOptions["Contraception"] - 48)) + (selectedOptions["Contraception"] - 48 + 1 > 1 ? 5 * (selectedOptions["Contraception"] - 48 + 1) : 0), animated: true });
        }
    };

    // const scrollToIfSelected = () => {
    //     if (selectedOptions['Sexual Activity']) {
    //         scroll2.current.scrollTo({ x: 0, y: (60 * (selectedOptions['Sexual Activity'] )) + (selectedOptions['Sexual Activity']-5 > 1 ? 5 * (selectedOptions['Sexual Activity']) : 0), animated: true, viewOffset: 10, });
    //     }

    // }


    // const blackListFutureWeekDays = () => {
    //     const disableCount = 7 - moment().day();

    //     let blackListDate = [];

    //     for (let i = 1; i <= disableCount; i++) {
    //         blackListDate.push(moment().add(i, 'days'));
    //     }

    //     // console.log("BlackList", blackListDate)
    //     return blackListDate;
    // }

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
                    iconStyle={{
                        height: 20,
                        width: 20,
                        margin: 10
                    }}

                    selectedDate={selectedDate}

                    onDateSelected={(data) => {
                        setSelectedDate(moment(data).format('YYYY-MM-DD'));
                    }}

                    daySelectionAnimation={{
                        type: 'background',
                        borderWidth: 1,
                        highlightColor: '#eb848f',

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

                    // datesBlacklist={blackListFutureWeekDays()}

                    disabledDateNameStyle={{ color: 'grey', fontSize: 15 }}

                    disabledDateNumberStyle={{ color: 'grey', fontSize: 15 }}

                    dateNumberStyle={{
                        color: '#000',
                        fontFamily: 'Inter-Regular',
                        fontSize: 15,
                    }}

                    highlightDateNameStyle={{
                        fontFamily: 'Inter-Regular',
                        fontSize: 8,
                    }}

                    highlightDateNumberStyle={{
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

                    <View style={{ gap: 5, paddingVertical: 10 }}  >
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 5 }}>
                            <Text style={{ color: '#000' }}>{"Sexual Activity"}</Text>
                            {/* <Text style={{ color: '#000' }}>Select All</Text> */}
                        </View>
                        <ScrollView
                            horizontal
                            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}
                            showsHorizontalScrollIndicator={false}
                            ref={scroll1}
                        >
                            {emojiMap["Sexual Activity"].map((mood) => (
                                <TouchableOpacity
                                    onPress={() => handleFeelings("Sexual Activity", mood.id)}
                                    key={mood.id}
                                    nativeID={mood.id}
                                >
                                    <View
                                        style={{ gap: 5, width: 60 }}
                                    >
                                        <View style={{
                                            padding: 15,
                                            borderColor: selectedOptions["Sexual Activity"] == mood.id ? colors.primary : '#f7f8f9', borderWidth: 2, borderRadius: 8, justifyContent: 'center', alignItems: 'center'
                                        }}>
                                            <Text style={{ fontSize: 20, color: '#000' }}>{mood.emoji}</Text>
                                        </View>
                                        <Text style={{ fontSize: 9, color: '#000', textAlign: 'center' }} numberOfLines={1}>{mood.title}</Text>
                                    </View>
                                </TouchableOpacity>

                            ))}
                        </ScrollView>
                    </View>

                    <View style={{ gap: 5, paddingVertical: 10 }}  >
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 5 }}>
                            <Text style={{ color: '#000' }}>{"Symptoms Activity"}</Text>
                            {/* <Text style={{ color: '#000' }}>Select All</Text> */}
                        </View>
                        <ScrollView
                            horizontal
                            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}
                            showsHorizontalScrollIndicator={false}
                            ref={scroll2}
                        >
                            {emojiMap["Symptoms Activity"].map((mood) => (
                                <TouchableOpacity
                                    onPress={() => handleFeelings("Symptoms Activity", mood.id)}
                                    key={mood.id}
                                    nativeID={mood.id}
                                >
                                    <View
                                        style={{ gap: 5, width: 60 }}
                                    >
                                        <View style={{
                                            padding: 15,
                                            borderColor: selectedOptions["Symptoms Activity"] == mood.id ? colors.primary : '#f7f8f9', borderWidth: 2, borderRadius: 8, justifyContent: 'center', alignItems: 'center'
                                        }}>
                                            <Text style={{ fontSize: 20, color: '#000' }}>{mood.emoji}</Text>
                                        </View>
                                        <Text style={{ fontSize: 9, color: '#000', textAlign: 'center' }} numberOfLines={1}>{mood.title}</Text>
                                    </View>
                                </TouchableOpacity>

                            ))}
                        </ScrollView>
                    </View>

                    <View style={{ gap: 5, paddingVertical: 10 }}  >
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 5 }}>
                            <Text style={{ color: '#000' }}>{"Moods"}</Text>
                            {/* <Text style={{ color: '#000' }}>Select All</Text> */}
                        </View>
                        <ScrollView
                            horizontal
                            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}
                            showsHorizontalScrollIndicator={false}
                            ref={scroll3}
                        >
                            {emojiMap["Moods"].map((mood) => (
                                <TouchableOpacity
                                    onPress={() => handleFeelings("Moods", mood.id)}
                                    key={mood.id}
                                    nativeID={mood.id}
                                >
                                    <View
                                        style={{ gap: 5, width: 60 }}
                                    >
                                        <View style={{
                                            padding: 15,
                                            borderColor: selectedOptions["Moods"] == mood.id ? colors.primary : '#f7f8f9', borderWidth: 2, borderRadius: 8, justifyContent: 'center', alignItems: 'center'
                                        }}>
                                            <Text style={{ fontSize: 20, color: '#000' }}>{mood.emoji}</Text>
                                        </View>
                                        <Text style={{ fontSize: 9, color: '#000', textAlign: 'center' }} numberOfLines={1}>{mood.title}</Text>
                                    </View>
                                </TouchableOpacity>

                            ))}
                        </ScrollView>
                    </View>

                    <View style={{ gap: 5, paddingVertical: 10 }}  >
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 5 }}>
                            <Text style={{ color: '#000' }}>{"Contraception"}</Text>
                            {/* <Text style={{ color: '#000' }}>Select All</Text> */}
                        </View>
                        <ScrollView
                            horizontal
                            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}
                            showsHorizontalScrollIndicator={false}
                            ref={scroll4}
                        >
                            {emojiMap["Contraception"].map((mood) => (
                                <TouchableOpacity
                                    onPress={() => handleFeelings("Contraception", mood.id)}
                                    key={mood.id}
                                    nativeID={mood.id}
                                >
                                    <View
                                        style={{ gap: 5, width: 60 }}
                                    >
                                        <View style={{
                                            padding: 15,
                                            borderColor: selectedOptions["Contraception"] == mood.id ? colors.primary : '#f7f8f9', borderWidth: 2, borderRadius: 8, justifyContent: 'center', alignItems: 'center'
                                        }}>
                                            <Text style={{ fontSize: 20, color: '#000' }}>{mood.emoji}</Text>
                                        </View>
                                        <Text style={{ fontSize: 9, color: '#000', textAlign: 'center' }} numberOfLines={1}>{mood.title}</Text>
                                    </View>
                                </TouchableOpacity>

                            ))}
                        </ScrollView>
                    </View>

                    {
                        saveOptionVisible ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
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
                            <TouchableOpacity
                                onPress={() => {
                                    console.log(selectedOptions, selectedDate)
                                    saveNote(
                                        {
                                            date: selectedDate,
                                            contraception: selectedOptions["Contraception"],
                                            moods: selectedOptions["Moods"],
                                            sexualActivity: selectedOptions['Sexual Activity'],
                                            symptomsActivity: selectedOptions['Sexual Activity']
                                        })
                                }}
                            >
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