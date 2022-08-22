import React, { useContext, useEffect, useState } from "react";
import { FlatList, Modal, StatusBar, Text, View } from "react-native";
import { SelectedEventContext, UserContext } from "../../contexts";
import {
  getGuestsByEventId,
  getGuestUsersByEventId,
  getIsHostByEventId,
} from "../../firebase/db";
import AddGuestForm from "./AddGuestForm";
import GuestCard from "./GuestCard";
import { guestListStyles } from "../../styles/guestListStyles";
import { BackButton } from "../BackButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddGuestFormButton } from "./AddGuestFormButton";
import { pageStyle } from "../../styles/eventDetailsStyles";
import { Guest, User } from "../../utilities/types";

export default function GuestList() {
  const { selectedEvent } = useContext(SelectedEventContext);
  const { user } = useContext(UserContext);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isHost, setIsHost] = useState(false);

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

  return (
    <SafeAreaView style={guestListStyles.container}>
      <StatusBar barStyle={"light-content"} />
      <View style={guestListStyles.alignRight}>
        <View></View>
        <Text style={guestListStyles.headerText}>Guest List</Text>
        <BackButton />
      </View>
      <View style={guestListStyles.flatlist}>
        <FlatList
          data={users}
          renderItem={({ item: user }) => (
            <GuestCard guestUser={user} guests={guests} />
          )}
        />
      </View>

      <View style={guestListStyles.modal}>
        {isHost ? (
          <AddGuestFormButton setModalVisible={setModalVisible} />
        ) : null}
        <Modal
          style={pageStyle.centeredView}
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <AddGuestForm
            setModalVisible={setModalVisible}
            eventId={selectedEvent.id}
          />
        </Modal>
      </View>
    </SafeAreaView>
  );
}
