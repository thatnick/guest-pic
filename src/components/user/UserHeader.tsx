import { Image, Pressable, Text, View } from "react-native";
import React from "react";
import { useContext } from "react";
import { UserContext, InProgressEventsContext } from "../../contexts";
import { useNavigation } from "@react-navigation/native";
import { resetStack } from "./ResetStack";
import { userHeaderStyles } from "../../styles/userHeaderStyles";

export default function UserHeader() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const { inProgressEvents, inProgressItems } = useContext(
    InProgressEventsContext
  );

  const eventNow = `${
    inProgressEvents[0] ? inProgressEvents[0].title : "No events"
  }`;

  const itemNow = `${
    inProgressItems[0]
      ? `${inProgressItems[0].startTime.toTimeString().slice(0, 5)} ${
          inProgressItems[0].title
        }`
      : ""
  }`;

  return (
    <View style={userHeaderStyles.container}>
      <View style={userHeaderStyles.avatarAndText}>
        <Image
          style={userHeaderStyles.avatar}
          source={{ uri: user.avatarUrl }}
        />
        <View>
          <Pressable onLongPress={() => navigation.navigate("SetTestDateTime")}>
            <Text style={userHeaderStyles.event}>{eventNow}</Text>
            <Text style={userHeaderStyles.item}>{itemNow}</Text>
          </Pressable>
        </View>
      </View>
      <Pressable
        style={userHeaderStyles.logOutButton}
        onPress={() => {
          resetStack(navigation, "LoginForm");
        }}
      >
        <Text style={userHeaderStyles.buttonText}>Log out</Text>
      </Pressable>
    </View>
  );
}
