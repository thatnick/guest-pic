import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Button,
  SafeAreaView
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SelectedEventContext } from "../../contexts";
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

export default function EventDetails() {
  const navigation = useNavigation();
  const { selectedEvent } = useContext(SelectedEventContext);
  const [items, setItems] = useState<ItineraryItem[]>();
  const [addItnerary, setAddItnerary] = useState(false);

  useEffect(() => {
    getItineraryItemsByEvent(selectedEvent.id).then((items) => {
      setItems(items);
    });
  }, []);

  // ***********
  // TODO: set the in progress event and item here where the date / time changes?
  // ***********

  return (
    <SafeAreaView style={styles.content}>
      {/* <Button title="Close" onPress={() => navigation.goBack()}></Button> */}

      <TouchableOpacity style={styles.back}>
        <IonIcon
          name={"ios-arrow-undo-outline"}
          size={35}
          color="blue"
          onPress={() => navigation.goBack()}
        />
      </TouchableOpacity>

      <Image
        style={styles.image}
        source={{
          uri: selectedEvent.bannerUrl,
        }}
      />
      <Text>{selectedEvent.title}</Text>
      <TouchableOpacity style={styles.camera}>
        <IonIcon
          name={"camera-outline"}
          size={80}
          color="blue"
          onPress={() => {
            navigation.navigate("EventCamera");
          }}
        />
        <Text> Take a Pic</Text>
      </TouchableOpacity>
      <Text>Itinerary:</Text>
      <FlatList
        style={{
          flex: 1,
        }}
        data={items}
        renderItem={({ item }) => (
          <View>
            <Text>{item.time.toDate().toTimeString()}</Text>
            <Text>{item.title}</Text>
            <Text>{item.location}</Text>
            {/* This isn't working yet because photos aren't saved in the
           correct itinerary item - see th TODO in PhotoPreview.tsx*/}
            <PhotoGallery
              photosCallback={() =>
                getPhotosByItineraryItem(selectedEvent.id, item.id)
              }
            />
          </View>
        )}
      />
      <Button onPress={() => setAddItnerary(true)} title="Add itnerary item"></Button>
      
      <Modal
      style={styles.centeredView}
        animationType="slide"
        presentationStyle="pageSheet"
        visible={addItnerary}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setAddItnerary(!addItnerary);
        }}
      >
        <ItineraryItemForm setAddItnerary={setAddItnerary}/>
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
    flex: 0.25,
    width: "95%",
    borderRadius: 8,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 40,
  },
  shadowProp: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "grey",
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: "#0000",
  },
  back: {
    padding: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
