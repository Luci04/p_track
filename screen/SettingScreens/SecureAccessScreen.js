import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Divider, Switch } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { getDataItem, getDataObject, storeDataItem, storeDataObject } from '../../utility/storage';
import notifee, { TimestampTrigger, TriggerType, RepeatFrequency } from '@notifee/react-native';
import { colors } from '../../theme/styles';
import ReactNativeBiometrics from 'react-native-biometrics';
import { UserContext } from '../../context/UserContext';

const SecureAccessScreen = () => {

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const { setAuthenticated, authenticated } = useContext(UserContext)

    const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })

    const getvar = async () => {
        const data = await getDataObject("SecureAccess")

        if (data) {
            setIsSwitchOn(true);
        } else {
            setIsSwitchOn(false);
        }
    }


    const onToggleSwitch = async (data) => {
        if (data) {
            rnBiometrics
                .simplePrompt({ promptMessage: 'Confirm fingerprint' })
                .then(async (resultObject) => {
                    const { success } = resultObject

                    if (success) {
                        setIsSwitchOn(data);
                        await storeDataObject("SecureAccess", data);
                        setAuthenticated(true)
                    } else {
                        setIsSwitchOn(false);
                        await storeDataObject("SecureAccess", false);
                    }
                })
                .catch(async (err) => {
                    setIsSwitchOn(false);
                    await storeDataObject("SecureAccess", false);
                    console.error(err)
                })

        } else {
            setIsSwitchOn(data);
            await storeDataObject("SecureAccess", data);
        }

    }

    useEffect(() => {
        getvar();
    }, [])

    return (
        <View style={styles.containerStyle}>
            <View style={styles.optionContainer}>
                <View style={styles.rowContainer}>
                    <Text style={styles.optionTitle}>Secure Access</Text>
                    <Text style={styles.optionSubtitle}>Utilizes Biometrics or PIN</Text>
                </View>
                <Switch thumbColor={colors.primary} color={colors.primaryLight} value={isSwitchOn} onValueChange={onToggleSwitch} />
            </View>
        </View>
    )
}

export default SecureAccessScreen

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    optionTitle: {
        fontSize: 16,
        color: colors.black,
        fontFamily: 'Inter-Medium'
    },
    optionSubtitle: {
        fontSize: 14,
        color: colors.darkGrey,
        fontFamily: 'Inter-Regular',
    }

})