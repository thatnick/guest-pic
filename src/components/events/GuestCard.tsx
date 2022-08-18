import { Image,  Text, View } from "react-native";
import React, {  useContext,  useState } from "react";
import { Switch } from "react-native-gesture-handler";
import {  UserContext } from "../../contexts";
import { updateGuestAttending } from "../../firebase/db";
import { styles } from "../../styles/guestList";

const GuestCard = ({ item, guests }) => {
  console.log(guests, "<<<<");
  console.log(item, "<<<<userrr");

  function attendingHandler() {
    for (let i in guests) {
      if (guests[i].email === item.email) {
        {
          console.log(guests[i]["attending"], "hellllllooooo");
          return guests[i].attending;
        }
      }
    }
  }

  const [isAttending, setIsAttending] = useState<"true" | "false">(
    attendingHandler
  );
  const { user } = useContext(UserContext);

  const attendingSwitch = () => {
    for (let i in guests) {
      if (guests[i].email === item.email) {
        updateGuestAttending(guests[i].id, !guests[i].attending);
        setIsAttending(!isAttending);
      }
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.alignLeft}>
        <Image
          style={styles.image}
          source={{
            uri: item.avatarUrl,
          }}
        />
        <Text style={styles.textFont}>{item.name}</Text>
        <Switch
          style={styles.switch}
          value={isAttending}
          onValueChange={attendingSwitch}
          disabled={user.email !== item.email || item.isHost === true}
        />
      </View>
    </View>
  );
};

export default GuestCard;

