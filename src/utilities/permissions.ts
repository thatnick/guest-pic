import { Camera } from "react-native-vision-camera";

export const requestCameraPermissions = async () => {
  await Camera.requestCameraPermission();
};
