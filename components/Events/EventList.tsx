import { Text, FlatList, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getEvents } from "../../firebase/db";
import ListItem from "./ListItem";
import { UserContext } from "../../contexts/UserContext";

export default function EventList() {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((events) => setEvents(events));
  }, []);

  return (
    <View style={{ height: "85%" }}>
      <FlatList
        data={events}
        // keyExtractor={(e) => e.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            data={item}
            title={item.data.title}
            // subTitle={item.description}
            image={item.data.banner}
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
