import React, { useState } from "react";
import { Button, StyleSheet, Touchable, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { Camera } from "react-native-vision-camera";
import { uploadPhoto } from "../../firebase/storage";
import { addImage } from "../../firebase/db";
import PhotoPreview from "./PhotoPreview";
import Icon from 'react-native-vector-icons/FontAwesome'

export default function TakePhotoButton({
  camera,
  photoPreview,
  setPhotoPreview,
  setPhoto,
  photo,
}) {
  const capturePhoto = async () => {
    try {
      console.log("Taking photo...");
      const photo = await camera.current.takePhoto();
      setPhoto(photo);
      setPhotoPreview(true);
    } catch (e) {
      console.error("Failed to take photo!", e);
    }
  };

  return photoPreview ? (
    <View>
      <Button title="Retake photo" onPress={() => setPhotoPreview(false)} />
      <Button
        title="Save photo"
        onPress={async () => {
          console.log(photo, "PHOTO");

          const imageName = await uploadPhoto(photo.path);
          addImage(imageName);
          setPhotoPreview(false);
        }}
      />
    </View>
  ) : (
    // <TouchableOpacity style={styles.button}>

    //   <Button title="Take Photo" onPress={capturePhoto} />
    // </TouchableOpacity>
    <TouchableOpacity
   style={styles.content}>
   <Icon name={"square-o"}  size={80} color="red" onPress={capturePhoto}/>
 </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  content:{
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'flex-end',
    padding:50
},
});
