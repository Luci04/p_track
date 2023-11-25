import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Switch } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { getDataItem, storeDataItem } from '../../utility/storage';

const MedicineRemainder = () => {

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const [selectedTime, setSelectedTime] = React.useState(null);

    const getvar = async () => {
        const data = await getDataItem('MedicineRemainderTime')

        setSelectedTime(data);
    }


    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const time = moment(date).format('LT');
        storeDataItem('MedicineRemainderTime', time);
        setSelectedTime(time)
        hideDatePicker();
    };

    useEffect(() => {
        getvar();
    }, [selectedTime])



    return (
        <View style={styles.containerStyle}>
            <View style={styles.optionContainer}>
                <Text style={{ color: "black" }}>Notication</Text>
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            </View>
            <TouchableOpacity onPress={showDatePicker}>
                <View style={styles.optionContainer}>
                    <Text style={{ color: "black" }}>Time</Text>
                    <Text style={{ color: "black" }}>
                        {
                            selectedTime ? selectedTime : "09:00 AM"
                        }</Text>
                </View>
            </TouchableOpacity>


            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    )
}

export default MedicineRemainder

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1
    },
    optionContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    }

})

// import React, { useState, useEffect } from 'react';
// import BackgroundTask from
 
// 'react-native-background-task';
// import PushNotification from
 
// 'react-native-push-notification';

// const Reminder = () => {
//   const [isReminderEnabled, setIsReminderEnabled] = useState(false); // Track reminder status

//   useEffect(() => {
//     // Check if reminder is enabled in AsyncStorage
//     const loadReminderSettings = async () => {
//       const reminderSettings = await AsyncStorage.getItem('reminderSettings');
//       if (reminderSettings) {
//         const isReminderEnabled = reminderSettings.isReminderEnabled;
//         setIsReminderEnabled(isReminderEnabled);
//       }
//     };
//     loadReminderSettings();

//     // Set up background task
//     BackgroundTask.register({
//       taskId: 'reminderCheck',
//       delay: 60000, // Check every minute
//       onStart: async () => {
//         // Check if reminder is enabled before proceeding
//         if (isReminderEnabled) {
//           // Check reminder time and trigger notification
//           const currentDate = new Date();
//           const reminderTime = new Date('09:00'); // Set reminder time to 9:00 AM
//           if (currentDate.getTime() === reminderTime.getTime()) {
//             PushNotification.localNotification({
//               title: 'Reminder',
//               message: 'Your daily reminder is here!',
//             });
//           }
//         }

//         BackgroundTask.finish();
//       },
//     });
//   }, [isReminderEnabled]);

//   const toggleReminder = () => {
//     setIsReminderEnabled((prevState) => !prevState); // Toggle reminder state

//     // Update reminder settings in AsyncStorage
//     const updateReminderSettings = async () => {
//       await AsyncStorage.setItem('reminderSettings', {
//         isReminderEnabled: isReminderEnabled,
//       });
//     };
//     updateReminderSettings();
//   };

//   return (
//     <View>
//       <Text>Daily Reminder</Text>
//       <Switch value={isReminderEnabled} onValueChange={toggleReminder} />
//     </View>
//   );
// };