import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SelectedEventContext } from "../../contexts";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import PhotoGallery from "../gallery/PhotoGallery";
import {
  getItineraryItemsByEvent,
  getPhotosByItineraryItem,
} from "../../firebase/db";
import { ItineraryItem, Photo } from "../../utilities/types";
import { FlatList } from "react-native-gesture-handler";

export default function EventDetails() {
  const navigation = useNavigation();
  const { selectedEvent } = useContext(SelectedEventContext);
  const [items, setItems] = useState<ItineraryItem[]>();

  useEffect(() => {
    getItineraryItemsByEvent(selectedEvent.id).then((items) => {
      setItems(items);
    });
  }, []);

  return (
    <View style={{ height: "100%" }}>
      <Button title="Close" onPress={() => navigation.goBack()}></Button>

      <Image
        style={styles.image}
        source={{
          uri: selectedEvent.bannerUrl,
        }}
      />
      <Text>{selectedEvent.title}</Text>

      <TouchableOpacity>
        <Icon
          name={"camera"}
          size={50}
          color="blue"
          onPress={() => {
            navigation.navigate("EventCamera");
          }}
        />
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
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
  },
});
