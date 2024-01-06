import React from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import LottieView from 'lottie-react-native';
import { colors } from '../../theme/styles';
import Loader from '../Loader/Loader';
import TranslatedText from '../TranslatedText/TranslatedText';

const OnBoardingItem = ({ item }) => {

    const { width } = useWindowDimensions();

    return (
        <View style={[styles.container, { width }]}>
            <TranslatedText style={[styles.title, { marginTop: 10 }]} adjustsFontSizeToFit >{item.title}</TranslatedText>
            <LottieView
                style={{
                    width: 350,
                    height: 300
                }}
                loop={true}
                source={item.src}
                autoPlay={true}
            />
            <TranslatedText style={styles.subtitle} adjustsFontSizeToFit >{item.subtitle}</TranslatedText>
        </View>
    )
}

export default OnBoardingItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        rowGap: 40,
        alignItems: 'center',
        paddingVertical: 30
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        height: "90%"
    },
    title: {
        fontSize: 23,
        lineHeight: 22,
        paddingHorizontal: 70,
        color: 'black',
        textAlign: 'center',
        color: colors.primary,
        fontFamily: "Inter-Regular"
    },
    subtitle: {
        fontSize: 20,
        lineHeight: 22,
        paddingHorizontal: 30,
        color: colors.darkGrey,
        textAlign: 'center',
        fontFamily: "Inter-Regular"
    }
})

