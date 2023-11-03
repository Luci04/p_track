import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import IconComponent from '../IconComponent/IconComponent'
import { colors } from '../../theme/styles'
import LinearGradient from 'react-native-linear-gradient';

const PremiumBar = () => {
    return (
        <TouchableOpacity activeOpacity={0.7}>
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#f5a7d3', '#f5a7d3', '#f5a7d3', '#f5a7d3', '#f5a1d0', '#f5e3ed']} style={styles.linearGradient}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text style={{ color: colors.black, fontFamily: 'Inter-Medium' }}><Text style={{ color: colors.primaryLight }}>30% off </Text>Premium</Text>
                        <Text style={{ color: colors.black, fontFamily: 'Inter-Light' }}>Expires in 23:14</Text>
                    </View>
                    <View>
                        <IconComponent iconType={'MaterialCommunityIcons'}
                            size={45}
                            color={colors.primary}
                            iconName={'chess-queen'}
                        />
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default PremiumBar

const styles = StyleSheet.create({
    linearGradient: {
        padding: 10,
        borderRadius: 10,
        margin: 20
    }
})