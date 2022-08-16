import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import IonIcon from "react-native-vector-icons/Ionicons";
import { SelectedEventContext, UserContext } from "../../contexts";
import { getIsHostByEventId } from "../../firebase/db";

export default function CameraButton() {
  const navigation = useNavigation();
  const { selectedEvent } = useContext(SelectedEventContext);
  const { user } = useContext(UserContext);
  if (!getIsHostByEventId(user.email, selectedEvent.eventId)) return null;
  return (
    <View>
      <TouchableOpacity style={styles.camera}>
        <IonIcon
          name={"camera-outline"}
          size={80}
          color="blue"
          onPress={() => {
            navigation.navigate("EventCamera");
          }}
        />
        <Text> Take a Pic</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10,
  },
});
