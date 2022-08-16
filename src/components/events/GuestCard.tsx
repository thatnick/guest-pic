import { Image, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Switch } from "react-native-gesture-handler";
import { attendingUserEvent } from "../../firebase/db";
import { SelectedEventContext } from "../../contexts";

export const getGuestsByEventId = async (eventId: string) => {
  console.log("getGuestsByEventId");

  const guests: Guest[] = [];
  const guestsRef = collection(db, "guests");
  const q = query(guestsRef, where("eventId", "==", eventId));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const guestData = doc.data();
    guests.push({
      id: doc.id,
      email: guestData.email,
      eventId: guestData.eventId,
      isHost: guestData.isHost,
      attending: guestData.attending,
    });
  });
  return guests;
};

const GuestCard = ({ item }) => {
  // console.log(item);
  const [isAttending, setIsAttending] = useState<"true" | "false">(false);
  const { selectedEvent } = useContext(SelectedEventContext);

  const attendingSwitch = useCallback(() => {
      setIsAttending((position) => {attendingUserEvent})
    }, []);
    

  return (
    <View style={styles.card}>
      <View style={styles.alignLeft}>
        <Image
          style={styles.image}
          source={{
            uri: item.avatarUrl,
          }}
        />
        <Text>{item.name}</Text>
      </View>
      <View style={styles.switch}>
        <Switch value={isAttending} onValueChange={attendingSwitch} />
      </View>
    </View>
  );
};

export default GuestCard;

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 10,
    marginBottom: 10,
  },
  alignLeft: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  switch: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
