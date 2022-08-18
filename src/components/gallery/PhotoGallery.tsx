import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { Photo } from "../../utilities/types";
import FullScreenPhoto from "./FullScreenPhoto";
import { getPhotos, getPhotosByItineraryItem } from "../../firebase/db";
import { useNavigation } from "@react-navigation/native";
import ImageSource from "react-native-image-viewing";

const PhotoGallery = ({ event, item }) => {
  const navigation = useNavigation();
  const [photoPairs, setPhotoPairs] = useState<Photo[][]>([]);

  useEffect(() => {
    getPhotosByItineraryItem(event, item).then((photos) => {
      if (photoPairs.length > 0) return;
      const pairs: Photo[][] = [];

      for (let i = 0; i < photos.length; i += 2) {
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
