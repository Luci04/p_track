import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'

const TimerHook = ({ seconds, onEnd }) => {

    const [totalTime, setTotalTime] = useState(seconds);

    const formattedTime = useMemo(() => {
        const minutes = Math.floor(totalTime / 60);
        const seconds = totalTime % 60;

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    }, [totalTime]);

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
            <Text>{formattedTime}</Text>
        </View>
    );
};

export default TimerHook;

const styles = StyleSheet.create({});