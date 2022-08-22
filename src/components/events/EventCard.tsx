import React, { useContext } from "react";
import { ImageBackground, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SelectedEventContext } from "../../contexts";
import { cardStyle } from "../../styles/EventList";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Event } from "../../utilities/types";

interface Props {
  event: Event;
}
export default function EventCard({ event }: Props) {
  const navigation = useNavigation();
  const { setSelectedEvent } = useContext(SelectedEventContext);

  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedEvent(event);
        navigation.navigate("EventDetails");
      }}
    >
      <View style={cardStyle.container}>
        <ImageBackground
          style={cardStyle.image}
          source={{
            uri: event.bannerUrl,
          }}
        />
        <View style={cardStyle.infoContainer}>
          <View>
            <Text style={cardStyle.title}> {event.title}</Text>
            <Text style={cardStyle.description}>
              {event.date.toString().slice(0, 15)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
