/**
* Sample React Native App
* https://github.com/facebook/react-native
*/

import React, { useState, useRef, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
} from 'react-native';

import { Picker, DatePicker } from 'react-native-wheel-pick'
import SafeView from '../../components/SafeView/SafeView';
import { colors } from '../../theme/styles';
import { Divider } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import { UserContext } from '../../context/UserContext';


const PeriodPrediction = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const { periodLength, setPeriodLength, periodCycle, setPeriodCycle } = useContext(UserContext)

    // variables
    const refRBSheet1 = useRef();
    const refRBSheet2 = useRef();

    console.log(periodCycle)


    return (
        <SafeView style={styles.containerStyle}>
            <TouchableOpacity onPress={() => refRBSheet1.current.open()}>
                <View style={styles.optionContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.optionTitle}>Period Length</Text>
                        <Text style={styles.optionSubtitle}>Tap to select Period Length</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <Divider style={{ backgroundColor: colors.darkGrey, height: 0.5 }} />

            <TouchableOpacity onPress={() => refRBSheet2.current.open()}>
                <View style={styles.optionContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.optionTitle}>Period Gap</Text>
                        <Text style={styles.optionSubtitle}>Tap to select Period Gap</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <RBSheet
                height={300}
                ref={refRBSheet1}
                dragFromTopOnly={true}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
            >
                <Text style={{ color: colors.primary, fontSize: 18, textAlign: 'center' }}>Period Length</Text>
                <Picker
                    selectedValue={periodLength}
                    style={{ backgroundColor: 'white', width: '100%', height: 215, borderRadius: 20 }}
                    pickerData={[
                        { value: 1, label: '1' },
                        { value: 2, label: '2' },
                        { value: 3, label: '3' },
                        { value: 4, label: '4' },
                        { value: 5, label: '5' },
                        { value: 6, label: '6' },
                        { value: 7, label: '7' },
                        { value: 8, label: '8' },
                        { value: 9, label: '9' },
                        { value: 10, label: '10' }
                    ]}
                    onValueChange={setPeriodLength}
                />
            </RBSheet>

            <RBSheet
                height={300}
                ref={refRBSheet2}
                dragFromTopOnly={true}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
            >
                <Text style={{ color: colors.primary, fontSize: 18, textAlign: 'center' }}>Period Gap</Text>
                <Picker
                    selectedValue={periodCycle}
                    style={{ backgroundColor: 'white', width: '100%', height: 215, borderRadius: 20 }}
                    pickerData={[
                        { value: 15, label: '15' },
                        { value: 16, label: '16' },
                        { value: 17, label: '17' },
                        { value: 18, label: '18' },
                        { value: 19, label: '19' },
                        { value: 20, label: '20' },
                        { value: 21, label: '21' },
                        { value: 22, label: '22' },
                        { value: 23, label: '23' },
                        { value: 24, label: '24' },
                        { value: 25, label: '25' },
                        { value: 26, label: '26' },
                        { value: 27, label: '27' },
                        { value: 28, label: '28' },
                        { value: 29, label: '29' },
                        { value: 30, label: '30' }
                    ]}
                    onValueChange={(value) => {
                        console.log(value);
                        setPeriodCycle(value)
                    }}
                />
            </RBSheet>

        </SafeView>
    );
};

const styles = StyleSheet.create({
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    paragraph: {
        textAlign: 'center',
        color: '#002f2f',
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 18,
    },
    containerStyle: {
        flex: 1
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
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

export default PeriodPrediction;
