import { FlatList, View, Button } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getEvents, getInProgressEventsByGuest } from "../../firebase/db";
import EventCard from "./EventCard";
import UserHeader from "../user/UserHeader";
import { useFocusEffect } from "@react-navigation/native";
import { InProgressEventsContext, UserContext } from "../../contexts";

export default function EventList() {
  const navigation = useNavigation();
  const [events, setEvents] = useState<Event[]>([]);
  const { inProgressEvents, setInProgressEvents, dateTime } = useContext(
    InProgressEventsContext
  );
  const { user } = useContext(UserContext);

  useFocusEffect(
    // TODO: get events by user (not all events)
    useCallback(() => {
      getEvents().then((events) => {
        setEvents(events);
      });
    }, [])
  );

  useEffect(() => {
    console.log(dateTime);
    getInProgressEventsByGuest(user.email, dateTime).then((events) => {
      setInProgressEvents(events);
      if (!inProgressEvents) return;
      inProgressEvents.forEach((event) =>
        console.log("IN PROGRESS EVENT:", event)
      );
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
