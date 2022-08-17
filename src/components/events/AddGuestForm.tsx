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
import IonIcon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from '../../styles/addGuestForm'
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
    <SafeAreaView style={styles.container}>
      <View style={styles.alignRight}>
      <View></View>
      <Text style={styles.headerText}>Add Guest</Text>
      <CloseModalButton setModalVisible={setModalVisible}/>
      </View>
      <View style={{flex:1}}></View>
      <View style={styles.flatlist}>
        <Text>Name:</Text>
        <TextInput
          value={name}
          autoCapitalize="none"
          placeholder="name"
          onChangeText={(newText) => setName(newText)}
        ></TextInput>

        <Text>Email:</Text>
        <TextInput
          textContentType="emailAddress"
          value={email}
          autoCapitalize="none"
          placeholder="email"
          onChangeText={(newText) => setEmail(newText)}
        ></TextInput>
      </View>
<View>

<View style={styles.addGuest}>

      <TouchableOpacity style={styles.buttons}>
        <IonIcon
          name={"person-add-outline"}
          size={30}
          color="black"
          onPress={() => {
            console.log("click");
          }}
          >
          <Text
            style={{ fontFamily: "Rockwell", fontSize: 15 }}
            onPress={handleAddGuestPress}
            >
            add guest
          </Text>
        </IonIcon>
      </TouchableOpacity>
            </View>
              </View>
      <View style={{flex:3}}>
      </View>
    </SafeAreaView>

  );
}

