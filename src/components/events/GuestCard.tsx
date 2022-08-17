import { Image, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Switch } from "react-native-gesture-handler";
import { SelectedEventContext, UserContext } from "../../contexts";
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
      // return false;
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
        {/* </View>
      <View style={styles.switch}> */}
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

// const styles = StyleSheet.create({
//   image: {
//     width: 60,
//     height: 60,
//     borderRadius: 50,
//     marginRight: 10,
//     marginBottom: 10,
//   },
//   alignLeft: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: "96%",
//     padding: 5,
//     backgroundColor: "dodgerblue",
//     borderRadius: 15,
//     margin: 5,
//   },
//   card: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     shadowOffset: { width: 10, height: 10 },
//     shadowColor: "darkslategray",
//     shadowOpacity: 1,
//     elevation: 3,
//     backgroundColor: "#0000",
//   },
//   switch: {
//     backgroundColor:'royalblue',
//     borderRadius:15
//   },
//   textFont: {
//     fontFamily:'Rockwell',
//     fontSize:20,
//     color:'white',
//   }
// });
