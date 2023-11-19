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

const Header = () => {
    return <View>
        <Text style={{ fontFamily: 'Inter-Medium', fontSize: 20, color: '#000', textAlign: 'center', paddingVertical: 20 }}>Setting</Text>
    </View>
}

const RenderItem = ({ item, index }) => {
    return <View>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', paddingVertical: index != 0 ? 20 : 0 }}>
            <IconComponent iconName={item.iconName} iconType={item.iconCommunity} color={colors.lightBlue} size={15} />
            <Text style={{ color: colors.lightBlue, fontFamily: 'Inter-Medium' }}>Other</Text>
        </View>
        <View>
            {
                item.children.map((ele, index) => {
                    return <View key={ele.title}>
                        <TouchableOpacity >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 17 }}>
                                <Text style={{ color: colors.black, fontFamily: 'Inter-Regular' }}>{ele.title}</Text>
                                <IconComponent iconName={'right'} iconType={'AntDesign'} color={colors.lightBlue} size={12} />
                            </View>
                        </TouchableOpacity>
                        {index !== item.children.length - 1 ? <Divider style={{ padding: 0.2 }} /> : null}
                    </View>
                })
            }

        </View>
    </View>
}

const SettingScreen = () => {
    return (
        <SafeView>
            {/* <FlatList
                ListHeaderComponent={Header}
                contentContainerStyle={{
                    paddingLeft: 20,
                    paddingRight: 20,
                }}
                data={SettingJSON}
                key={(item) => item.title}
                renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
                ListFooterComponent={() => <View style={{ padding: 40 }}></View>}
            /> */}
            <View style={{
                paddingLeft: 20,
                paddingRight: 20,
            }}>
                <View>
                    <View style={{
                        flexDirection: 'row', gap: 10, alignItems: 'center',
                        // paddingVertical: index != 0 ? 20 : 0,
                        paddingVertical: 20,
                    }}>
                        <IconComponent iconName={IconsInfo['Other'].iconName} iconType={IconsInfo['Other'].iconCommunity} color={colors.lightBlue} size={15} />
                        <Text style={{ color: colors.lightBlue, fontFamily: 'Inter-Medium' }}>{IconsInfo['Other'].title}</Text>
                    </View>
                    <View>
                        <View>
                            <TouchableOpacity onPress={() => {
                                if (IconsInfo['Other'].children['Share with friends']?.onClick) {
                                    IconsInfo['Other'].children['Share with friends'].onClick({ url: 'https://www.youtube.com/watch?v=YBw4zXysLJQ&ab_channel=DiljitDosanjh-Topic' })
                                }
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 17 }}>
                                    <Text style={{ color: colors.black, fontFamily: 'Inter-Regular' }}>{IconsInfo['Other'].children['Share with friends'].title}</Text>
                                    <IconComponent iconName={'right'} iconType={'AntDesign'} color={colors.lightBlue} size={12} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => {
                                if (IconsInfo['Other'].children['Security']?.onClick) {
                                    IconsInfo['Other'].children['Security'].onClick()
                                }
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 17 }}>
                                    <Text style={{ color: colors.black, fontFamily: 'Inter-Regular' }}>{IconsInfo['Other'].children['Security'].title}</Text>
                                    <IconComponent iconName={'right'} iconType={'AntDesign'} color={colors.lightBlue} size={12} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>

        </SafeView >
    )
}

export default SettingScreen

const styles = StyleSheet.create({})