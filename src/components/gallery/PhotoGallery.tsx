import { FlatList, Image, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getAllImages } from "../../firebase/db";
import { imageByUri } from "../../firebase/storage";
import FakeGalleryBox from "./FakeGalleryBox";

const PhotoGallery = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getAllImages().then((images) => {
      const promises = [];

      images.forEach((image) => {
        promises.push(imageByUri(image));
      });
      Promise.all(promises).then((data) => setLocations(data));
    });
  }, []);
  return (
    <View>
      <FlatList
        style={{ display: "flex", flexWrap: "wrap" }}
        data={locations}
        renderItem={({ item }) => {
          if (locations.length > 2) {
            return (
              <Image
                source={{ uri: item }}
                style={{ height: 100, width: 100, margin: 2 }}
              />
            );
          }
          return <FakeGalleryBox />;
        }}
        numColumns={4}
      />
    </View>
  );
};
export default PhotoGallery;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
});
