import { FlatList, Image, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import FakeGalleryBox from "./FakeGalleryBox";
import { Photo } from "../../utilities/types";

interface Props {
  photosCallback: () => Promise<Photo[]>;
}
const PhotoGallery = ({ photosCallback }: Props) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    photosCallback().then((photos) => setPhotos(photos));
  }, []);

  return (
    <View>
      <FlatList
        style={{ display: "flex", flexWrap: "wrap" }}
        data={photos}
        renderItem={({ item: photo }) => {
          if (photos.length > 2) {
            return (
              <Image
                source={{ uri: photo.downloadUrl }}
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
