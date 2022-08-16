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
  Pressable,
} from "react-native";
import { UserContext } from "../../contexts";
import {
  addEvent,
  addGuestToEvent,
  addItineraryItemToEvent,
} from "../../firebase/db";
import { styles } from "../../styles/forms";

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
    <SafeAreaView style={styles.modalView}>
      <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Host an Event</Text>
          <Pressable style={styles.modalCloseButton} onPress={() => navigation.goBack()}>
            <Text style={styles.modalButtonText}>X</Text>
          </Pressable>
        </View>
      <ScrollView>


        
        <View>
          <Text style={styles.modalTitle}>Event</Text>
          <Text style={styles.modalSubtitle}>Title:</Text>
          <TextInput style={styles.modalTextbox}
            onChangeText={(newText) => setEventTitle(newText)}
          ></TextInput>

          <Text style={styles.modalSubtitle}>Location:</Text>
          <TextInput style={styles.modalTextbox}
            onChangeText={(newText) => setEventLocation(newText)}
          ></TextInput>

          <Text style={styles.modalSubtitle}>Description:</Text>
          <TextInput style={styles.modalTextbox}
            onChangeText={(newText) => setEventDescription(newText)}
          ></TextInput>

          <Text style={styles.modalSubtitle}>Banner url:</Text>
          <TextInput style={styles.modalTextbox} onChangeText={(newText) => setBanner(newText)}></TextInput>

          <Text style={styles.modalSubtitle}>Event Date:</Text>
          <DatePicker
            date={eventDate}
            onDateChange={setEventDate}
            mode={"date"}
            minimumDate={new Date()}
          />
        </View>

        <View>
          <Text style={styles.modalTitle}>Add your first Itinerary Item</Text>
          <Text style={styles.modalSubtitle}>Title:</Text>
          <TextInput style={styles.modalTextbox}
            onChangeText={(newText) => setItineraryTitle(newText)}
          ></TextInput>

          <Text style={styles.modalSubtitle}>Location:</Text>
          <TextInput style={styles.modalTextbox}
            onChangeText={(newText) => setItineraryLocation(newText)}
          ></TextInput>

          <Text style={styles.modalSubtitle}>Descrition:</Text>
          <TextInput style={styles.modalTextbox}
            onChangeText={(newText) => setItineraryDescription(newText)}
          ></TextInput>

          <Text style={styles.modalSubtitle}>Start Time:</Text>
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
