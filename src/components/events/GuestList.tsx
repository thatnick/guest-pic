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
import { styles } from "../../styles/guestList";
import { BLUE, PURPLE, RED, YELLOW } from '../../styles/guestList';
import { BackButton } from "../BackButton";
import { SafeAreaView } from "react-native-safe-area-context";

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
    
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Guest List</Text>
      <View style={styles.alignRight}>
      <BackButton/>
      </View>
      <View style={styles.flatlist}>
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
      </View>
      <View style={styles.modal}>
      <Modal visible={modalVisible}>
        <AddGuestForm
          setModalVisible={setModalVisible}
          event={selectedEvent.id}
        />
      </Modal>
      </View>
    </SafeAreaView>
  );
}

