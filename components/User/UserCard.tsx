import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import tw from "twrnc";

export default function UserCard() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <View>
      <Image style={tw`w-48 h-48`} source={{ uri: user.avatar }} />
      <Text>{user.name}</Text>
    </View>
  );
}
