import { Image, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Switch } from "react-native-gesture-handler";
import { UserContext } from "../../contexts";
import { updateGuestAttending } from "../../firebase/db";
import { styles } from "../../styles/guestList";
import { Guest, User } from "../../utilities/types";

interface Props {
  guestUser: User;
  guests: Guest[];
}

const GuestCard = ({ guestUser, guests }: Props) => {
  const [isAttending, setIsAttending] = useState<boolean>();
  const { user } = useContext(UserContext);

  const attendingSwitch = () => {
    for (const guest in guests) {
      if (guests[guest].email === guestUser.email) {
        updateGuestAttending(guests[guest].id, !guests[guest].attending);
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
            uri: guestUser.avatarUrl,
          }}
        />
        <Text style={styles.textFont}>{guestUser.name}</Text>
        <Switch
          style={styles.switch}
          value={isAttending}
          onValueChange={attendingSwitch}
          disabled={user.email !== guestUser.email || guestUser.isHost === true}
        />
      </View>
    </View>
  );
};

export default GuestCard;
