import React from "react";
import { Button } from "react-native";
import { Camera } from "react-native-vision-camera";

interface Props {
  camera: React.RefObject<Camera>;
}
export default function TakePhotoButton({ camera }: Props) {
  const takePhoto = async () => {
    try {
      console.log("Taking photo...");
      const photo = await camera.current.takePhoto();

      console.log(photo.path);
      // TODO: upload the photo with uploadPhoto(user, photo.path)
      // TODO: add photo the db with addImage (imageName)
    } catch (e) {
      console.error("Failed to take photo!", e);
    }
  };

  return <Button title="Take Photo" onPress={takePhoto} />;
}
