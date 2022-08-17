import { Image, Pressable, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useContext } from "react";
import { UserContext, InProgressEventsContext } from "../../contexts";
import { useNavigation } from "@react-navigation/native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { resetStack } from "./ResetStack";
import { userHeaderStyle } from "../../styles/userHeader";

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
    <View style={userHeaderStyle.container}>
      <View style={userHeaderStyle.avatarAndText}>
        <Image
          style={userHeaderStyle.avatar}
          source={{ uri: user.avatarUrl }}
        />
        <View style={userHeaderStyle.text}>
          <Pressable onLongPress={() => navigation.navigate("SetTestDateTime")}>
            <Text style={userHeaderStyle.event}>{eventNow}</Text>
            <Text style={userHeaderStyle.item}>{itemNow}</Text>
          </Pressable>
        </View>
      </View>
      <Pressable
        style={userHeaderStyle.logOutButton}
        onPress={() => {
          resetStack(navigation, "LoginForm");
        }}
      >
        <Text style={userHeaderStyle.buttonText}>Log out</Text>
      </Pressable>
    </View>
  );
}
