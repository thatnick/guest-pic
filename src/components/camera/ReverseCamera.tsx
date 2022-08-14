import React, { useRef } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Button } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import Icon from "react-native-vector-icons/FontAwesome";
import { requestCameraPermissions } from "../../utilities/permissions";
import { useNavigation } from "@react-navigation/native";

export default function ReverseCamera() {
  const navigation = useNavigation();
  const devices = useCameraDevices();
  let device = devices.front;
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

  const flipCamera = ()=>{
        navigation.navigate("EventCamera")
  }

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

      <TouchableOpacity style={styles.flipCamera}>
        <Icon name={"refresh"} size={40} color={"white"} onPress={flipCamera}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.content}>
        <Icon name={"square-o"} size={80} color="red" onPress={capturePhoto} />
        <Icon name={"rotate-left"} size={35} color="white" onPress={() => navigation.goBack()} />
      </TouchableOpacity>
      {/* <Button title="Close" onPress={() => navigation.goBack()} /> */}
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
    padding:40
  },
  flipCamera: {
    flex:1,
    flexDirection:'column',
    alignItems:'flex-end',
    padding:30,
    marginTop:30
  }
});
