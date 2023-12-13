import React from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import LottieView from 'lottie-react-native';

const OnBoardingItem = ({ item }) => {

    const { width } = useWindowDimensions();

    return (
        <View style={[styles.container, { width }]}>
            <Text style={[styles.title, { marginTop: 10 }]} >{item.title}</Text>
            <LottieView
                style={{
                    width: 350,
                    height: 300
                }}
                loop={true}
                source={item.src}
                autoPlay={true}
            />
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
        fontSize: 16,
        lineHeight: 22,
        paddingHorizontal: 70,
        color: 'black',
        textAlign: 'center',
        fontFamily: "Montserrat-Medium"
    }
})

