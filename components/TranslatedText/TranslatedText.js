import { StyleSheet, Text, View, StyleProp } from 'react-native'
import { React, ReactNode } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const TranslatedText = ({ children: ReachChild, style: StyleProp }) => {

    const { t } = useTranslation();

    return (
        <Text>{t(`${children}`)}</Text>
    )
}

export default TranslatedText

const styles = StyleSheet.create({})