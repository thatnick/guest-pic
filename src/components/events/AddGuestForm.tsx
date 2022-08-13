import React, { useState } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { addGuestToEvent, getUserByEmail, addUser } from "../../firebase/db";
import { Event } from "../../utilities/types";

interface Props {
  event: Event;
}

export default function AddGuestForm({ event }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAddGuestPress = () => {
    getUserByEmail(email).then((user) => {
      if (!user) throw new Error("User not found");
      if (user.name === undefined) {
        addUser({
          email,
          name,
          avatarUrl:
            "https://openpsychometrics.org/tests/characters/test-resources/pics/S/3.jpg",
        });
        addGuestToEvent({ email, eventId: event.id, isHost: false });
      } else {
        addGuestToEvent({ email, eventId: event.id, isHost: false });
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
