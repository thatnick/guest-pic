import { FlatList, Image, Pressable, View } from "react-native";
import React, { useState, useCallback } from "react";
import { Photo } from "../../utilities/types";
import { getPhotosByItineraryItem } from "../../firebase/db";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const PhotoGallery = ({ event, item }) => {
  const navigation = useNavigation();
  const [photoPairs, setPhotoPairs] = useState<Photo[][]>([]);

  useFocusEffect(
    useCallback(() => {
      getPhotosByItineraryItem(event, item).then((photos) => {
        const pairs = [];

        for (let i = 0; i < photos.length; i += 2) {
          const pair = [photos[i], photos[i + 1] ?? {}];
          pairs.push(pair);
        }

        setPhotoPairs(pairs);
      });
    }, [])
  );

  const handlePhotoPress = (index) => {
    navigation.navigate("FullScreenPhoto", { event, item, index });
  };

  const renderItem = useCallback(({ item, index }) => {
    return (
      <View>
        <Pressable onPress={() => handlePhotoPress(index)}>
          <Image
            source={{ uri: item[0].downloadUrl }}
            style={{ height: 60, width: 60, margin: 2 }}
          />
        </Pressable>
        <Pressable onPress={() => handlePhotoPress(index + 1)}>
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
