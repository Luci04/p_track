import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SafeView from '../components/SafeView/SafeView'
import SettingJSON from '../appConst/settingPageLabel.json'
import IconComponent from '../components/IconComponent/IconComponent'
import { colors } from '../theme/styles'
import { Divider } from 'react-native-paper'

const Header = () => {
    return <View>
        <Text style={{ fontFamily: 'Inter-Medium', fontSize: 20, color: '#000', textAlign: 'center', paddingVertical: 20 }}>Setting</Text>
    </View>
}

const RenderItem = ({ item, index }) => {
    return <View>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', paddingVertical: index != 0 ? 20 : 0 }}>
            <IconComponent iconName={item.iconName} iconType={item.iconCommunity} color={colors.lightBlue} size={15} />
            <Text style={{ color: colors.lightBlue, fontFamily: 'Inter-Medium' }}>{item.title}</Text>
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
            <FlatList
                ListHeaderComponent={Header}
                contentContainerStyle={{
                    paddingLeft: 20,
                    paddingRight: 20,
                }}
                data={SettingJSON}
                key={(item) => item.title}
                renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
                ListFooterComponent={() => <View style={{ padding: 40 }}></View>}
            />
        </SafeView >
    )
}

export default SettingScreen

const styles = StyleSheet.create({})