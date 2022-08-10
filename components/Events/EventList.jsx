import { Text, FlatList, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { getEvents } from "../../firebase/db";

export default function EventList() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    getEvents().then((events) => setEvents(events));
  }, []);

  return <Text>HELLO FROM EVENT LIST</Text>;
}
