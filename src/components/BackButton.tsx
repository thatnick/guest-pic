import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { guestListStyles } from "../styles/guestListStyles";

export const BackButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable style={guestListStyles.buttons}>
      <IonIcon
        name={"close"}
        size={30}
        color={"black"}
        onPress={() => navigation.goBack()}
      />
    </Pressable>
  );
};
