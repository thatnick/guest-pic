import React from "react";
import { Button } from "react-native";
import { Camera } from "react-native-vision-camera";
import { uploadPhoto } from "../../firebase/storage";
import { addImage } from "../../firebase/db";

interface Props {
  camera: React.RefObject<Camera>;
}
export default function TakePhotoButton({ camera }: Props) {
  const capturePhoto = async () => {
    try {
      console.log("Taking photo...");
      const photo = await camera.current.takePhoto();

      const imageName = await uploadPhoto(photo.path);

      addImage(imageName)
      
    } catch (e) {
      console.error("Failed to take photo!", e);
    }
  };

  return <Button title="Take Photo" onPress={capturePhoto} />;
}
