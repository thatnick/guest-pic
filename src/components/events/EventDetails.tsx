import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { EventContext } from "../../contexts";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function EventDetails() {
  const navigation = useNavigation();
  const { event } = useContext(EventContext);

  return (
    <View>
      <Button title="Close" onPress={() => navigation.goBack()}></Button>
      <Image
        style={styles.image}
        source={{
          uri: event.bannerUrl,
        }}
      />
      <Text>{event.title}</Text>
      <TouchableOpacity
      //  style={styles.content}
      >
        <Icon
          name={"camera"}
          size={50}
          color="blue"
          onPress={() => {
            navigation.navigate("EventCamera");
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
  },
});
