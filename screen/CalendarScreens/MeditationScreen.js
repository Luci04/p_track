import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { colors } from '../../theme/styles';

const MeditationScreen = ({ navigation }) => {

    const width = Dimensions.get("screen").width - 10

    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: 'none'
            }
        });
        return () => navigation.getParent()?.setOptions({
            tabBarStyle: {
                height: 60,
                position: 'absolute',
                bottom: 16,
                left: 16,
                right: 16,
                borderRadius: 16,
                elevation: 1,
                display: 'flex'
            }
        });
    }, [navigation])


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary }}>
            <LottieView style={{ width, height: 500 }} source={require('../../assets/lottie/girl-meditating.json')} autoPlay loop />
        </View>
    )
}

export default MeditationScreen

const styles = StyleSheet.create({})