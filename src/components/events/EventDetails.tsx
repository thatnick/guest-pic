import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
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
import GuestList from "./GuestList";

export default function EventDetails() {
  const navigation = useNavigation();
  const { selectedEvent } = useContext(SelectedEventContext);
  const [items, setItems] = useState<ItineraryItem[]>();

  useEffect(() => {
    getItineraryItemsByEvent(selectedEvent.id).then((items) => {
      setItems(items);
    });
  }, []);

  // ***********
  // TODO: set the in progress event and item here where the date / time changes?
  // ***********

  return (
    <View style={styles.content}>
      <View style={styles.top}>

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
          </View>
      {/* <Button title="Close" onPress={() => navigation.goBack()}></Button> */}


      <Image
        style={styles.image}
        source={{
          uri: selectedEvent.bannerUrl,
        }}
      />
      <Text>{selectedEvent.title}</Text>
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
           <TouchableOpacity style={styles.buttons}>
   
         <IonIcon name={"person-add-outline"} size={35} color="blue" onPress={() => {}}>
         <Text style={{ fontFamily: "Arial", fontSize: 15 }} onPress={()=>{navigation.navigate("GuestList")}}>add guests</Text>
       </IonIcon>
           </TouchableOpacity>
            <PhotoGallery
              photosCallback={() =>
                getPhotosByItineraryItem(selectedEvent.id, item.id)
              }
            />
          </View>
        )}
      />
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
    padding: 40,
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
    justifyContent: 'space-around',
  },
  buttons: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: 'center',
    padding: 20,
  },
});
