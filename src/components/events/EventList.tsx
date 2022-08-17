import { FlatList, View, Button } from "react-native";
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

export default function EventList() {
  const navigation = useNavigation();
  const [events, setEvents] = useState<Event[]>([]);
  const {
    inProgressEvents,
    setInProgressEvents,
    inProgressItems,
    setInProgressItems,
    dateTime,
  } = useContext(InProgressEventsContext);
  const { user } = useContext(UserContext);

  useFocusEffect(
    useCallback(() => {
      getEventsByGuestEmail(user.email).then((events) => {
        setEvents(events);
      });
    }, [])
  );

  useEffect(() => {
    console.log(dateTime);
    getInProgressEventsByGuest(user.email, dateTime).then((events) => {
      setInProgressEvents(events);
      if (!inProgressEvents) return;
      inProgressEvents.forEach((event) => {
        console.log("EVENT IN PROGRESS: ", event.title);
      });

      getInProgressItemsByEvents(inProgressEvents, dateTime).then((items) => {
        setInProgressItems(items);
        if (!inProgressItems) return;
        inProgressItems.forEach((item) => {
          console.log("ITEM IN PROGRESS: ", item.title);
        });
      });
    });
  }, [dateTime]);

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
