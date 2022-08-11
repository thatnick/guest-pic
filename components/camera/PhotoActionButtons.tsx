import React, { useState } from "react";
import { Button, StyleSheet, Touchable, TouchableHighlight, TouchableOpacity, View, ImageBackground } from "react-native";
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
      <ImageBackground style={{height:"100%", width:'100%'}} source={{ uri: photo.path }}>
      <TouchableOpacity 
      style={styles.retake}>
   <Icon name={"remove"}  size={50} color="red" onPress={async () => 
          setPhotoPreview(false)
        }/>
 </TouchableOpacity>
      <TouchableOpacity
   style={styles.save}
  >
   <Icon name={"check"}  size={50} color="green" onPress={async () => {
     console.log(photo, "PHOTO");
     
     const imageName = await uploadPhoto(photo.path);
     addImage(imageName);
     setPhotoPreview(false);
    }}/>
 </TouchableOpacity>
      </ImageBackground>
    </View>
  ) : (
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
retake:{display:'flex',
flexDirection:'row',
justifycontent:'center',
alignSelf:"flex-start"
},
save:{display:'flex',
flexDirection:'row',
justifycontent:'center',
alignSelf:"flex-end"
},
});
