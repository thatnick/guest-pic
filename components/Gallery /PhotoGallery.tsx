import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getAllImages } from "../../firebase/db";
import { imagesByUri } from "../../firebase/storage";
import { CurrentRenderContext } from "@react-navigation/native";

const PhotoGallery = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [imagesFromDb, setImagesFromDb] = useState([]);
  const [locations, setLocations] = useState([]);


  useEffect(() => {
    getAllImages().then((images) => {
      setImagesFromDb(images);

      imagesFromDb.forEach((image) => setLocations((currentLocations => [...currentLocations, image.location])));

      console.log(locations, "locations");
      
      locations.forEach((location) => {
        console.log(location, "single location");
        imagesByUri(location).then((url) => {
          setImageUrls((currUrls) => [...currUrls, url.location])
  
        });
      });
    });
  }, []);
//console.log(imageUrls, "urls >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

  return (
    <View>
      <FlatList
        data={imageUrls}
        keyExtractor={(url) => url.toString()}
        renderItem={({ url }) => {
          <Image source={{ uri: url }} />;
        }}
      />
    </View>
  );
};

export default PhotoGallery;

const styles = StyleSheet.create({});
