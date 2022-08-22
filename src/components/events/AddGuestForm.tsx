import React, { Dispatch, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { addGuestToEvent, getUserByEmail, addUser } from "../../firebase/db";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../styles/forms";
import { CloseModalButton } from "../CloseModalButton";

interface Props {
  eventId: string;
  setModalVisible: Dispatch<React.SetStateAction<boolean>>;
}

export default function AddGuestForm({ eventId, setModalVisible }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAddGuestPress = () => {
    getUserByEmail(email).then((user) => {
      if (user.name === undefined) {
        addUser({
          email,
          name,
          avatarUrl:
            "https://cdn.pixabay.com/photo/2013/07/18/10/56/smiley-163510_1280.jpg",
        })
          .then(() => {
            addGuestToEvent({ email, eventId, isHost: false }).then(() =>
              Alert.alert("Invitation Sent")
            );
          })
          .catch(() => Alert.alert("Sorry cannot be added ...Try Again"));
      } else {
        addGuestToEvent({ email, eventId, isHost: false })
          .then(() => {
            Alert.alert("Invitation Sent");
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
        <Text style={styles.modalTitle}>Invite Guest</Text>
        <CloseModalButton setModalVisible={setModalVisible} />
      </View>
      <View>
        <Text style={styles.modalSubtitle}>Name:</Text>
        <TextInput
          style={styles.modalTextbox}
          value={name}
          placeholder="name"
          onChangeText={(newText) => setName(newText)}
        ></TextInput>

        <Text style={styles.modalSubtitle}>Email:</Text>
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
        <Text style={styles.modalButtonText}>send invite</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
