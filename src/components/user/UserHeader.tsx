import { Image, Text, View } from "react-native";
import React from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts";
import tw from "twrnc";

export default function UserHeader() {
  const { user } = useContext(UserContext);
  return (
    <View>
      <View>
        <Image
          style={tw`w-15 h-15 rounded-full shadow-2xl`}
          source={{ uri: user.avatarUrl }}
        />
        <Text>{user.name}</Text>
      </View>
    </View>
  );
}
