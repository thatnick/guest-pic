import { Image, Pressable, Text, View } from "react-native";
import React from "react";
import { useContext } from "react";
import { UserContext, InProgressEventContext } from "../../contexts";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

export default function UserHeader() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const { inProgressEvent, inProgressItem } = useContext(
    InProgressEventContext
  );

  return (
    <View>
      <Image
        style={tw`w-15 h-15 rounded-full shadow-2xl`}
        source={{ uri: user.avatarUrl }}
      />
      <Text>{user.name}</Text>
      <Pressable onLongPress={() => navigation.navigate("SetTestDateTime")}>
        <Text>Up next: IN PROGRESS EVENT TITLE HERE</Text>
      </Pressable>
    </View>
  );
}
