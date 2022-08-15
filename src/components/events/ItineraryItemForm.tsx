import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View
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
    <SafeAreaView style={styles.form}>
     <View>
          <Text>Add an Itinerary Item</Text>
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
            date={itineraryTime}
            onDateChange={setItineraryTime}
            mode={"time"}
          />
        </View>
        <Button title="Submit" onPress={formSubmitHandler} />
        <Button title="close" onPress={() => setAddItnerary(false)} />
        
    </SafeAreaView>
  );
};

export default ItineraryItemForm;

const styles = StyleSheet.create({
  form: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  text: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
