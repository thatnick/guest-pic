import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { SelectedEventContext, UserContext } from "../../contexts";
import { addPhotoToItineraryItem } from "../../firebase/db";

export default function PhotoPreview({ route }) {
  const { photoFile } = route.params;
  const navigation = useNavigation();
  const { selectedEvent } = useContext(SelectedEventContext);
  const { user } = useContext(UserContext);

  return (
    <ImageBackground
      style={{
        height: "100%",
        width: "100%",
      }}
      source={{ uri: photoFile.path }}
    >
      <View style={styles.content}>
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
              console.log("PATH" + photoFile.path);
              await addPhotoToItineraryItem({
                eventId: selectedEvent.id,
                // TODO: don't hardcode the itemid -
                // decide how to determine what the
                // correct itinerary item is...
                itemId: "7egFFUO2Fd0BXwq0btfw",
                filePath: photoFile.path,
                userEmail: user.email,
              });

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
    alignItems: "flex-end",
    padding: 50,
  },
  retake: {
    display: "flex",
    width: "50%",
  },
  save: {
    display: "flex",
    width: "50%",
  },
});
