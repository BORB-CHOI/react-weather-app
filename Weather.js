import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";

export default function Weather({ temperture }) {
  return (
    <View style={styles.container}>
      <Text>{temperture}</Text>
    </View>
  );
}

Weather.propTypes = {
  temperture: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
