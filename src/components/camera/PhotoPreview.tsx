import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { EventContext } from "../../contexts";
import { addPhotoToEvent } from "../../firebase/db";
import { uploadPhoto } from "../../firebase/storage";

export default function PhotoPreview({ route }) {
  const { photo } = route.params;
  const navigation = useNavigation();
  const { event } = useContext(EventContext);

  return (
    <ImageBackground
      style={{ height: "100%", width: "100%" }}
      source={{ uri: photo.path }}
    >
      <TouchableOpacity style={styles.retake}>
        <Icon
          name={"remove"}
          size={50}
          color="red"
          onPress={() => navigation.goBack()}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.save}>
        <Icon
          name={"check"}
          size={50}
          color="green"
          onPress={async () => {
            console.log("PATH" + photo.path);

            await uploadPhoto(photo.path);
            addPhotoToEvent({ eventId: event, photoPath: photo.path });
            navigation.goBack();
          }}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 50,
  },
  retake: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  save: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
});
