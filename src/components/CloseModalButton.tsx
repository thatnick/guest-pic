import React from "react";
import { Pressable } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { guestListStyles } from "../styles/guestListStyles";

export const CloseModalButton = ({ setModalVisible }) => {
  return (
    <Pressable style={guestListStyles.buttons}>
      <IonIcon
        name={"close"}
        size={30}
        color={"black"}
        onPress={() => setModalVisible(false)}
      />
    </Pressable>
  );
};
