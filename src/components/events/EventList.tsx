import { FlatList, View, Text, Pressable, StatusBar } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getEvents,
  getEventsByGuestEmail,
  getInProgressEventsByGuest,
  getInProgressItemsByEvents,
} from "../../firebase/db";
import EventCard from "./EventCard";
import UserHeader from "../user/UserHeader";
import { useFocusEffect } from "@react-navigation/native";
import { InProgressEventsContext, UserContext } from "../../contexts";
import { pageStyle } from "../../styles/EventList";

export default function EventList() {
  const navigation = useNavigation();
  const [events, setEvents] = useState<Event[]>([]);
  const { setInProgressEvents, setInProgressItems, dateTime } = useContext(
    InProgressEventsContext
  );
  const { user } = useContext(UserContext);

  useFocusEffect(
    useCallback(() => {
      getEventsByGuestEmail(user.email).then((events) => {
        setEvents(events);
      });
    }, [])
  );

  useEffect(() => {
    getInProgressEventsByGuest(user.email, dateTime)
      .then((events) => {
        setInProgressEvents(events);
        return events;
      })
      .then((events) => getInProgressItemsByEvents(events, dateTime))
      .then((items) => setInProgressItems(items));
  }, [dateTime]);

  return (
    <SafeAreaView style={pageStyle.container}>
      <StatusBar barStyle={"dark-content"} />
      <UserHeader />
      <Pressable
        style={pageStyle.button}
        onPress={() => navigation.navigate("CreateEventForm")}
      >
        <Text style={pageStyle.buttonText}>+ Event</Text>
      </Pressable>

      <View style={pageStyle.events}>
        <FlatList
          data={events}
          renderItem={({ item }) => <EventCard event={item} />}
        />
      </View>
    </SafeAreaView>
  );
}
