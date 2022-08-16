import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { SelectedEventContext } from "../../contexts";
import { getGuestUsersByEventId } from "../../firebase/db";
import AddGuestForm from "./AddGuestForm";
import GuestCard from "./GuestCard";

export default function GuestList() {
  const { selectedEvent } = useContext(SelectedEventContext);
  const [guests, setGuests] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  // useFocusEffect(
  //   // TODO: get events by user (not all events)
  //   useCallback(() => {
  //     getGuestUsersByEventId(selectedEvent.id).then((data) => {
  //       setGuests(data);
  //     });
  //   }, [])
  // );

  useEffect(() => {
    getGuestUsersByEventId(selectedEvent.id).then((data) => {
      setGuests(data);
    });
  }, [selectedEvent, modalVisible]);
  // console.log(guests);
  return (
    <View style={styles.content}>
      <TouchableOpacity style={styles.buttons}>
        <IonIcon
          name={"ios-arrow-undo-outline"}
          size={35}
          color="dodgerblue"
          onPress={() => navigation.goBack()}
        />
      </TouchableOpacity>

      <FlatList
        data={guests}
        renderItem={({ item }) => <GuestCard item={item} />}
      />

      <TouchableOpacity style={styles.buttons}>
        <IonIcon name={"person-add-outline"} size={35} color="dodgerblue">
          <Text
            style={{ fontFamily: "Arial", fontSize: 15 }}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            add guest
          </Text>
        </IonIcon>
      </TouchableOpacity>
      <Modal visible={modalVisible}>
        <AddGuestForm
          setModalVisible={setModalVisible}
          event={selectedEvent.id}
        />
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },

  buttons: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
  },
});
