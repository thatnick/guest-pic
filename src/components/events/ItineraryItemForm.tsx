import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import React, { useContext, useState } from "react";
import DatePicker from "react-native-datepicker";
import { addItineraryItemToEvent } from "../../firebase/db";
import { SelectedEventContext } from "../../contexts";
import { Timestamp } from "firebase/firestore";

const ItineraryItemForm = () => {
  const { selectedEvent } = useContext(SelectedEventContext);
  const [time, setTime] = useState(Timestamp.fromDate(new Date()));
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  function formSubmitHandler() {
    // TODO: set the date to be the same as the event date (but keep
    // the time from the time picker)
    addItineraryItemToEvent({
      eventId: selectedEvent.id,
      time: time,
      title: title,
      location: location,
      description: description,
    });
  }

  return (
    <SafeAreaView style={styles.form}>
      <DatePicker
        style={{ width: 200 }}
        date={time}
        mode="time"
        is24Hour="true"
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
          setTime(new Date(confirmTime));
        }}
      />
      <Text>Title</Text>
      <TextInput
        style={styles.text}
        value={title}
        onChangeText={(iteninaryTitle) => setTitle(iteninaryTitle)}
      />
      <Text>Location</Text>
      <TextInput
        style={styles.text}
        value={location}
        onChangeText={(selectedLocation) => setLocation(selectedLocation)}
      />
      <Text>Description </Text>
      <TextInput
        style={styles.text}
        value={description}
        onChangeText={(userDescription) => setDescription(userDescription)}
      />
      <Button title="Submit" onPress={formSubmitHandler} />
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
