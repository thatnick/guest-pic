import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Button,
  SafeAreaView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  InProgressEventsContext,
  SelectedEventContext,
  UserContext,
} from "../../contexts";
import { useNavigation } from "@react-navigation/native";

import PhotoGallery from "../gallery/PhotoGallery";
import {
  getItineraryItemsByEvent,
  getPhotosByItineraryItem,
} from "../../firebase/db";
import { ItineraryItem } from "../../utilities/types";
import { FlatList } from "react-native-gesture-handler";
import IonIcon from "react-native-vector-icons/Ionicons";
import ItineraryItemForm from "./ItineraryItemForm";
import CameraButton from "../camera/CameraButton";

export default function EventDetails() {
  const navigation = useNavigation();
  const { selectedEvent } = useContext(SelectedEventContext);
  const { user } = useContext(UserContext);
  const [items, setItems] = useState<ItineraryItem[]>();
  const [addItnerary, setAddItnerary] = useState(false);

  useEffect(() => {
    getItineraryItemsByEvent(selectedEvent.id).then((items) => {
      setItems(items);
    });
  }, [addItnerary]);

  return (
    <SafeAreaView style={styles.content}>
      <Image
        style={styles.image}
        source={{
          uri: selectedEvent.bannerUrl,
        }}
      />
      <Text>{selectedEvent.title}</Text>
      <Text>Itinerary:</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View>
            <Text>{item.startTime.toTimeString()}</Text>
            <Text>{item.title}</Text>
            <Text>{item.location}</Text>

            <PhotoGallery
              photosCallback={() =>
                getPhotosByItineraryItem(selectedEvent.id, item.id)
              }
            />
          </View>
        )}
      />

      <CameraButton />
      <TouchableOpacity style={styles.buttons}>
        <IonIcon
          name={"people-outline"}
          size={35}
          color="blue"
          onPress={() => {}}
        >
          <Text
            style={{ fontFamily: "Arial", fontSize: 15 }}
            onPress={() => {
              navigation.navigate("GuestList");
            }}
          >
            guest list
          </Text>
        </IonIcon>
      </TouchableOpacity>
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

      <Button
        onPress={() => setAddItnerary(true)}
        title="Add itnerary item"
      ></Button>
      <Modal
        style={styles.centeredView}
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

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    flex: 0.5,
    width: "95%",
    borderRadius: 8,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10,
  },
  shadowProp: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "grey",
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: "#0000",
  },
  top: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttons: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
