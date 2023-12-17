import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Dimensions } from "react-native";
// import { LineChart } from 'react-native-chart-kit';
// import LineChart from "react-native-responsive-linechart";

const screenWidth = Dimensions.get("window").width;


const data = [-10, -15, 40, 19, 32, 15, 52, 55, 20, 60, 78, 42, 56, 20, 60, 78, 42, 56, 20, 60, 78, 42, 56];
const config = {
    line: {
        strokeWidth: 1,
        strokeColor: "#216D99"
    },
    area: {
        gradientFrom: "#2e86de",
        gradientFromOpacity: 1,
        gradientTo: "#87D3FF",
        gradientToOpacity: 1
    },
    yAxis: {
        labelColor: "#c8d6e5"
    },
    grid: {
        strokeColor: "#c8d6e5",
        stepSize: 30
    },
    insetY: 10,
    insetX: 10,
    interpolation: "spline",
    backgroundColor: "#fff"
};

const ChartScreen = () => {
    return null

    return (
        <View style={{ flex: 1 }}>
            <LineChart style={{ flex: 1 }} config={config} data={data} />
        </View>
    )
}

export default ChartScreen

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
});