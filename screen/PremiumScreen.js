import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SafeView from '../components/SafeView/SafeView';
import LoveYourSelf from '../assets/undraw_a_whole_year_vnfm.png';
import IconComponent from '../components/IconComponent/IconComponent';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/styles';

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

const HeaderComponent = () => {

    const navigation = useNavigation();

    return <View style={{ alignItems: 'center' }}>
        <TouchableOpacity style={{ alignSelf: 'flex-start' }} onPress={() => navigation.goBack()} >
            <View style={{ alignSelf: 'flex-start', paddingVertical: 20 }}>
                <IconComponent iconType={'AntDesign'} iconName={'close'} size={25} color={'#000'} />
            </View>
        </TouchableOpacity>
        <Image
            style={{ height: 280, resizeMode: 'contain' }}
            source={LoveYourSelf}
        />
        <Text style={{ color: '#000' }}>My Calendar Premium</Text>
    </View>
}

const PremiumScreen = () => {

    const height = Dimensions.get('screen').height;
    const [selectedOption, setSelectedOption] = useState(null)

    const [scrollPercentage, setscrollPercentage] = useState(0)



    const onScroll = (event) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

        const scrollOffset = contentOffset.y;
        const contentHeight = contentSize.height;
        const screenHeight = layoutMeasurement.height;

        const scrollPer = (scrollOffset / (contentHeight - screenHeight)) * 100;

        setscrollPercentage(Math.floor(scrollPer))
    }

    // useEffect(() => {
    // }, [scrollPercentage])


    return (
        <SafeView>
            <FlatList
                onScroll={onScroll}
                style={{
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: '#fff'
                }}
                data={featureArr}
                keyExtractor={(item) => item.id.toString()} // Use toString() to ensure it's a string
                renderItem={RenderItem}
                ListHeaderComponent={HeaderComponent}
            />
            <View style={{
                elevation: 24,
                backgroundColor: '#fff',
                justifyContent: 'center', paddingLeft: 20, paddingRight: 20, gap: 15, height: 300
            }}>
                <View style={{ flexDirection: 'row', gap: 15 }}>

                    <TouchableOpacity onPress={() => setSelectedOption(1)}
                        activeOpacity={0.6}
                        style={{
                            flex: 1,
                            padding: 10,
                            borderWidth: 2,
                            borderColor: selectedOption == 1 ? colors.darkGrey : colors.lightGrey,
                            justifyContent: 'center',
                            borderRadius: 8,
                            alignItems: 'center'
                        }}>
                        <Text style={{ color: colors.darkGrey }}>1</Text>
                        <Text style={{ color: colors.darkGrey }}>Month</Text>
                        <Text style={{ color: colors.darkGrey }}>$272.00</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setSelectedOption(2)}
                        activeOpacity={0.6}
                        style={{
                            flex: 1,
                            padding: 10,
                            borderWidth: 2,
                            borderColor: selectedOption == 2 ? colors.darkGrey : colors.lightGrey,
                            justifyContent: 'center',
                            borderRadius: 8,
                            alignItems: 'center',
                        }}>
                        <Text style={{ color: colors.darkGrey }}>1</Text>
                        <Text style={{ color: colors.darkGrey }}>Month</Text>
                        <Text style={{ color: colors.darkGrey }}>$272.00</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setSelectedOption(3)}
                        activeOpacity={0.6}
                        style={{
                            flex: 1,
                            padding: 10,
                            borderWidth: 2,
                            borderColor: selectedOption == 3 ? colors.darkGrey : colors.lightGrey,
                            justifyContent: 'center',
                            borderRadius: 8,
                            alignItems: 'center',
                        }}>
                        <Text style={{ color: colors.darkGrey }}>1</Text>
                        <Text style={{ color: colors.darkGrey }}>Month</Text>
                        <Text style={{ color: colors.darkGrey }}>$272.00</Text>
                    </TouchableOpacity>

                </View>
                <View style={{ alignItems: 'center', gap: 20 }}>
                    <Text style={{ color: colors.darkGrey }}>
                        7-day free trial, then ,640.OO/year
                    </Text>
                    <Text style={{ textAlign: 'justify', color: colors.darkGrey }}>
                        You will pay nothing if you cancel within 7 days. After the trial
                        period, the subscription will automatically renew. You may cancel
                        renewal at any time.
                    </Text>
                </View>
                <TouchableOpacity>
                    <View style={{ backgroundColor: colors.primary, paddingVertical: 20, borderRadius: 10 }}>
                        <Text style={{ textAlign: 'center', color: '#fff', fontSize: 15 }}>Try for free</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeView >
    );
};

export default PremiumScreen;

const styles = StyleSheet.create({});
