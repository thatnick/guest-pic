import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import { SelectedEventContext, UserContext } from "../../contexts";
import { addPhotoToItineraryItem } from "../../firebase/db";
import IonIcon from "react-native-vector-icons/Ionicons";

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
        <TouchableOpacity>
          <IonIcon
            name={"trash-outline"}
            size={50}
            color="red"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <IonIcon
            name={"ios-checkmark-outline"}
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
    justifyContent: "space-around",
    alignItems: "flex-end",
    padding: 40,
  },
});
