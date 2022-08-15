import { Image, StyleSheet, Text, View, List } from "react-native";
import React from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import tw from "twrnc";
import ListItem from "../Events/ListItem";
import EventList from "../Events/EventList";

export default function UserCard() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <View>
      <View>
      <Image style={tw`w-15 h-15 rounded-full shadow-2xl`} source={{ uri: user.avatar }} />
      <Text>Hello {user.name}</Text>
      </View>
      <EventList />
    </View>
  );
}