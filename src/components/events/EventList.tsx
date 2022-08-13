import { FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getEvents } from "../../firebase/db";
import EventCard from "./EventCard";

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((events) => {
      console.log(events, "in event list");

      setEvents(events);
    });
  }, []);

  return (
    <View style={{ height: "85%" }}>
      <FlatList
        data={events}
        // keyExtractor={(e) => e.id.toString()}
        renderItem={({ item }) => (
          <EventCard
            data={item}
            title={item.title}
            // subTitle={item.description}
            image={item.bannerUrl}
            // onPress={() => console.log("message selected", item)}
            // renderRightActions={() => (
            //   <ListItemDeleteActions onPress={() => handleDelete(item)} />
            // )}
          />
        )}
      />
    </View>
  );
}
