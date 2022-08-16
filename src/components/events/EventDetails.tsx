import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  InProgressEventsContext,
  SelectedEventContext,
  UserContext,
} from "../../contexts";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import PhotoGallery from "../gallery/PhotoGallery";
import {
  getInProgressEventsByGuest,
  getItineraryItemsByEvent,
  getPhotosByItineraryItem,
} from "../../firebase/db";
import { ItineraryItem } from "../../utilities/types";
import { FlatList } from "react-native-gesture-handler";
import IonIcon from "react-native-vector-icons/Ionicons";

export default function EventDetails() {
  const navigation = useNavigation();
  const { selectedEvent } = useContext(SelectedEventContext);
  const { inProgressEvents, setInProgressEvents, dateTime } = useContext(
    InProgressEventsContext
  );
  const { user } = useContext(UserContext);
  const [items, setItems] = useState<ItineraryItem[]>();

  useEffect(() => {
    getItineraryItemsByEvent(selectedEvent.id).then((items) => {
      setItems(items);
    });
  }, []);

  return (
    <View style={styles.content}>
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
            navigation.navigate("SetTestDateTime");
          }}
        />
        {/* TODO: only display the camera button if this event is in inProgressEvents  */}
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
            <Text>{item.startTime.toTimeString()}</Text>
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
    </View>
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
});
