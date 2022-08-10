import React, { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { requestCameraPermissions } from "../../utilities/permissions";
import TakePhotoButton from "./TakePhotoButton";

export default function EventCamera() {
  requestCameraPermissions();
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef<Camera>(null);

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
      <TakePhotoButton style={styles.captureButton} camera={camera} />
    </View>
  );
}
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  camContainer: { width: "100%", height: "100%" },
  // captureButton: {
  //   position: "absolute",
  //   alignSelf: "center",
  //   bottom: 0,
  // },
});
