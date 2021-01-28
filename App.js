import React from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import getEnvVars from "./env";
import Loading from "./Loading";
import Weather from "./Weather";

const { apiUrl, apiKey } = getEnvVars();

export default class extends React.Component {
  state = {
    isLoading: true,
    temp: null,
  };
  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(
      `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    );
    this.setState({ isLoading: false, temp: data.main.temp });
  };
  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temp } = this.state;
    return isLoading ? <Loading /> : <Weather temperture={Math.round(temp)} />;
  }
}
