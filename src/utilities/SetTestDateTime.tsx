import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { InProgressEventsContext } from "../contexts";
import { getEvents, getItineraryItemsByEvent } from "../firebase/db";
import {
  deleteAllDocsInDb,
  seedDb,
  seedUserAccounts,
} from "../firebase/testdata";
import { Event, ItineraryItem } from "../utilities/types";

export default function SetTestDateTime() {
  const navigation = useNavigation();
  const { setDateTime } = useContext(InProgressEventsContext);
  const [eventItems, setEventItems] = useState<
    [{ event: Event; items: ItineraryItem[] }]
  >([]);

  useEffect(() => {
    getEvents().then((events) => {
      events.forEach((event) => {
        getItineraryItemsByEvent(event.id).then((items) => {
          setEventItems((prev) => [...prev, { event, items }]);
        });
      });
    });
  }, []);

  const handleItemPress = (startTime: Date) => {
    setDateTime(startTime);
    navigation.goBack();
  };

  return (
    <View>
      <Text>Set app date/time for testing:</Text>
      <View style={{ height: "85%" }}>
        <FlatList
          data={eventItems}
          renderItem={({ item }) => (
            <View>
              <Text>Event: {item.event.title}</Text>
              <FlatList
                data={item.items}
                renderItem={({ item }) => (
                  <View>
                    <Button
                      onPress={() => handleItemPress(item.startTime)}
                      title={`- ${item.title} ${item.startTime.toTimeString()}`}
                    ></Button>
                  </View>
                )}
              />
            </View>
          )}
        />
        <Button
          title="Seed user accounts"
          onPress={() => seedUserAccounts()}
        ></Button>
        <Button title="Seed the database" onPress={() => seedDb()}></Button>
        <Button
          color="red"
          title="Delete all docs in the database"
          onPress={() => deleteAllDocsInDb()}
        ></Button>
      </View>
    </View>
  );
}
