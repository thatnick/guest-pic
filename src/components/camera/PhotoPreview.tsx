import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
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
      style={{
        height: "100%",
        width: "100%",
      }}
      source={{ uri: photo.path }}
    >
      <View style={styles.content}>
        <TouchableOpacity>
          <Icon
            name={"remove"}
            size={50}
            color="red"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <TouchableOpacity>
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
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent:'space-around',
    alignItems:'flex-end',
    padding:40
  },
 
});
