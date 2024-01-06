import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SafeView from '../components/SafeView/SafeView'
import IconsInfo from '../appConst/settingPageLabel'
import IconComponent from '../components/IconComponent/IconComponent'
import { colors } from '../theme/styles'
import { Divider } from 'react-native-paper'
import Share from 'react-native-share';
import { ShareInfo } from '../utility/helperFunction'
import notifee, { TriggerType } from '@notifee/react-native'
import { useNavigation } from '@react-navigation/native'
import TranslatedText from '../components/TranslatedText/TranslatedText'


const Header = () => {
    return <View>
        <Text style={styles.headerStyle}>Setting</Text>
    </View>
}

const RenderItem = ({ item, index }) => {

    const navigate = useNavigation();

    return <View>
        <View style={{ ...styles.titleContainer, paddingVertical: index != 0 ? 20 : 0 }}>
            <IconComponent iconName={item.iconName} iconType={item.iconCommunity} color={colors.primary} size={15} />
            <TranslatedText style={styles.title}>{item.title}</TranslatedText>
        </View>
        <View>
            {
                item.children.map((ele, index) => {
                    return <View key={ele.title}>
                        <TouchableOpacity onPress={() => {
                            ele?.onClick(() => {
                                navigate.navigate(`${ele?.Screen}`)
                            })
                        }} >
                            <View style={styles.optionContainer}>
                                <TranslatedText style={styles.optionTitle}>{ele.title}</TranslatedText>
                                <IconComponent iconName={'right'} iconType={'AntDesign'} color={colors.primaryLight} size={12} />
                            </View>
                        </TouchableOpacity>
                        {index !== item.children.length - 1 ? <Divider /> : null}
                    </View>
                })
            }

        </View>
    </View>
}

const SettingScreen = () => {
    return (
        <SafeView>
            <FlatList
                ListHeaderComponent={Header}
                contentContainerStyle={styles.flatListContainer}
                data={IconsInfo}
                key={(item) => item.title}
                renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
                ListFooterComponent={() => <View style={{ padding: 40 }}></View>}
            />
        </SafeView >
    )
}

export default SettingScreen

const styles = StyleSheet.create({
    headerStyle: {
        fontFamily: 'Inter-Medium',
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
        paddingVertical: 20
    },
    flatListContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    title: {
        color: colors.primaryLight,
        fontFamily: 'Inter-Medium'
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 17
    },
    optionTitle: {
        color: colors.black,
        fontFamily: 'Inter-Regular'
    }
})