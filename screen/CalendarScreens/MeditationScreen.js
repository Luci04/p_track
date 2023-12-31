import { StyleSheet, Text, View, Dimensions, TouchableOpacity, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import { colors } from '../../theme/styles';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import TimerHook from '../../hooks/timerHook';
import { SelectList } from 'react-native-dropdown-select-list'
import * as Animatable from 'react-native-animatable';
import IconComponent from '../../components/IconComponent/IconComponent';
import TranslatedText from '../../components/TranslatedText/TranslatedText';
import { useTranslation } from 'react-i18next';


const MeditationScreen = ({ navigation }) => {

    const [selected, setSelected] = React.useState(null);

    const [showExitButton, setSetshowExitButton] = useState(false)
    const { t } = useTranslation();
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
            <StatusBar backgroundColor={colors.primary} barStyle={'light-content'} />
            {
                step == 0 && <>
                    <Animatable.View animation="fadeIn" iterationCount={1} >
                        <TouchableOpacity onPress={() => {
                            setSelected(null)
                            setstep(1)
                        }}>
                            <View style={{ width: 'auto', backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 5, marginBottom: 25 }}>
                                <TranslatedText style={{ color: colors.primary }}>
                                    start
                                </TranslatedText>
                            </View>
                        </TouchableOpacity>
                    </Animatable.View>
                    <Animatable.Text animation="fadeIn" iterationCount={1} duration={1500} style={{ color: colors.white, fontSize: 20 }}>
                        <TranslatedText>
                            meditation
                        </TranslatedText>
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
                        fontFamily='Inter-Regular'
                        dropdownItemStyles={{ color: '#fff', padding: 0, width: 150 }}
                        dropdownTextStyles={{ color: '#fff', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}
                        search={false}
                        setSelected={(val) => setSelected(val)}
                        placeholder={t('set_timer')}
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
                                    <TranslatedText style={{ color: colors.primary, textAlign: 'center' }}>
                                        done
                                    </TranslatedText>
                                </View>
                            </TouchableOpacity>
                        </Animatable.View>
                    }
                </Animatable.View>
            }

            {
                step == 2 && <>
                    <LottieView p style={{ width, height: 340 }} source={require('../../assets/lottie/girl-meditating.json')} autoPlay loop />
                    <TimerHook seconds={selected * 5 * 60} onEnd={handleTimeEnd} />
                    {
                        showExitButton && <Animatable.View animation="fadeIn" iterationCount={1} >
                            <TouchableOpacity onPress={() => {
                                setSelected(null)
                                setstep(1)
                            }}>
                                <View style={{ width: 'auto', backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 5, marginTop: 25 }}>
                                    <TranslatedText style={{ color: colors.primary }}>
                                        once_more
                                    </TranslatedText>
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