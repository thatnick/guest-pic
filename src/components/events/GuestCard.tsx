import { Image, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Switch } from "react-native-gesture-handler";
import { UserContext } from "../../contexts";
import { updateGuestAttending } from "../../firebase/db";
import { guestListStyles } from "../../styles/guestListStyles";
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
    <View style={guestListStyles.card}>
      <View style={guestListStyles.alignLeft}>
        <Image
          style={guestListStyles.image}
          source={{
            uri: guestUser.avatarUrl,
          }}
        />
        <Text style={guestListStyles.textFont}>{guestUser.name}</Text>
        <Switch
          style={guestListStyles.switch}
          value={isAttending}
          onValueChange={attendingSwitch}
          disabled={user.email !== guestUser.email || guestUser.isHost === true}
        />
      </View>
    </View>
  );
};

export default GuestCard;
