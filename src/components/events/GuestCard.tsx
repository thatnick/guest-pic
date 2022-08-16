import { Image, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Switch } from "react-native-gesture-handler";
import { getGuestsByEventId } from "../../firebase/db";
import { SelectedEventContext, UserContext } from "../../contexts";



const GuestCard = ({ item }) => {
  // console.log(item);
  const [isAttending, setIsAttending] = useState<"true" | "false">(false);
  const { selectedEvent } = useContext(SelectedEventContext);
  const { user, setUser } = useContext(UserContext);
  
  console.log(getGuestsByEventId(selectedEvent))
  // getGuestsByEventId

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
        <Switch value={isAttending} onValueChange={attendingSwitch} disabled={user.email !== item.email || item.isHost === true}/>
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
