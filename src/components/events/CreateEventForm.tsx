import { useNavigation } from "@react-navigation/native";
//import DatePicker from "react-native-datepicker";
import DatePicker from "react-native-date-picker";
import React, { useState, useContext } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { UserContext } from "../../contexts";
import {
  addEvent,
  addGuestToEvent,
  addItineraryItemToEvent,
} from "../../firebase/db";

export default function CreateEventForm() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);

  // Event
  const [eventTitle, setEventTitle] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [banner, setBanner] = useState("");
  const [eventDate, setEventDate] = useState(new Date());

  // Itinerary
  const [itineraryTitle, setItineraryTitle] = useState("");
  const [itineraryLocation, setItineraryLocation] = useState("");
  const [itineraryDescription, setItineraryDescription] = useState("");

  const handleRegisterPress = async () => {
    const eventToAdd = {
      title: eventTitle,
      description: eventDescription,
      location: eventLocation,
      date: eventDate,
      bannerUrl: banner,
    };

    const newEvent = await addEvent(eventToAdd);
    if (!newEvent) throw new Error("Cannot add guest to event");
    await addGuestToEvent({
      eventId: newEvent.id,
      isHost: true,
      email: user.email,
    });

    await addItineraryItemToEvent({
      eventId: newEvent.id,
      title: itineraryTitle,
      location: itineraryLocation,
      time: eventDate,
      description: itineraryDescription,
    });

    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Button title="Cancel" onPress={() => navigation.goBack()}></Button>
        <View>
          <Text>Event</Text>
          <Text>Title:</Text>
          <TextInput
            onChangeText={(newText) => setEventTitle(newText)}
          ></TextInput>

          <Text>Location:</Text>
          <TextInput
            onChangeText={(newText) => setEventLocation(newText)}
          ></TextInput>

          <Text>Description:</Text>
          <TextInput
            onChangeText={(newText) => setEventDescription(newText)}
          ></TextInput>

          <Text>Banner url:</Text>
          <TextInput onChangeText={(newText) => setBanner(newText)}></TextInput>

          <Text>Event Date:</Text>
          <DatePicker
            date={eventDate}
            onDateChange={setEventDate}
            mode={"date"}
            minimumDate={new Date()}
          />
        </View>

        <View>
          <Text>Add your first Itinerary Item</Text>
          <Text>Title:</Text>
          <TextInput
            onChangeText={(newText) => setItineraryTitle(newText)}
          ></TextInput>

          <Text>Location:</Text>
          <TextInput
            onChangeText={(newText) => setItineraryLocation(newText)}
          ></TextInput>

          <Text>Descrition:</Text>
          <TextInput
            onChangeText={(newText) => setItineraryDescription(newText)}
          ></TextInput>

          <Text>Start Time:</Text>
          <DatePicker
            date={eventDate}
            onDateChange={setEventDate}
            mode={"time"}
          />
        </View>

        <Button title="Create event" onPress={handleRegisterPress}></Button>
      </ScrollView>
    </SafeAreaView>
  );
}
