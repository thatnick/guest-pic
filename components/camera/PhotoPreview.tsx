import React from "react";
import { Image, ImageBackground, StyleSheet } from "react-native";

export default function PhotoPreview({ photo }) {
  const styles = StyleSheet.create({
    photo: {
      flex: 1,
    },
  });

  return <ImageBackground style={styles.photo} source={{ uri: photo.path }} />;
}
