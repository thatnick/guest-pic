import React from "react";
import { StyleSheet } from "react-native";

import ImageView from "react-native-image-viewing";
import { useNavigation } from "@react-navigation/native";

export default function FullScreenPhoto({ route }) {
  const { imageSources } = route.params;
  const navigation = useNavigation();
  console.log("In full screen", imageSources);

  return (
    <ImageView
      images={imageSources}
      imageIndex={0}
      visible={true}
      swipeToCloseEnabled={false}
      onRequestClose={() => navigation.goBack()}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    padding: 40,
  },
});
