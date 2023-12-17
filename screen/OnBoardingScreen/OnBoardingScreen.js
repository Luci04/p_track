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
import Loader from '../../components/Loader/Loader';



const OnBoardingScreen = () => {

    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0)
    const scrollX = useRef(new Animated.Value(0)).current
    const slideRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false);


    const slides = [
        {
            id: 1,
            title: "Track Your Monthly Cycle",
            subtitle: "Take control of your reproductive health by tracking your menstrual cycle effortlessly.",
            src: require('../../assets/lottie/Animation - 1702741951077.json')
        },
        {
            id: 2,
            title: "Stay Informed",
            subtitle: `Explore valuable insights about your menstrual health, fertility, and more.Stay informed, stay empowered!`,
            src: require('../../assets/lottie/sunflower.json')
        },
        {
            id: 3,
            title: "You're All Set!",
            subtitle: `Start your journey to a healthier, happier you`,
            src: require('../../assets/lottie/glower-blossem.json')
        }
    ]

    const viewItemChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index)
    }).current

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    useEffect(() => {

        // const screen2Preload = navigation.navigate('AppScreen');


        const AlreadyOnBoarded = async () => {
            const result = await getDataItem('UserOnboarding');

            if (result) {
                navigation.navigate('AppScreen')
            }

        }

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



export default OnBoardingScreen
