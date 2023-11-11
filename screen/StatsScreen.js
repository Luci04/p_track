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
    const [saveOptionVisible, setSaveOptionVisible] = useState(false)

    const { periodStart, setPeriodStart, markedPeriodDate, DateHistory, setDateHistory } = useContext(UserContext);

    let customDatesStyles = [];
    let startDate = moment(periodStart, 'YYYY-MM-DD');

    for (let i = 0; i < 6; i++) {
        if (i == 0) {
            customDatesStyles.push({
                startDate: startDate.clone().add(i, 'days'), // Single date since no endDate provided
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
        } else if (i == 5) {
            customDatesStyles.push({
                startDate: startDate.clone().add(i, 'days'), // Single date since no endDate provided
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
            customDatesStyles.push({
                startDate: startDate.clone().add(i, 'days'), // Single date since no endDate provided
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

    const markingDates = () => {

    }

    useEffect(() => {
        markingDates();
    }, [])

    useEffect(() => {
        setSaveOptionVisible(true)
    }, [selectedOptions])



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
                    maxDate={moment().add(1, 'days').format('YYYY-MM-DD')}
                    dateNumberStyle={{
                        color: '#000',
                        fontFamily: 'Inter-Regular',
                        fontSize: 15,
                    }}

                />
                <View style={{ paddingHorizontal: 20, }}>
                    <View style={{ paddingTop: 10, }}>
                        <Text style={styles.heading}>Period</Text>
                        <Text style={styles.heading}>day 2</Text>
                        <Text style={styles.desc}>Hey Christa.How are you feeling today?</Text>
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
                                            onPress={() => setSelectedOptions({ ...selectedOptions, [type]: mood.title })}
                                            key={mood.id}>
                                            <View
                                                style={{ gap: 5, width: 60 }}
                                            >
                                                <View style={{ padding: 15, borderColor: selectedOptions[type] === mood.title ? colors.primary : '#f7f8f9', borderWidth: 2, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
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