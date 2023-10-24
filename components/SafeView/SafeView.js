import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SafeView = ({ children }) => {
    return (
        <SafeAreaView style={styles.container}>
            {children}
        </SafeAreaView>
    )
}

export default SafeView

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})