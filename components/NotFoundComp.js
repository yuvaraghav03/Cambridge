import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
const NotFoundComp = () => {
    const { colors } = useTheme();
    return (
        <View style={{ justifyContent: "center", backgroundColor: colors.background }} >
            <LottieView
                autoPlay={true}
                loop={false}
                source={require('../animation/notfound.json')}
            />
        </View>
    )
}

export default NotFoundComp

const styles = StyleSheet.create({})
