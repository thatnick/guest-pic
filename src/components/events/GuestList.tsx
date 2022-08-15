import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { SelectedEventContext } from "../../contexts";
import AddGuestForm from "./AddGuestForm";

export default function GuestList() {
  const { selectedEvent } = useContext(SelectedEventContext);

  return (
    <View>
      <Icon name={"user-plus"} size={50} color="blue" onPress={() => {}}>
        <Text style={{ fontFamily: "Arial", fontSize: 15 }}>Invite guest</Text>
      </Icon>

      <AddGuestForm event={selectedEvent} />
      <TouchableOpacity></TouchableOpacity>
    </View>
  );
}
