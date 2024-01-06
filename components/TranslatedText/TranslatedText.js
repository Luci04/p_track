import { StyleSheet, Text } from 'react-native'
import { React } from 'react'
import { useTranslation } from 'react-i18next'

const TranslatedText = ({ children, ...props }) => {
    const { t } = useTranslation();

    return (
        <Text {...props}>{t(children)}</Text>
    );
}

export default TranslatedText;