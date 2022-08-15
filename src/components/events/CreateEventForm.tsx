import { useNavigation } from "@react-navigation/native";
import DatePicker from "react-native-datepicker";
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
  const [banner, setBanner] = useState("");
  const [eventDate, setEventDate] = useState("")

  const handleRegisterPress = async () => {
    const eventToAdd: Event = {
      title: eventTitle,
      description: description,
      location: location,
      date: eventDate,
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

      <Text>Banner url:</Text>
      <TextInput onChangeText={(newText) => setBanner(newText)}></TextInput>

      <DatePicker
        style={{ width: 200 }}
        date={eventDate}
        mode="date"
        format="DD-MM-YYYY"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: "absolute",
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 30,
          },
        }}
        onDateChange={(confirmTime) => {
          setEventDate(confirmTime);
        }}
      />
    </View>
  );
}
