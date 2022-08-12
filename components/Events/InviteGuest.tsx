import React, { useState, useContext } from "react";
import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  TextInput,
  Button,
} from "react-native";
import { UserContext } from "../../contexts/UserContext";
import { addEventToUser, addUser, addUserToEvent, getUserByEmail } from "../../firebase/db";

export default function InviteGuest({ event }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { user } = useContext(UserContext);

  const handleAddGuestPress = () => {
    getUserByEmail(email).then((user) => {
      if (!user.hasOwnProperty('name')) {
        addUser({ name, email, events: [event.id], avatar: "https://openpsychometrics.org/tests/characters/test-resources/pics/S/3.jpg" })
        addUserToEvent(email, event.id)
      } else {
        console.log('handleaddguest')
        addEventToUser(email, event.id)
        addUserToEvent(email, event.id)
      }
    });

    setName("");
    setEmail("");
  };

  return (
    <View>
      <Text>Name:</Text>
      <TextInput onChangeText={(newText) => setName(newText)}></TextInput>

      <Text>Email:</Text>
      <TextInput onChangeText={(newText) => setEmail(newText)}></TextInput>

      <Button title="Add guest" onPress={handleAddGuestPress}></Button>
    </View>
  );
}
