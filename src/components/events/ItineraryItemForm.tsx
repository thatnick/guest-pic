import {
  Button,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import DatePicker from "react-native-date-picker";
import { addItineraryItemToEvent } from "../../firebase/db";

import { SelectedEventContext, UserContext } from "../../contexts";

const ItineraryItemForm = ({setAddItnerary}) => {
  const { user } = useContext(UserContext);
  const { selectedEvent } = useContext(SelectedEventContext);
  const [itineraryTitle, setItineraryTitle] = useState("");
  const [itineraryLocation, setItineraryLocation] = useState("");
  const [itineraryDescription, setItineraryDescription] = useState("");
  const [itineraryTime, setItineraryTime] = useState(selectedEvent.date.toDate())

  const formSubmitHandler = async () => {
    await addItineraryItemToEvent({
      eventId: selectedEvent.id,
      title: itineraryTitle,
      location: itineraryLocation,
      time: itineraryTime,
      description: itineraryDescription,
    });
    setAddItnerary(false)
  }

  return (
    <SafeAreaView style={styles.modalView} onPress={() => Keyboard.dismiss()}>
     <ScrollView >
          <Text style={styles.modalTitle}>Add an Itinerary Item</Text>
          
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
            date={itineraryTime}
            onDateChange={setItineraryTime}
            mode={"time"}
          />
        
        <Button style={styles.modalButton} title="Submit" onPress={formSubmitHandler} />
        <Button title="close" onPress={() => setAddItnerary(false)} />
        
        </ScrollView>
    </SafeAreaView>
  );
};

export default ItineraryItemForm;


const styles = StyleSheet.create({
 
  modalView: {
    textAlign: "center",
    height: "45%",
    margin: 20,
    marginTop: 100,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    margin: 15,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  modalTextbox: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#EDEDED",
    minHeight: 50,
  },
  
})
