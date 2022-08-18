import React, { useEffect, useState } from "react";

import ImageView from "react-native-image-viewing";
import { useNavigation } from "@react-navigation/native";
import { getPhotosByItineraryItem } from "../../firebase/db";

export default function FullScreenPhoto({ route }) {
  const { event, item, index } = route.params;
  const navigation = useNavigation();
  const [imageSources, setImageSources] = useState([]);

  useEffect(() => {
    getPhotosByItineraryItem(event, item).then((photos) => {
      setImageSources(photos.map((photo) => ({ uri: photo.downloadUrl })));
    });
  }, []);

  return (
    <ImageView
      images={imageSources}
      imageIndex={index}
      visible={true}
      swipeToCloseEnabled={false}
      onRequestClose={() => navigation.goBack()}
    />
  );
}
