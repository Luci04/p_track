import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import { Button } from 'react-native-paper';


const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    keywords: ['fashion', 'clothing'],
});

const InterstitialAds = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            setLoaded(true);
        });

        // Start loading the interstitial straight away
        interstitial.load();

        // Unsubscribe from events on unmount
        return unsubscribe;
    }, []);

    // No advert ready to show yet
    if (!loaded) {
        return null;
    }

    return <Button
        textColor='black'
        onPress={() => {
            interstitial.show();
        }}
    >
        Avinash
    </Button>

}

export default InterstitialAds

const styles = StyleSheet.create({})