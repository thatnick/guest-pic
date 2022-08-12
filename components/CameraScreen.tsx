import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { requestCameraPermissions } from "../utilities/permissions";
import PhotoActionButtons from "./camera/PhotoActionButtons";

export default function CameraScreen() {
  requestCameraPermissions();
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef<Camera>(null);
  const [photoPreview, setPhotoPreview] = useState(false);
  const [photo, setPhoto] = useState({});

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

      <PhotoActionButtons
        camera={camera}
        photo={photo}
        photoPreview={photoPreview}
        setPhotoPreview={setPhotoPreview}
        setPhoto={setPhoto}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  camContainer: { width: "100%", height: "100%" },
});
