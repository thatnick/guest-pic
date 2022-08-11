import React, { useRef, useState } from "react";
<<<<<<< HEAD
import { Button, StyleSheet, Text, View } from "react-native";
=======
import { StyleSheet, Text, View } from "react-native";
>>>>>>> e23410781347b10ff51bc937e2c16a2b7996869f
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { requestCameraPermissions } from "../utilities/permissions";
import PhotoPreview from "./camera/PhotoPreview";
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
      {photoPreview ? (
        <PhotoPreview photo={photo} />
      ) : (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          ref={camera}
          isActive={true}
          photo={true}
        />
      )}
      <PhotoActionButtons
        style={styles.captureButton}
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
