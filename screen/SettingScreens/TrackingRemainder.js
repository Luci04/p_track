import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Divider, Switch } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { getDataItem, removeValue, storeDataItem } from '../../utility/storage';
import notifee, { TimestampTrigger, TriggerType, RepeatFrequency } from '@notifee/react-native';
import { colors } from '../../theme/styles';
import SafeView from '../../components/SafeView/SafeView';

const TrackingRemainder = () => {

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const [selectedTime, setSelectedTime] = React.useState(null);

    async function onCreateTriggerNotification(time) {
        const date = new Date();
        const today = new Date();

        today.setHours(Number(time[0]));
        today.setMinutes(Number(time[1]));

        if (date >= today) {
            // If it's already past the specified time today, set it for tomorrow
            today.setDate(today.getDate() + 1);
        }

        const trigger = {
            type: TriggerType.TIMESTAMP,
            repeatFrequency: RepeatFrequency.HOURLY,
            timestamp: today.getTime(), // Trigger the notification at the specified time
        };

        console.log(today.getTime());

        // Create a trigger notification
        await notifee.createTriggerNotification({
            id: 'TrackingRemainderNotification',
            title: "It's Time for Your Tracking",
            body: `Don't forget to take your Tacking on time.`,
            android: {
                channelId: 'TrackingRemainderNotification',
                pressAction: {
                    id: 'default'
                }
            }
        }, trigger);
    }

    const getvar = async () => {
        const data = await getDataItem('TrackingRemainderNotification')

        if (data) {
            setSelectedTime(data);
            setIsSwitchOn(true);
        } else {
            setSelectedTime(null);
            setIsSwitchOn(false);
        }
    }


    const onToggleSwitch = async (data) => {
        console.log(data);
        if (data) {
            console.log("Date Picker")
            showDatePicker();
        } else {
            console.log("Notification Cancelled")
            await notifee.cancelAllNotifications(['TrackingRemainderNotification']);
            await removeValue('TrackingRemainderNotification');
        }
        setIsSwitchOn(data);
    }

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setIsSwitchOn(false);
        setDatePickerVisibility(false);
    };

    const handleConfirm = async (date) => {
        const time = moment(date).format('HH:mm').split(':');
        console.log(time)

        const existingChannel = await notifee.getChannel('TrackingRemainderNotification');

        if (!existingChannel) {
            const channelId = await notifee.createChannel({
                id: 'TrackingRemainderNotification',
                name: 'Default Channel',
            });
        }
        await storeDataItem('TrackingRemainderNotification', moment(date).format('LT'));
        await onCreateTriggerNotification(time);
        setSelectedTime(time)
        hideDatePicker();
    };

    useEffect(() => {
        getvar();
    }, [selectedTime])

    return (<SafeView>
        <View style={styles.containerStyle}>
            <View style={{ ...styles.optionContainer, width: Dimensions.get('window').width }}>
                <View style={styles.rowContainer}>
                    <Text style={styles.optionTitle}>Tracking Reminder
                        <Text style={styles.optionSubtitle}>{'\n'} Achieve Your Goals with Precision</Text>
                    </Text>
                </View>
                <Switch style={{ flex: 1, maxWidth: 36 }} thumbColor={colors.primary} color={colors.primaryLight} value={isSwitchOn} onValueChange={onToggleSwitch} />
            </View>
            <Divider style={{ backgroundColor: colors.darkGrey, height: 0.5 }} />

            {
                isSwitchOn ? <TouchableOpacity disabled={!isSwitchOn} onPress={showDatePicker}>
                    <View style={styles.optionContainer}>
                        <Text style={styles.optionTitle}>Time</Text>
                        <Text style={{ color: "black" }}>
                            {selectedTime ? selectedTime : "09:00 AM"}
                        </Text>
                    </View>
                </TouchableOpacity> : null
            }



            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    </SafeView>
    )
}

export default TrackingRemainder

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    optionTitle: {
        fontSize: 16,
        color: colors.black,
        fontFamily: 'Inter-Medium'
    },
    optionSubtitle: {
        fontSize: 14,
        color: colors.darkGrey,
        fontFamily: 'Inter-Regular'
    }

})