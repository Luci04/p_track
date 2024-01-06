import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Divider, Switch } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { getDataItem, removeValue, storeDataItem } from '../../utility/storage';
import notifee, { TimestampTrigger, TriggerType, RepeatFrequency } from '@notifee/react-native';
import { colors } from '../../theme/styles';

const MeditationRemainder = () => {

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
            repeatType: RepeatFrequency.DAILY,
            timestamp: today.getTime(), // Trigger the notification at the specified time
        };

        console.log(today.getTime());

        // Create a trigger notification
        await notifee.createTriggerNotification({
            title: "It's Time for Your Medicine",
            body: `Don't forget to take your medication on time.`,
            android: {
                channelId: 'MeditationRemainderNotification',
                pressAction: {
                    id: 'default'
                }
            }
        }, trigger);
    }

    const getvar = async () => {
        const data = await getDataItem('MeditationRemainderNotification')

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
            console.log("Notification Canclled")
            await notifee.deleteChannel('MeditationRemainderNotification');
            await removeValue('MeditationRemainderNotification');
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

        const existingChannel = await notifee.getChannel('ContraceptionRemainderNotification');

        if (!existingChannel) {
            const channelId = await notifee.createChannel({
                id: 'MeditationRemainderNotification',
                name: 'Default Channel',
            });
        }

        await storeDataItem('MeditationRemainderNotification', moment(date).format('LT'));
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
                    <Text style={styles.optionTitle}>Meditation Reminder</Text>
                    <Text style={styles.optionSubtitle}>Find Peace Within, One Breath at a Time</Text>
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

export default MeditationRemainder

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