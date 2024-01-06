import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import languages from '../../languageService/languageList.json'
import Divider from '../../components/Divider/Divider'
import { colors } from '../../theme/styles'
import { useTranslation } from 'react-i18next';

const LanguageItem = ({ lang, languageSelected, symbol }) => {
    return <View style={styles.languageItem}>
        <Text style={{ color: languageSelected === symbol ? colors.primaryLight : colors.black }} >
            {lang.name}
        </Text>
    </View>
}

const LanguageScreen = ({ navigation }) => {

    const [languageSelected, setLanguageSelected] = useState(null)
    const { i18n } = useTranslation();

    const changeLanguage = (newLanguage) => {
        console.log("newLanguage", newLanguage)
        i18n.changeLanguage(newLanguage);
    };

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

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView>
                {
                    Object.keys(languages).map((lang, index) => {
                        return <TouchableOpacity key={lang} onPress={() => {
                            changeLanguage(lang)
                            console.log(lang);
                            setLanguageSelected(lang)
                        }}>
                            <LanguageItem symbol={lang} lang={languages[lang]} languageSelected={languageSelected} />
                            {
                                Object.keys(languages).length - 1 !== index ? <Divider /> : null
                            }
                        </TouchableOpacity>
                    })
                }
            </ScrollView>

        </View>
    )
}

export default LanguageScreen

const styles = StyleSheet.create({
    languageItem: {
        paddingHorizontal: 5,
        paddingVertical: 20,
        marginHorizontal: 10
    }
})