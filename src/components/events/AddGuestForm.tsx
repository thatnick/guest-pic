import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { addGuestToEvent, getUserByEmail, addUser } from "../../firebase/db";
import { Event } from "../../utilities/types";
import IonIcon from "react-native-vector-icons/Ionicons";

interface Props {
  event: Event;
}

export default function AddGuestForm({ event, setModalVisible }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAddGuestPress = () => {
    getUserByEmail(email).then((user) => {
      if (user.name === undefined) {
        addUser({
          email,
          name,
          avatarUrl:
            "https://openpsychometrics.org/tests/characters/test-resources/pics/S/3.jpg",
        })
          .then(() => {
            addGuestToEvent({ email, eventId: event, isHost: false }).then(() =>
              Alert.alert("Guest Added")
            );
          })
          .catch(() => Alert.alert("Sorry cannot be added ...Try Again"));
      } else {
        addGuestToEvent({ email, eventId: event, isHost: false })
          .then(() => {
            Alert.alert("Guest Added");
          })
          .catch(() => Alert.alert("Sorry cannot be added ...Try Again"));
      }
    });

    setName("");
    setEmail("");
  };

  return (
    <View style={styles.content}>
      <TouchableOpacity style={styles.buttons}>
        <View>
          <IonIcon
            name={"ios-arrow-undo-outline"}
            size={35}
            color="blue"
            onPress={() => setModalVisible(false)}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.input}>
        <Text style={{ backgroundColor: "white" }}>Name:</Text>
        <TextInput onChangeText={(newText) => setName(newText)}></TextInput>

        <Text>Email:</Text>
        <TextInput onChangeText={(newText) => setEmail(newText)}></TextInput>
      </View>

      {/* <Button title="Add guest" onPress={handleAddGuestPress}></Button> */}
      <TouchableOpacity style={styles.buttons}>
        <IonIcon
          name={"person-add-outline"}
          size={35}
          color="blue"
          onPress={() => {
            console.log("click");
          }}
        >
          <Text
            style={{ fontFamily: "Arial", fontSize: 15 }}
            onPress={handleAddGuestPress}
          >
            add guest
          </Text>
        </IonIcon>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },

  buttons: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
  },
});
