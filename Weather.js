import React from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const weatherOptions = {
  Haze: {
    iconName: "weather-hazy",
    gradient: ["#4DA0B0", "D39D38"],
  },
  Thunderstorm: {
    iconName: "weather-lightning",
    gradient: ["#373B44", "#4286f4"],
  },
  Drizzle: {
    iconName: "weather-partly-rainy",
    gradient: ["#3a7bd5", "#00d2ff"],
  },
  Rain: {
    iconName: "weather-rainy",
    gradient: ["#304352", "#d7d2cc"],
  },
  Snow: {
    iconName: "weather-sonwy",
    gradient: ["#8e9eab", "#eef2f3"],
  },
  Clear: {
    iconName: "weather-sunny",
    gradient: ["#FF7300", "#FEF253"],
  },
  Clouds: {
    iconName: "weather-cloudy",
    gradient: ["#757F9A", "#D7DDE8"],
  },
  Mist: {
    iconName: "weather-fog",
    gradient: ["#4CA1AF", "#C4E0E5"],
    title: "안개 핌",
    subTitle: "눈 제대로 뜨고 다녀.",
  },
};

export default function Weather({ temperture, condition }) {
  const currentWeather = weatherOptions["Clear"];
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={currentWeather.gradient}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.halfContainer}>
        <MaterialCommunityIcons
          name={currentWeather.iconName}
          size={96}
          color="white"
        />
        <Text style={styles.temp}>{temperture}°</Text>
      </View>

      <View style={{ ...styles.halfContainer, ...styles.textContainer }}>
        <Text style={styles.title}>{currentWeather.title}</Text>
        <Text style={styles.subTitle}>{currentWeather.subTitle}</Text>
      </View>
    </LinearGradient>
  );
}

Weather.propTypes = {
  temperture: PropTypes.number.isRequired,
  condition: PropTypes.oneOf([
    "Haze",
    "Thunderstorm",
    "Drizzle",
    "Rain",
    "Snow",
    "Atmosphere",
    "Clear",
    "Clouds",
    "Mist",
  ]).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  halfContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  temp: {
    fontSize: 36,
    color: "white",
  },
  background: {
    flex: 1,
  },
  title: { paddingBottom: 20, fontSize: 50, color: "white" },
  subTitle: { fontSize: 28, fontWeight: "bold", color: "white" },
  textContainer: {
    paddingHorizontal: 50,
    alignItems: "flex-start",
  },
});
