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
import IonIcon from "react-native-vector-icons/Ionicons";

import { SelectedEventContext, UserContext } from "../../contexts";
import { styles } from "../../styles/forms";

const ItineraryItemForm = ({ setAddItnerary }) => {
  const { user } = useContext(UserContext);
  const { selectedEvent } = useContext(SelectedEventContext);
  const [itineraryTitle, setItineraryTitle] = useState("");
  const [itineraryLocation, setItineraryLocation] = useState("");
  const [itineraryDescription, setItineraryDescription] = useState("");
  const [itineraryTime, setItineraryTime] = useState(selectedEvent.date);
  const [endTime, setEndTime] = useState(selectedEvent.date);


  const formSubmitHandler = async () => {
    await addItineraryItemToEvent({
      eventId: selectedEvent.id,
      title: itineraryTitle,
      location: itineraryLocation,
      startTime: itineraryTime,
      endTime: endTime,
      description: itineraryDescription,
    });
    setAddItnerary(false);
  };

  return (
    <SafeAreaView style={styles.modalView} onPress={() => Keyboard.dismiss()}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Add an Itinerary Item</Text>
        <Pressable style={styles.back}>
            <IonIcon 
                name={"close"}
                size={30}
                color={'black'}
                onPress={() => setAddItnerary(false)}/>
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

          <Text style={styles.modalSubtitle}>Start Time:</Text>
          <DatePicker
            date={itineraryTime}
            onDateChange={setItineraryTime}
            mode={"time"}
          />
          <Text style={styles.modalSubtitle}>End Time:</Text>
          <DatePicker
            date={itineraryTime}
            onDateChange={setEndTime}
            mode={"time"}
          />
        
        </ScrollView>
        
        <Pressable
          style={styles.modalSubmit}
          onPress={formSubmitHandler}
        >
          <Text style={styles.modalButtonText}>Submit</Text>
        </Pressable>

    </SafeAreaView>
  );
};

export default ItineraryItemForm;
