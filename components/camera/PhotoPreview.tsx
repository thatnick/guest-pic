import React from "react";
import { Image, ImageBackground, StyleSheet } from "react-native";

export default function PhotoPreview({ photo }) {
  const styles = StyleSheet.create({
    photo: {
      flex: 1,
      height:'100%',
      width:'100%',
      justifyContent:'center',
      alignItems:'center',
    },
  });

  // return <ImageBackground style={styles.photo} source={{ uri: photo.path }} 
  // />
  ;
}
