import {
  Alert,
  Image,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Button,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  InProgressEventsContext,
  SelectedEventContext,
  UserContext,
} from "../../contexts";
import { useNavigation } from "@react-navigation/native";
import { itinStyle } from "../../styles/itineraryItem";

import PhotoGallery from "../gallery/PhotoGallery";
import {
  getIsHostByEventId,
  getItineraryItemsByEvent,
  getPhotosByItineraryItem,
} from "../../firebase/db";
import { ItineraryItem } from "../../utilities/types";
import { FlatList } from "react-native-gesture-handler";

import IonIcon from "react-native-vector-icons/FontAwesome";
import IonIcon2 from "react-native-vector-icons/Ionicons";
import ItineraryItemForm from "./ItineraryItemForm";
import { BackButton } from "../BackButton";
import { pageStyle, buttons } from "../../styles/EvenDetails";

export default function EventDetails() {
  const navigation = useNavigation();
  const { selectedEvent } = useContext(SelectedEventContext);
  const { inProgressEvents } = useContext(InProgressEventsContext);
  const { user } = useContext(UserContext);
  const [items, setItems] = useState<ItineraryItem[]>();
  const [addItnerary, setAddItnerary] = useState(false);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    getItineraryItemsByEvent(selectedEvent.id).then((items) => {
      setItems(items);
    });
  }, [addItnerary]);

  useEffect(() => {
    getIsHostByEventId(user.email, selectedEvent.id).then((isHost) => {
      setIsHost(isHost);
    });
  }, []);

  return (
    <SafeAreaView style={pageStyle.content}>
      <View style={pageStyle.banner}>
        <Image
          style={pageStyle.bannerImg}
          source={{
            uri: selectedEvent.bannerUrl,
          }}
        />
        <View style={pageStyle.bannerInfo}>
          <Text style={pageStyle.bannerTitle}>{selectedEvent.title}</Text>
          <Text>{selectedEvent.description}</Text>
          <Text>{selectedEvent.date.toString().slice(0, 15)}</Text>
        </View>
      </View>

      <View style={itinStyle.section}>
        <Text style={itinStyle.sectionTitle}>Event Itinerary</Text>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <View style={itinStyle.container}>
              <View style={itinStyle.header}>
                <View style={itinStyle.time}>
                  <Text style={itinStyle.title}>
                    {item.startTime.toTimeString().slice(0, 5)}
                  </Text>
                </View>
                <View style={itinStyle.info}>
                  <Text style={itinStyle.title}>{item.title}</Text>
                  <Text>{item.location}</Text>
                </View>
              </View>
              <View style={itinStyle.gallery}>
                <PhotoGallery
                  photosCallback={() =>
                    getPhotosByItineraryItem(selectedEvent.id, item.id)
                  }
                />
              </View>
            </View>
          )}
        />
      </View>
      {!inProgressEvents[0] ? null : selectedEvent.id ===
        inProgressEvents[0].id ? (
        <TouchableOpacity style={buttons.camera}>
          <IonIcon
            name={"camera"}
            size={30}
            color="black"
            onPress={() => {
              navigation.navigate("EventCamera");
            }}
          />
        </TouchableOpacity>
      ) : null}

      <Pressable style={buttons.back}>
        <IonIcon2
          name={"close"}
          size={30}
          color={"black"}
          onPress={() => navigation.goBack()}
        />
      </Pressable>

      <TouchableOpacity
        style={buttons.guests}
        onPress={() => {
          navigation.navigate("GuestList");
        }}
      >
        <Text style={buttons.guestsText}>Guests</Text>
      </TouchableOpacity>

      {isHost ? (
        <Button
          onPress={() => setAddItnerary(true)}
          title="Add itnerary item"
        ></Button>
      ) : null}

      <Modal
        style={pageStyle.centeredView}
        animationType="slide"
        transparent={true}
        visible={addItnerary}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setAddItnerary(!addItnerary);
        }}
      >
        <ItineraryItemForm setAddItnerary={setAddItnerary} />
      </Modal>
    </SafeAreaView>
  );
}
