import React, { useState, useRef, useEffect } from 'react'
import SafeView from '../../components/SafeView/SafeView';
import { Animated, FlatList, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import OnBoardingItem from '../../components/OnBoardingItem/OnBoardingItem';
import Paginator from './Paginator';
import { getDataItem, storeDataItem } from '../../utility/storage';
import { useNavigation } from '@react-navigation/native';
import IconComponent from '../../components/IconComponent/IconComponent';
import { colors } from '../../theme/styles';
import * as Animatable from 'react-native-animatable';



const OnBoardingScreen = () => {

    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0)
    const scrollX = useRef(new Animated.Value(0)).current
    const slideRef = useRef(null)


    const slides = [
        {
            id: 1,
            title: "Lorem ipsum dolor sit amet consectetur. Venenatis consequat etiam orci at. Turpis elit.",
            src: require('../../assets/lottie/girl-meditating.json')
        },
        {
            id: 2,
            title: "Lorem ipsum dolor sit amet consectetur. Venenatis consequat etiam orci at. Turpis elit.",
            src: require('../../assets/lottie/girl-meditating.json')
        },
        {
            id: 3,
            title: "Lorem ipsum dolor sit amet consectetur. Venenatis consequat etiam orci at. Turpis elit.",
            src: require('../../assets/lottie/girl-meditating.json')
        },
        {
            id: 4,
            title: "Lorem ipsum dolor sit amet consectetur. Venenatis consequat etiam orci at. Turpis elit.",
            src: require('../../assets/lottie/girl-meditating.json')
        },
    ]

    const viewItemChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index)
    }).current

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    useEffect(() => {
        // const AlreadyOnBoarded = async () => {
        //     const result = await getDataItem('UserOnboarding');

        //     if (result) {
        //         navigation.navigate('AppScreen')
        //     }

        // }

        // AlreadyOnBoarded();
    }, []);


    return (
        <SafeView style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 30
        }}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={'white'}
            />
            <View style={{ marginLeft: 40 }}>
            </View>
            <FlatList
                data={slides}
                renderItem={({ item }) => <OnBoardingItem item={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                keyExtractor={(item) => item.id}
                onViewableItemsChanged={viewItemChanged}
                viewabilityConfig={viewConfig}
                scrollEventThrottle={32}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                    useNativeDriver: false
                })}
                ref={slideRef}
            />
            <Paginator scrollX={scrollX} data={slides} />
            <TouchableOpacity style={{
                backgroundColor: '#e14e69',
                width: 50,
                height: 50,
                // padding: 20,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
            }}
                onPress={
                    async () => {
                        if (slideRef.current) {
                            if (currentIndex === (slides.length - 1)) {
                                await storeDataItem('UserOnboarding', "true");
                                navigation.navigate('AppScreen')
                            } else {
                                slideRef.current.scrollToIndex({
                                    index: currentIndex + 1,
                                    animated: true,
                                });
                            }
                        }
                    }

                }
            >
                <Animatable.View animation="tada" easing="ease-out" iterationCount="infinite">
                    <IconComponent size={40} iconName={'chevron-right'} iconType={'EvilIcons'} color={colors.white} />
                </Animatable.View>
            </TouchableOpacity>
        </SafeView>
    )
}



export default Animatable.createAnimatableComponent(OnBoardingScreen)
