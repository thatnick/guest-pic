import React, { useState, useContext } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { UserContext } from "../../contexts/UserContext";
import { addEvent } from "../../firebase/db";

export default function CreateEvent({ setAddEventForm }) {
  const [eventTitle, setEventTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [banner, setBanner] = useState("");

  const { user } = useContext(UserContext);

  const handleRegisterPress = async () => {
    const eventToAdd = {
      title: eventTitle,
      description: description,
      location: location,
      date: date,
      banner: banner,
      hosts: user,
    };

    await addEvent(eventToAdd);

    setAddEventForm(false);

    setEventTitle("");
    setLocation("");
    setDescription("");
    setDate("");
    setBanner("");
  };

  return (
    <View>
      <Text>Event Title:</Text>
      <TextInput onChangeText={(newText) => setEventTitle(newText)}></TextInput>

      <Text>Location:</Text>
      <TextInput onChangeText={(newText) => setLocation(newText)}></TextInput>

      <Text>Description:</Text>
      <TextInput
        onChangeText={(newText) => setDescription(newText)}
      ></TextInput>

      <Text>Date:</Text>
      <TextInput
        placeholder="dd/mm/yyyy"
        onChangeText={(newText) => setDate(newText)}
      ></TextInput>

      <Text>Banner url:</Text>
      <TextInput onChangeText={(newText) => setBanner(newText)}></TextInput>

      <Button title="Create" onPress={handleRegisterPress}></Button>
      <Button title="X" onPress={() => setAddEventForm(false)}></Button>
    </View>
  );
}
