import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const TimerHook = ({ seconds, onEnd }) => {

    const [totalTime, setTotalTime] = useState(seconds);

    useEffect(() => {
        const timerId = setInterval(() => {
            setTotalTime(prevTotalTime => {
                if (prevTotalTime === 1) {
                    console.log("Ended Timer");
                    clearInterval(timerId);
                    onEnd();
                    return 0;
                } else {
                    return prevTotalTime - 1;
                }
            });
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []); // Removed [totalTime] dependency

    useEffect(() => {
        if (totalTime === 0) {
            console.log("Ended Timer");
            onEnd();
        }
    }, [totalTime, onEnd]);

    return (
        <View>
            <Text>{totalTime}</Text>
        </View>
    );
};

export default TimerHook;

const styles = StyleSheet.create({});