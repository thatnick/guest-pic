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
import { addUser, getUserByEmail } from "../../firebase/db";

export default function InviteGuest({ event }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  console.log(event, "EVENT IN INVITE GUEST");

  const { user } = useContext(UserContext);

  const handleAddGuestPress = () => {
    getUserByEmail(email).then((user) => {
      if (!user.hasOwnProperty(name)) {
        addUser({ name, email, events: [event], avatar: user.avatar });
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
