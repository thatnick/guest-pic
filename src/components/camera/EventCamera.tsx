import React, { useRef ,useState, useCallback} from "react";
import { StyleSheet, TouchableOpacity, View, Text, Button } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import Icon from "react-native-vector-icons/FontAwesome";
import IonIcon from 'react-native-vector-icons/Ionicons';import { requestCameraPermissions } from "../../utilities/permissions";
import { useNavigation } from "@react-navigation/native";

export default function EventCamera() {
  const navigation = useNavigation();
  const devices = useCameraDevices();
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('back')
  const device = devices[cameraPosition];
  const camera = useRef<Camera>(null);
  const [flash, setFlash] = useState<'off' | 'on'>('off');

  const onFlashPressed = useCallback(() => {
    setFlash((f) => (f === 'off' ? 'on' : 'off'));
  }, []);

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

  const flipCamera = useCallback(()=>{
    setCameraPosition((position)=>(position === 'back' ? 'front' : 'back'))
  },[])

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
        flash={flash}
      />
<View style={styles.buttons}>
         <TouchableOpacity onPress={onFlashPressed}>
            <IonIcon name={flash === 'on' ? 'flash' : 'flash-off'} color="white" size={30} />
            <IonIcon name={"camera-reverse-sharp"} size={30} color={"white"} onPress={flipCamera}/>
      </TouchableOpacity>        
</View>

      <TouchableOpacity style={styles.content}>
        <IonIcon name={"scan-outline"} size={80} color="red" onPress={capturePhoto} />
        <IonIcon name={"ios-arrow-undo-outline"} size={35} color="white" onPress={() => navigation.goBack()} />
      </TouchableOpacity>
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
  buttons: {
    flex:1,
    flexDirection:'column',
    alignItems:'flex-end',
    padding:10,
    marginTop:50
  },
});
