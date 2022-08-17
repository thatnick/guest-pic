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
import { SelectedEventContext, UserContext } from "../../contexts";
import {
  getGuestsByEventId,
  getGuestUsersByEventId,
  getIsHostByEventId,
} from "../../firebase/db";
import AddGuestForm from "./AddGuestForm";
import GuestCard from "./GuestCard";

export default function GuestList() {
  const { selectedEvent } = useContext(SelectedEventContext);
  const { user } = useContext(UserContext);
  const [guests, setGuests] = useState([]);
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getGuestUsersByEventId(selectedEvent.id).then((users) => {
      setUsers(users);
    });
    getGuestsByEventId(selectedEvent.id).then((guests) => {
      setGuests(guests);
    });
  }, [selectedEvent, modalVisible]);

  useEffect(() => {
    getIsHostByEventId(user.email, selectedEvent.id).then((isHost) => {
      setIsHost(isHost);
    });
  }, []);
  // console.log(guests);
  return (
    <View style={styles.content}>
      <TouchableOpacity style={styles.buttons}>
        <IonIcon
          name={"ios-arrow-undo-outline"}
          size={35}
          color="royalblue"
          onPress={() => navigation.goBack()}
        />
      </TouchableOpacity>

      <FlatList
        data={users}
        renderItem={({ item }) => <GuestCard item={item} guests={guests} />}
      />

      {isHost ? (
        <TouchableOpacity style={styles.buttons}>
          <IonIcon name={"person-add-outline"} size={35} color="royalblue">
            <Text
              style={{ fontFamily: "Rockwell", fontSize: 15 }}
              onPress={() => {
                setModalVisible(true);
              }}
            >
              add guest
            </Text>
          </IonIcon>
        </TouchableOpacity>
      ) : null}

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
