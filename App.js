import React from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import getEnvVars from "./env";
import Loading from "./Loading";
import Weather from "./Weather";

const { apiUrl, apiKey } = getEnvVars();
let callWeather;

export default class extends React.Component {
  state = {
    isLoading: true,
    temp: null,
  };
  getWeather = async (latitude, longitude) => {
    const {
      data: {
        main: { temp },
        weather,
      },
    } = await axios.get(
      `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    );
    this.setState({
      isLoading: false,
      temp,
      condition: weather[0].main,
    });
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
  componentDidUpdate() {
    callWeather = setTimeout(this.getLocation, 10000);
  }
  componentWillUnmount() {
    clearTimeout(callWeather);
  }

  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <Weather temperture={Math.round(temp)} condition={condition} />
    );
  }
}
