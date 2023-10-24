import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import SafeView from '../components/SafeView/SafeView';
import LoveYourSelf from '../assets/undraw_a_whole_year_vnfm.png';
import IconComponent from '../components/IconComponent/IconComponent';

const featureArr = [
    {
        id: 1,
        iconSrc: require('../assets/pie-chart.png'),
        title: 'Advanced Personal Statistics',
        desc: 'Discover your body patterns and find out changes during pregnancy'
    },
    {
        id: 2,
        iconSrc: require('../assets/pie-chart.png'),
        title: 'Advanced Personal Statistics',
        desc: 'Discover your body patterns and find out changes during pregnancy'
    },
    {
        id: 3,
        iconSrc: require('../assets/pie-chart.png'),
        title: 'Advanced Personal Statistics',
        desc: 'Discover your body patterns and find out changes during pregnancy'
    },
    {
        id: 4,
        iconSrc: require('../assets/pie-chart.png'),
        title: 'Advanced Personal Statistics',
        desc: 'Discover your body patterns and find out changes during pregnancy'
    },
    // Add more items as needed
];

const RenderItem = ({ item }) => {
    return (
        <View style={{ flexDirection: 'row', gap: 15, paddingVertical: 10 }}>
            <Image style={{ width: 25, height: 25, resizeMode: 'cover' }} source={item.iconSrc} />
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', gap: 5 }}>
                <Text style={{ color: '#000' }}>{item.title}</Text>
                <Text style={{ color: '#4c4c4c' }}>{item.desc}</Text>
            </View>
        </View>
    );
};

const PremiumScreen = () => {
    return (
        <SafeView>
            <FlatList
                style={{ padding: 20 }}
                data={featureArr}
                keyExtractor={(item) => item.id.toString()} // Use toString() to ensure it's a string
                renderItem={RenderItem}
                ListHeaderComponent={() => (
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ alignSelf: 'flex-start' }}>
                            <IconComponent iconType={'AntDesign'} iconName={'close'} size={20} color={'#000'} />
                        </View>
                        <Image
                            style={{ height: 280, resizeMode: 'contain' }}
                            source={LoveYourSelf}
                        />
                        <Text style={{ color: '#000' }}>My Calendar Premium</Text>
                    </View>
                )}
            />
        </SafeView>
    );
};

export default PremiumScreen;

const styles = StyleSheet.create({});
