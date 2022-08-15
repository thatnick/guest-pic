import React, { useState } from "react";
import { Text, View, TextInput, Button, TouchableOpacity, StyleSheet } from "react-native";
import { addGuestToEvent, getUserByEmail, addUser } from "../../firebase/db";
import { Event } from "../../utilities/types";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";


interface Props {
  event: Event;
}

export default function AddGuestForm({ event }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleAddGuestPress = () => {
    getUserByEmail(email).then((user) => {
      if (!user) throw new Error("User not found");
      if (user.name === undefined) {
        addUser({
          email,
          name,
          avatarUrl:
            "https://openpsychometrics.org/tests/characters/test-resources/pics/S/3.jpg",
        });
        addGuestToEvent({ email, eventId: event.id, isHost: false });
      } else {
        addGuestToEvent({ email, eventId: event.id, isHost: false });
      }
    });

    setName("");
    setEmail("");
  };

  return (
    <View>
       <TouchableOpacity style={styles.buttons}>
        <View>

        <IonIcon
          name={"ios-arrow-undo-outline"}
          size={35}
          color="blue"
          onPress={() => navigation.goBack()}
          />
          </View>

      </TouchableOpacity>
      <View style={styles.input}>
      <Text style={{backgroundColor:'white'}}>Name:</Text>
      <TextInput onChangeText={(newText) => setName(newText)}></TextInput>

      <Text>Email:</Text>
      <TextInput onChangeText={(newText) => setEmail(newText)}></TextInput>
      </View>

      {/* <Button title="Add guest" onPress={handleAddGuestPress}></Button> */}
      <TouchableOpacity style={styles.buttons}>
   
         <IonIcon name={"person-add-outline"} size={35} color="blue" onPress={() => {}}>
         <Text style={{ fontFamily: "Arial", fontSize: 15 }} onPress={handleAddGuestPress}>add guest</Text>
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
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    backgroundColor:'white',
    borderRadius:15,
    padding:15,
  }

});