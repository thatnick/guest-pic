import { Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getAllImages } from "../../firebase/db";
import { imagesByUri } from "../../firebase/storage";

const PhotoGallery = () => {
  const [images, setImages] = useState("");
  useEffect(() => {
    getAllImages().then((images) => {
      imagesByUri().then((url) => {
        setImages(url);
      });
    });
  }, []);

  return (
    <View>
      <Image
        style={{ height: 80, width: 80, margin: 2 }}
        source={{
          uri: images,
        }}
      />
    </View>
  );
};

export default PhotoGallery;

const styles = StyleSheet.create({});
