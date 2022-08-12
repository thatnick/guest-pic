import React, { useState } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { addUser, getUserByEmail } from "../../firebase/db";
import { Event, Props } from "../types";

interface Props {
  event: Event;
}

export default function AddGuest({ event }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAddGuestPress = () => {
    getUserByEmail(email).then((user) => {
      if (!user.hasOwnProperty("name")) {
        addUser({
          name,
          avatarUrl:
            "https://openpsychometrics.org/tests/characters/test-resources/pics/S/3.jpg",
        });
        addUserToEvent(email, event.id);
      } else {
        addEventToUser(email, event.id);
        addUserToEvent(email, event.id);
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
