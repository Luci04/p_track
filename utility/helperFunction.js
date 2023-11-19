import notifee, { TriggerType, RepeatFrequency } from '@notifee/react-native';
import Share from 'react-native-share';

export const ShareInfo = (options) => {
    Share.open(options)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            err && console.log(err);
        });
}

export const onCreateTriggerNotification = async () => {
    try {


        const date = new Date(Date.now());
        date.setHours(20);
        date.setMinutes(45);


        // Create a time-based trigger
        const trigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
        };

        // Create a trigger notification
        await notifee.createTriggerNotification(
            {
                title: 'Meeting with Jane',
                body: 'Today at 11:20am',
                android: {
                    channelId: 'default',
                },
            },
            trigger,

        );
        console.log("DOne");

    } catch (error) {
        console.error(error);
    }
}

