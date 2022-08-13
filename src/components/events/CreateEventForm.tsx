import { useNavigation } from "@react-navigation/native";
import React, { useState, useContext } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { UserContext } from "../../contexts";
import { addEvent, addGuestToEvent } from "../../firebase/db";
import { Event } from "../../utilities/types";

export default function CreateEventForm() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [eventTitle, setEventTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [banner, setBanner] = useState("");

  const handleRegisterPress = async () => {
    const eventToAdd: Event = {
      title: eventTitle,
      description: description,
      location: location,
      date: date,
      bannerUrl: banner,
      itinerary: [],
      photoPaths: [],
    };

    const newEvent = await addEvent(eventToAdd);
    if (!newEvent) throw new Error("Cannot add guest to event");
    await addGuestToEvent({
      eventId: newEvent.id,
      isHost: true,
      email: user.email,
    });

    setEventTitle("");
    setLocation("");
    setDescription("");
    setDate(new Date());
    setBanner("");
  };

  return (
    <View>
      <Button title="Create event" onPress={handleRegisterPress}></Button>
      <Button title="Cancel" onPress={() => navigation.goBack()}></Button>
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
        // TODO: Add date picker here
        onChangeText={() => setDate(new Date())}
      ></TextInput>

      <Text>Banner url:</Text>
      <TextInput onChangeText={(newText) => setBanner(newText)}></TextInput>
    </View>
  );
}
