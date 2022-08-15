import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";

const ErrorMsg = ({ error, visible }) => {
  if (!error || !visible) return null;
  return (
    <View>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

export default ErrorMsg;

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});
