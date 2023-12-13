import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { TextInput } from 'react-native-paper';
import { colors } from '../../theme/styles';
import { getDataItem, storeDataItem } from '../../utility/storage';
import { UserContext } from '../../context/UserContext';


const YourNameScreen = () => {

    const [text, setText] = React.useState('');
    const { setUserName } = useContext(UserContext)

    const getVar = async () => {
        const data = await getDataItem("YourName");

        if (data) {
            setText(data);
        } else {
            setText(null);
        }
    }

    useEffect(() => {

        getVar();

    }, [])


    return (
        <View style={styles.containerStyle}>
            <View style={styles.optionContainer}>
                <TextInput
                    theme={{
                        colors: {
                            primary: colors.primary, // Change the primary color
                            surface: 'white', // Change the surface color
                            text: 'black', // Change the text color
                            placeholder: 'gray', // Change the placeholder color
                        }
                    }}
                    value={text}
                    onChangeText={setText}
                    onSubmitEditing={(event) => {
                        if (event.nativeEvent.text.length) {
                            storeDataItem("YourName", event.nativeEvent.text)
                            setUserName(event.nativeEvent.text)
                            console.log(event.nativeEvent.text)
                        }

                    }}
                    style={{ width: '100%', backgroundColor: '#fff' }}
                    label="Your Name"
                    outlineColor="#000" // Change the outline color            
                />
            </View>
        </View>

    )
}

export default YourNameScreen

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    optionTitle: {
        fontSize: 16,
        color: colors.black,
        fontFamily: 'Inter-Medium'
    },
    optionSubtitle: {
        fontSize: 14,
        color: colors.darkGrey,
        fontFamily: 'Inter-Regular',
    }

})