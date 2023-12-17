import { StyleSheet } from 'react-native'
import React from 'react'
import SafeView from '../SafeView/SafeView'
import LottieView from 'lottie-react-native'

const Loader = () => {
    return (
        <SafeView style={{
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <LottieView
                style={{
                    width: 400,
                    height: 400
                }}
                loop={true}
                source={require('../../assets/lottie/loader.json')}
                autoPlay={true}
            />
        </SafeView>
    )
}

export default Loader
