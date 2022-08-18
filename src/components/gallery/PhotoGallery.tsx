import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { Photo } from "../../utilities/types";
import FullScreenPhoto from "./FullScreenPhoto";
import { getPhotos } from "../../firebase/db";
import { useNavigation } from "@react-navigation/native";
import ImageSource from "react-native-image-viewing";

interface Props {
  photosCallback: () => Promise<Photo[]>;
}
const PhotoGallery = ({ photosCallback }: Props) => {
  const navigation = useNavigation();
  const [photoPairs, setPhotoPairs] = useState<Photo[][]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {}, []);

  useEffect(() => {
    photosCallback().then((photos) => {
      const placeholder = {
        downloadUrl:
          "https://firebasestorage.googleapis.com/v0/b/guestpic.appspot.com/o/placeholder%2Fphotogallery.jpg?alt=media&token=28e5bbff-796b-4258-8c68-bb5962f94803",
        id: "Placeholder",
        userEmail: "Placeholder",
      };

      const pairs: Photo[][] = [];

      for (let i = 0; i < photos.length; i + 2) {
        const pair = [photos[i], photos[i + 1] ?? {}];
        pairs.push(pair);
      }

      setPhotoPairs(pairs);
    });
  }, []);

  const handlePhotoPress = () => {
    getPhotos().then((photos) => {
      // TODO: change photos to be photoPairs.flat AFTER getting pairs loop working above
      const imageSources = photos.map((photo) => ({ uri: photo.downloadUrl }));
      navigation.navigate("FullScreenPhoto", { imageSources });
    });
  };

  const renderItem = useCallback(({ item }) => {
    return (
      <View>
        <Pressable onPress={handlePhotoPress}>
          <Image
            source={{ uri: item[0].downloadUrl }}
            style={{ height: 60, width: 60, margin: 2 }}
          />
        </Pressable>
        <Pressable onPress={handlePhotoPress}>
          <Image
            source={{ uri: item[1].downloadUrl }}
            style={{ height: 60, width: 60, margin: 2 }}
          />
        </Pressable>
      </View>
    );
  }, []);

  return (
    <View>
      <FlatList horizontal={true} data={photoPairs} renderItem={renderItem} />
    </View>
  );
};
export default PhotoGallery;
