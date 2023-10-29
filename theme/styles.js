// styles.js
import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#c62581',
    primaryLight: '#f56ab9',
    secondary: '#FF6B6B',
    black: '#000',
    white: '#fff',
    darkGrey: '#929292',
    lightGrey: '#dadada'
    // Add more color constants here
};

export const fonts = {
    regular: 'Roboto-Regular',
    bold: 'Roboto-Bold',
    // Define font family names here
};

export const appStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryBackground,
    },
    text: {
        fontFamily: fonts.regular,
        fontSize: 16,
        color: colors.primaryText,
    },
    // Define more styles here
});
