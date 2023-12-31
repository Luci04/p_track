import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SafeView = ({ children, style }) => {
    return (
        <SafeAreaView style={{ ...styles.container, ...style }}>
            {children}
        </SafeAreaView>
    )
}

export default SafeView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})