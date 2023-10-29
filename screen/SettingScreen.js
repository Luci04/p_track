import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SafeView from '../components/SafeView/SafeView'
import SettingJSON from '../appConst/settingPageLabel.json'
import IconComponent from '../components/IconComponent/IconComponent'
import { colors } from '../theme/styles'
import Divider from '../components/Divider/Divider'

const RenderItem = ({ item, index }) => {
    return <View>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', paddingVertical: index != 0 ? 20 : 0 }}>
            <IconComponent iconName={item.iconName} iconType={item.iconCommunity} color={'#000'} size={10} />
            <Text style={{ color: colors.primary }}>{item.title}</Text>
        </View>
        <View>
            {
                item.children.map((ele, index) => {
                    return <View key={ele.title}>
                        <TouchableOpacity >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 17 }}>
                                <Text style={{ color: colors.black }}>{ele.title}</Text>
                                <IconComponent iconName={'right'} iconType={'AntDesign'} color={'#000'} size={12} />
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
                contentContainerStyle={{
                    paddingLeft: 20,
                    paddingRight: 20,
                }}
                data={SettingJSON}
                key={(item) => item.title}
                renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
                ListFooterComponent={() => <View style={{ padding: 40 }}></View>}
            />
            {/* {
                    SettingJSON.map((item, index) => {
                        return <RenderItem item={item} index={index} key={item.title} />
                    })
                } */}
        </SafeView >
    )
}

export default SettingScreen

const styles = StyleSheet.create({})