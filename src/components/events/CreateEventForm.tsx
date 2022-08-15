import { useNavigation } from "@react-navigation/native";
import DatePicker from "react-native-datepicker";
import React, { useState, useContext } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { UserContext } from "../../contexts";
import { addEvent, addGuestToEvent, addItineraryItemToEvent } from "../../firebase/db";
import moment from 'moment';

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
  const [itineraryTime, setItineraryTime] = useState("");

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
      time: itineraryTime,
      description: itineraryDescription,
    });

    navigation.goBack();
  };

  return (
    <View>
      <Button title="Cancel" onPress={() => navigation.goBack()} ></Button>
      <View>
      <Text>Event</Text>
      <Text>Title:</Text>
      <TextInput onChangeText={(newText) => setEventTitle(newText)}></TextInput>

      <Text>Location:</Text>
      <TextInput onChangeText={(newText) => setEventLocation(newText)}></TextInput>

      <Text>Description:</Text>
      <TextInput
        onChangeText={(newText) => setEventDescription(newText)}
      ></TextInput>

      <Text>Banner url:</Text>
      <TextInput onChangeText={(newText) => setBanner(newText)}></TextInput>

      <Text>Event Date:</Text>
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

      <View>
      <Text>Add your first Itinerary Item</Text>
      <Text>Title:</Text>
      <TextInput onChangeText={(newText) => setItineraryTitle(newText)}></TextInput>

      <Text>Location:</Text>
      <TextInput onChangeText={(newText) => setItineraryLocation(newText)}></TextInput>

      <Text>Descrition:</Text>
      <TextInput onChangeText={(newText) => setItineraryDescription(newText)}></TextInput>

      <Text>Start Time:</Text>
      <DatePicker
        style={{ width: 200 }}
        date={itineraryTime}
        mode="time"
        format="LT"
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
          setItineraryTime(moment(confirmTime).toDate());
        }}
      />
      </View>

      <Button title="Create event" onPress={handleRegisterPress}></Button>
    </View>
  );
}
