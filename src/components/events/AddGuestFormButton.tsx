import React from "react";
import { Pressable, Text } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { addGuestButtonStyles } from "../../styles/addGuestButtonStyles";

export const AddGuestFormButton = ({ setModalVisible }) => {
  return (
    <Pressable style={addGuestButtonStyles.button}>
      <IonIcon name={"person-add-outline"} size={30} color="black">
        <Text
          style={{ fontSize: 15 }}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          invite guest
        </Text>
      </IonIcon>
    </Pressable>
  );
};
