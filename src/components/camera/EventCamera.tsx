import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Button } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import Icon from "react-native-vector-icons/FontAwesome";
import { requestCameraPermissions } from "../../utilities/permissions";
import { useNavigation } from "@react-navigation/native";

export default function EventCamera() {
  const navigation = useNavigation();
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef<Camera>(null);

  const capturePhoto = async () => {
    try {
      console.log("Taking photo...");
      const photo = await camera.current.takePhoto();
      console.log(photo);

      navigation.navigate("PhotoPreview", { photo });
    } catch (e) {
      console.error("Failed to take photo!", e);
    }
  };

  requestCameraPermissions();

  if (device == null) return <Text>Loading...</Text>;
  return (
    <View style={styles.camContainer}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        ref={camera}
        isActive={true}
        photo={true}
      />

      <TouchableOpacity style={styles.content}>
        <Icon name={"square-o"} size={80} color="red" onPress={capturePhoto} />
      </TouchableOpacity>
      <Button title="Close" onPress={() => navigation.goBack()} />
    </View>
  );
}
const styles = StyleSheet.create({
  camContainer: { width: "100%", height: "100%" },
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 50,
  },
  retake: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  save: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
});
