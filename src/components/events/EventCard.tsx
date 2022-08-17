import React, { useContext } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SelectedEventContext } from "../../contexts";

interface Props {
  event: Event;
}
export default function EventCard({ event }: Props) {
  const navigation = useNavigation();
  const { setSelectedEvent } = useContext(SelectedEventContext);

  return (
    <TouchableHighlight
      underlayColor="red"
      onPress={() => {
        setSelectedEvent(event);
        navigation.navigate("EventDetails");
      }}
    >
      <View style={[styles.container, styles.shadowProp]}>
        <ImageBackground
          style={styles.image}
          source={{
            uri: event.bannerUrl,
          }}
        />
        <Text style={styles.title}> {event.title}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 15,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
  },
  title: {
    fontWeight: "500",
    backgroundColor: "dodgerblue",
    overflow: "hidden",
    borderRadius: 8,
    width: "50%",
    textAlign: "center",
    fontFamily:'Rockwell',
    color:'white',
    height:20,
  },
  shadowProp: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "darkslategray",
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: "#0000",
  },
});
