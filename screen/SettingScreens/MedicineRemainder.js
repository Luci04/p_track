import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Divider, Switch } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { getDataItem, storeDataItem } from '../../utility/storage';
import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';
import { colors } from '../../theme/styles';

const MedicineRemainder = () => {

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const [selectedTime, setSelectedTime] = React.useState(null);

    async function onCreateTriggerNotification(time) {

        const date = new Date();
        date.setHours(Number(time[0]));
        date.setMinutes(Number(time[1]));

        const trigger = {
            type: TriggerType.TIMESTAMP,
            repeatType:'day' ,
            timestamp: date.getTime(), // Trigger the notification after 1 minute
          };
        
          console.log(date.getTime());
      
        // Create a trigger notification
        await notifee.createTriggerNotification({
          title: "It's Time for Your Medicine",
          body: `Don't forget to take your medication on time.`,
          android: {
            channelId: 'MedicineRemainderNotification',
            pressAction: {
                id: 'default'
            }
          }
        }, trigger);
      }

    const getvar = async () => {
        const data = await getDataItem('MedicineRemainderNotification')

        if(data){
            setSelectedTime(data);
            setIsSwitchOn(true);
        }else{
            setSelectedTime(null);
            setIsSwitchOn(false);
        }
    }


    const onToggleSwitch =async (data) => {
        console.log(data);
        if(data){
            console.log("Date Picker")
            showDatePicker();
        }else{
            console.log("Notification Canclled")
            await notifee.deleteChannel('MedicineRemainderNotification');
        }
        setIsSwitchOn(data);
    }

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = async(date) => {
        const time = moment(date).format('HH:mm').split(':');
        console.log(time)
        storeDataItem('MedicineRemainderNotification', moment(date).format('LT'));
        const channelId = await notifee.createChannel({
            id: 'MedicineRemainderNotification',
            name: 'Default Channel',
          });
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
                <Text style={styles.optionTitle}>Medicine Remainder</Text>
                <Text style={styles.optionSubtitle}>Remind me to take my medicine on time</Text>
                </View>
                <Switch thumbColor={colors.primary} color={colors.primaryLight} value={isSwitchOn} onValueChange={onToggleSwitch} />
            </View>
            <Divider style={{backgroundColor:colors.darkGrey,height:0.5}} />
            
            {
                isSwitchOn ?  <TouchableOpacity disabled={!isSwitchOn} onPress={showDatePicker}>
                <View style={styles.optionContainer}>
                    <Text style={styles.optionTitle}>Time</Text>    
                    <Text style={{ color: "black" }}>
                         {selectedTime? selectedTime : "09:00 AM" }
                    </Text>
                </View>
            </TouchableOpacity>: null
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

export default MedicineRemainder

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1
    },
    optionContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    optionContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:15,
        paddingVertical:15
    },
    optionTitle:{
        fontSize:16,
        color:colors.black,
        fontFamily:'Inter-Medium'
    },
    optionSubtitle:{
        fontSize:14,
        color:colors.darkGrey,
        fontFamily:'Inter-Regular',
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