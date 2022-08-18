import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SelectedEventContext, UserContext } from "../../contexts";
import {
  getGuestsByEventId,
  getGuestUsersByEventId,
  getIsHostByEventId,
} from "../../firebase/db";
import AddGuestForm from "./AddGuestForm";
import GuestCard from "./GuestCard";
import { styles } from "../../styles/guestList";
import { BLUE, PURPLE, RED, YELLOW } from "../../styles/guestList";
import { BackButton } from "../BackButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddGuestFormButton } from "./AddGuestFormButton";
import { pageStyle, buttons } from "../../styles/EvenDetails";

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
      <StatusBar barStyle={"light-content"} />
      <View style={styles.alignRight}>
        <View></View>
        <Text style={styles.headerText}>Guest List</Text>
        <BackButton />
      </View>
      <View style={styles.flatlist}>
        <FlatList
          data={users}
          renderItem={({ item }) => <GuestCard item={item} guests={guests} />}
        />
      </View>

      <View style={styles.modal}>
      
      
      {isHost ? (
        

        
        <AddGuestFormButton setModalVisible={setModalVisible}/>
      ) : null}
      <Modal
      style={pageStyle.centeredView}
      animationType='slide'
      transparent={true} 
      visible={modalVisible}>
        <AddGuestForm
          setModalVisible={setModalVisible}
          event={selectedEvent.id}
        />
        
      </Modal>

      </View>
    </SafeAreaView>
  );
}
