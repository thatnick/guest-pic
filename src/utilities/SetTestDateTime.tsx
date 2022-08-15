import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import DatePicker from "react-native-datepicker";
import { FlatList } from "react-native-gesture-handler";
import { InProgressEventContext } from "../contexts";
import { getEvents, getItineraryItemsByEvent } from "../firebase/db";
import { ItineraryItem } from "./types";

export default function SetTestDateTime() {
  const navigation = useNavigation();
  const { dateTime, setDateTime } = useContext(InProgressEventContext);
  const [pickerDateTime] = useState(dateTime);
  const [items, setItems] = useState<ItineraryItem[]>([]);

  useEffect(() => {
    getEvents().then((events) => {
      events.forEach((event) => {
        getItineraryItemsByEvent(event.id).then((items) => setItems(items));
      });
    });
  }, []);

  return (
    <View>
      <Text>Set app date/time for testing:</Text>
      <DatePicker
        style={{ width: 200 }}
        date={pickerDateTime}
        mode="datetime"
        is24Hour="true"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: "absolute",
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 30,
          },
        }}
        onDateChange={(confirmDateTime) => {
          setDateTime(confirmDateTime);
        }}
      />
      <Button
        title="Save"
        onPress={() => {
          // TODO: Save the date time here
          navigation.goBack();
        }}
      ></Button>
      <View style={{ height: "85%" }}>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <View>
              <Text style={{ fontStyle: "italic" }}>
                {item.title}{" "}
                {item.time.constructor.name === "Timestamp"
                  ? item.time.toDate().toDateString()
                  : "Error: Time is not a timestamp"}
              </Text>
              <Text>{item.description}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
