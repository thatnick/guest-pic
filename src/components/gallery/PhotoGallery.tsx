import { FlatList, Image, StyleSheet, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { Photo } from "../../utilities/types";

interface Props {
  photosCallback: () => Promise<Photo[]>;
}
const PhotoGallery = ({ photosCallback }: Props) => {
  const [photos, setPhotos] = useState<Photo[][]>([]);

  useEffect(() => {
    photosCallback().then((data) => {
      const placeholder = {
        downloadUrl:
          "https://firebasestorage.googleapis.com/v0/b/guestpic.appspot.com/o/placeholder%2Fphotogallery.jpg?alt=media&token=28e5bbff-796b-4258-8c68-bb5962f94803",
        id: "Placeholder",
        userEmail: "Placeholder",
      };

      const pairs = [];

      if (data.length === 0) {
        let count = 0;
        for (let i = 0; count < 4; i++) {
          pairs.push([placeholder, placeholder]);
          count++;
        }
      } else if (data.length % 2 === 0) {
        for (let i = 0; i < data.length; i + 2) {
          const pair = [data[i], data[i + 1]];
          pairs.push(pair);
        }
      } else {
        data.push(placeholder);
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
      <FlatList horizontal={true} data={photos} renderItem={renderItem} />
    </View>
  );
};
export default PhotoGallery;
