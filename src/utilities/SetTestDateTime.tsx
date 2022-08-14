import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, Text, View } from "react-native";

export default function SetTestDateTime() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Date/time picker here to time travel</Text>
      <Button
        title="Save"
        onPress={() => {
          // TODO: Save the date time here
          navigation.goBack();
        }}
      ></Button>
      <Text>List of events dates and itinerary times here</Text>
    </View>
  );
}
