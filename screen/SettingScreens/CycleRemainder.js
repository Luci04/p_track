import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Divider, Switch } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { getDataItem, removeValue, storeDataItem } from '../../utility/storage';
import notifee, { TimestampTrigger, TriggerType, RepeatFrequency } from '@notifee/react-native';
import { colors } from '../../theme/styles';

const CycleRemainder = () => {

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const [selectedTime, setSelectedTime] = React.useState(null);

    async function onCreateTriggerNotification(time) {
        const date = new Date();
        const today = new Date();

        if (date >= today) {
            // If it's already past the specified time today, set it for tomorrow
            today.setDate(today.getDate() + 1);
        }

        today.setHours(Number(time[0]));
        today.setMinutes(Number(time[1]));

        const trigger = {
            type: TriggerType.TIMESTAMP,
            repeatFrequency: RepeatFrequency.HOURLY,
            timestamp: today.getTime(), // Trigger the notification at the specified time
        };

        console.log(today.getTime());

        // Create a trigger notification
        await notifee.createTriggerNotification({
            id: "CycleRemainderNotification",
            title: "It's Time for Your Cycle",
            body: `Don't forget to take your Cycle on time.`,
            android: {
                channelId: 'CycleRemainderNotification',
                pressAction: {
                    id: 'default'
                }
            }
        }, trigger);
    }

    const getvar = async () => {
        const data = await getDataItem('CycleRemainderNotification')

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
            await notifee.cancelAllNotifications(['CycleRemainderNotification']);
            await removeValue('CycleRemainderNotification');
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

        const existingChannel = await notifee.getChannel('CycleRemainderNotification');

        if (!existingChannel) {
            const channelId = await notifee.createChannel({
                id: 'CycleRemainderNotification',
                name: 'Default Channel',
            });
        }
        await storeDataItem('CycleRemainderNotification', moment(date).format('LT'));
        await onCreateTriggerNotification(time);
        setSelectedTime(time)
        hideDatePicker();
    };

    useEffect(() => {
        getvar();
    }, [selectedTime])

    return (
        <View style={styles.containerStyle}>
            <View style={styles.optionContainer}>
                <View style={styles.rowContainer}>
                    <Text style={styles.optionTitle}>Period Reminder</Text>
                    <Text style={styles.optionSubtitle}>Embrace Your Cycle, Stay in Sync</Text>
                </View>
                <Switch thumbColor={colors.primary} color={colors.primaryLight} value={isSwitchOn} onValueChange={onToggleSwitch} />
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
    )
}

export default CycleRemainder

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
        fontFamily: 'Inter-Regular',
    }

})