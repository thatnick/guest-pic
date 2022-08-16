import {
  Button,
  Keyboard,
  SafeAreaView,
  Pressable,
  Text,
  TextInput,
  ScrollView,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import DatePicker from "react-native-date-picker";
import { addItineraryItemToEvent } from "../../firebase/db";

import { SelectedEventContext, UserContext } from "../../contexts";
import { styles } from "../../styles/forms";

const ItineraryItemForm = ({ setAddItnerary }) => {
  const { user } = useContext(UserContext);
  const { selectedEvent } = useContext(SelectedEventContext);
  const [itineraryTitle, setItineraryTitle] = useState("");
  const [itineraryLocation, setItineraryLocation] = useState("");
  const [itineraryDescription, setItineraryDescription] = useState("");
  const [itineraryTime, setItineraryTime] = useState(selectedEvent.date);

  const formSubmitHandler = async () => {
    await addItineraryItemToEvent({
      eventId: selectedEvent.id,
      title: itineraryTitle,
      location: itineraryLocation,
      time: itineraryTime,
      description: itineraryDescription,
    });
    setAddItnerary(false);
  };

  return (
    <SafeAreaView style={styles.modalView} onPress={() => Keyboard.dismiss()}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Add an Itinerary Item</Text>
        <Pressable
          style={styles.modalCloseButton}
          onPress={() => setAddItnerary(false)}
        >
          <Text style={styles.modalButtonText}>X</Text>
        </Pressable>
      </View>

      <ScrollView>
        <Text style={styles.modalSubtitle}>Title:</Text>
        <TextInput
          style={styles.modalTextbox}
          onChangeText={(newText) => setItineraryTitle(newText)}
        ></TextInput>

        <Text style={styles.modalSubtitle}>Location:</Text>
        <TextInput
          style={styles.modalTextbox}
          onChangeText={(newText) => setItineraryLocation(newText)}
        ></TextInput>

        <Text style={styles.modalSubtitle}>Descrition:</Text>
        <TextInput
          style={styles.modalTextbox}
          onChangeText={(newText) => setItineraryDescription(newText)}
        ></TextInput>

        <Text style={styles.modalSubtitle}>Start Time:</Text>
        <DatePicker
          date={itineraryTime}
          onDateChange={setItineraryTime}
          mode={"time"}
        />

        <Button title="Submit" onPress={formSubmitHandler} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ItineraryItemForm;
