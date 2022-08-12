import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import DatePicker from "react-native-datepicker";
import { addItineraryItem } from "../../firebase/db";

const IteninaryForm = () => {
  const [time, setTime] = useState();
  const [title, setTitle] = useState("");
  const [location, setlocation] = useState("");
  const [description, setDescription] = useState("");

  const newItinerary = {
    time: time.toString(),
    title: title,
    location: location,
    description: description,
    event: "??? Need to change this",
  }

  function formSubmitHandler() {
    addItineraryItem(newItinerary)
  }

  return (
    <SafeAreaView style={styles.form}>
      {/* <Button title="Set time" onPress={() => setOpen(true)} /> */}
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
          setTime(confirmTime);
        }}
      />
      <Text>Title</Text>
      <TextInput
        style={styles.Text}
        value={title}
        onChangeText={(iteninaryTitle) => setTitle(iteninaryTitle)}
      />
      <Text>Location</Text>
      <TextInput
        style={styles.Text}
        value={location}
        onChangeText={(selectedLocation) => setlocation(selectedLocation)}
      />
      <Text>Description </Text>
      <TextInput
        style={styles.Text}
        value={description}
        onChangeText={(userDescription) => setDescription(userDescription)}
      />
      <Button title="Submit" onPress={formSubmitHandler} />
    </SafeAreaView>
  );
};

export default IteninaryForm;

const styles = StyleSheet.create({
  form: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  Text: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
