import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { addGuestToEvent, getUserByEmail, addUser } from "../../firebase/db";
import { Event } from "../../utilities/types";
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from '../../styles/forms'
import { CloseModalButton } from "../CloseModalButton";

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
    <SafeAreaView style={styles.modalView}>
      <View style={styles.modalHeader}>
      <Text style={styles.modalTitle}>Add Guest</Text>
      <CloseModalButton setModalVisible={setModalVisible}/>
      </View>

      <View>
      <Text style={styles.modalSubtitle}>Name:</Text>
      <TextInput
        style={styles.modalTextbox}
        value={name}
        placeholder="name"
        onChangeText={(newText) => setName(newText)}
        ></TextInput>
        
      <Text style={styles.modalSubtitle}>Email:
      
        </Text>
      <TextInput
        style={styles.modalTextbox}
        textContentType="emailAddress"
        value={email}
        autoCapitalize="none"
        placeholder="email@example.com"
        onChangeText={(newText) => setEmail(newText)}
        ></TextInput>
      </View>

      <TouchableOpacity
          style={styles.modalSubmit}
          onPress={handleAddGuestPress}
        >
          <Text style={styles.modalButtonText}>Submit</Text>
        </TouchableOpacity>
    </SafeAreaView>

  );
}

