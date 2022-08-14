import { FlatList, View, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getEvents } from "../../firebase/db";
import EventCard from "./EventCard";
import UserHeader from "../user/UserHeader";

export default function EventList() {
  const navigation = useNavigation();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getEvents().then((events) => {
      setEvents(events);
    });
  }, []);

  return (
    <SafeAreaView>
      <UserHeader />
      <Button
        title="Create Event"
        onPress={() => navigation.navigate("CreateEventForm")}
      ></Button>
      <View style={{ height: "85%" }}>
        <FlatList
          data={events}
          renderItem={({ item }) => <EventCard event={item} />}
        />
      </View>
    </SafeAreaView>
  );
}
