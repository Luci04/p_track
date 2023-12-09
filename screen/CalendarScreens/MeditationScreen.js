import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import { colors } from '../../theme/styles';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import TimerHook from '../../hooks/timerHook';
import { SelectList } from 'react-native-dropdown-select-list'
import * as Animatable from 'react-native-animatable';
import IconComponent from '../../components/IconComponent/IconComponent';


const MeditationScreen = ({ navigation }) => {

    const [selected, setSelected] = React.useState(null);

    const [showExitButton, setSetshowExitButton] = useState(false)

    const width = Dimensions.get("screen").width - 10

    const data = [
        { key: 1, value: '5 Min' },
        { key: 2, value: '10 Min' },
        { key: 3, value: '15 Min' },
        { key: 4, value: '20 Min' },
        { key: 5, value: '25 Min' },
        { key: 6, value: '30 Min' }
    ]

    const [step, setstep] = useState(0)

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

    const handleTimeEnd = () => {
        setSetshowExitButton(true);
    }



    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary }}>
            {
                step == 0 && <>
                    <Animatable.View animation="fadeIn" iterationCount={1} >
                        <TouchableOpacity onPress={() => {
                            setSelected(null)
                            setstep(1)
                        }}>
                            <View style={{ width: 'auto', backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 5, marginBottom: 25 }}>
                                <Text style={{ color: colors.primary }}>
                                    Start
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </Animatable.View>
                    <Animatable.Text animation="fadeIn" iterationCount={1} duration={1500} style={{ color: colors.white, fontSize: 20 }}>
                        Meditation
                    </Animatable.Text>
                </>

            }

            {
                step == 1 &&
                <Animatable.View animation="fadeIn" iterationCount={1}>
                    <SelectList
                        inputStyles={{ color: '#fff', padding: 10, justifyContent: 'center', alignItems: 'center' }}
                        boxStyles={{ justifyContent: 'center', alignItems: 'center', borderColor: '#fff', color: '#fff', width: 150 }}
                        dropdownStyles={{ justifyContent: 'center', alignItems: 'center', borderColor: '#fff', color: '#fff', width: 150 }}
                        dropdownItemStyles={{ color: '#fff', padding: 0 }}
                        dropdownTextStyles={{ color: '#fff', justifyContent: 'center', alignItems: 'center' }}
                        search={false}
                        setSelected={(val) => setSelected(val)}
                        placeholder='Set Timer'
                        data={data}
                        save="key"
                        arrowicon={<IconComponent size={15} color={'#fff'} iconName={'chevron-down'} iconType={'Entypo'} />}
                    />
                    {
                        selected !== null && <Animatable.View animation="fadeIn" iterationCount={1} >
                            <TouchableOpacity onPress={() => {
                                setSetshowExitButton(false);
                                setstep(2)
                            }}>
                                <View style={{ width: 'auto', backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 5, marginTop: 25 }}>
                                    <Text style={{ color: colors.primary, textAlign: 'center' }}>
                                        Done
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </Animatable.View>
                    }
                </Animatable.View>
            }

            {
                step == 2 && <>
                    <LottieView style={{ width, height: 340 }} source={require('../../assets/lottie/girl-meditating.json')} autoPlay loop />
                    <TimerHook seconds={selected * 5 * 60} onEnd={handleTimeEnd} />
                    {
                        showExitButton && <Animatable.View animation="fadeIn" iterationCount={1} >
                            <TouchableOpacity onPress={() => {
                                setSelected(null)
                                setstep(1)
                            }}>
                                <View style={{ width: 'auto', backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 5, marginTop: 25 }}>
                                    <Text style={{ color: colors.primary }}>
                                        Once More
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </Animatable.View>
                    }

                </>
            }



        </View>
    )
}

export default MeditationScreen

const styles = StyleSheet.create({})