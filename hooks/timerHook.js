import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { colors } from '../theme/styles';

const TimerHook = ({ seconds, onEnd }) => {
    const [totalTime, setTotalTime] = useState(seconds);
    const [isRunning, setIsRunning] = useState(false);
    const timerIdRef = useRef(null);

    const formattedTime = useMemo(() => {
        const minutes = Math.floor(totalTime / 60);
        const seconds = totalTime % 60;

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    }, [totalTime]);

    const stopTimer = () => {
        clearInterval(timerIdRef.current);
        setIsRunning(false);
    };

    const startTimer = () => {
        if (!isRunning) {
            setIsRunning(true);
            const timerId = setInterval(() => {
                setTotalTime((prevTotalTime) => {
                    if (prevTotalTime === 1) {
                        console.log('Ended Timer');
                        clearInterval(timerId);
                        onEnd();
                        setIsRunning(false);
                        return 0;
                    } else {
                        return prevTotalTime - 1;
                    }
                });
            }, 1000);

            timerIdRef.current = timerId;
        }
    };

    useEffect(() => {
        if (totalTime === 0 && isRunning) {
            console.log('Ended Timer');
            onEnd();
            setIsRunning(false);
        } else {
            startTimer();
        }
    }, [totalTime, isRunning, onEnd]);

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, color: '#fff' }}>{formattedTime}</Text>
            {isRunning ? (
                <TouchableOpacity
                    onPress={stopTimer}
                    style={{
                        width: 'auto',
                        backgroundColor: '#fff',
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        borderRadius: 5,
                        marginTop: 25,
                    }}
                >
                    <Text style={{ color: colors.primary }}>Pause</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={startTimer}
                    style={{
                        width: 'auto',
                        backgroundColor: '#fff',
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        borderRadius: 5,
                        marginTop: 25,
                    }}
                >
                    <Text style={{ color: colors.primary }}>Start</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default TimerHook;

const styles = StyleSheet.create({});
