import { FlatList, Image, StyleSheet, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import FakeGalleryBox from "./FakeGalleryBox";
import { Photo } from "../../utilities/types";

interface Props {
  photosCallback: () => Promise<Photo[]>;
}
const PhotoGallery = ({ photosCallback }: Props) => {
  const [photos, setPhotos] = useState<Photo[][]>([]);

  useEffect(() => {
    photosCallback().then((data) => {
      const pairs = [];

      if (data.length % 2 === 0) {
        for (let i = 0; i < data.length; i + 2) {
          const pair = [data[i], data[i + 1]];
          pairs.push(pair);
        }
      } else {
        data.push({
          downloadUrl:
            "https://firebasestorage.googleapis.com/v0/b/guestpic.appspot.com/o/photos%2Fimages-4.jpeg?alt=media&token=5460b2a7-ee3b-4840-bdb9-2c5e47be37b0",
          id: "Test",
          userEmail: "test@s.com",
        });
        for (let i = 0; i < data.length; i += 2) {
          const pair = [data[i], data[i + 1]];
          pairs.push(pair);
        }
      }

      setPhotos(pairs);
    });
  }, []);


  const renderItem = useCallback(({ item }) => {
    return (
      <View>
        <Image
          source={{ uri: item[0].downloadUrl }}
          style={{ height: 60, width: 60, margin: 2 }}
        />
        <Image
          source={{ uri: item[1].downloadUrl }}
          style={{ height: 60, width: 60, margin: 2 }}
        />
      </View>
    );
  }, []);

  return (
    <View>
      <FlatList
        horizontal={true}
        data={photos}
        renderItem={renderItem}
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
