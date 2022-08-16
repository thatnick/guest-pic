import {
  Image,
  Pressable,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { useContext } from "react";
import { UserContext, InProgressEventsContext } from "../../contexts";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { resetStack } from "./ResetStack";

export default function UserHeader() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const { inProgressEvents } = useContext(InProgressEventsContext);

  return (
    <View>
      <Image
        style={tw`w-15 h-15 rounded-full shadow-2xl`}
        source={{ uri: user.avatarUrl }}
      />
      <Text>{user.name}</Text>
      <TouchableOpacity style={styles.back}>
        <IonIcon
          name={"exit-outline"}
          size={35}
          color="blue"
          onPress={() => {
            resetStack(navigation, "LoginForm");
          }}
        />
        <Text>Log out</Text>
      </TouchableOpacity>
      <Pressable onLongPress={() => navigation.navigate("SetTestDateTime")}>
        <Text>
          {inProgressEvents[0]
            ? `Happening now: ${inProgressEvents[0].title}`
            : "Nothing"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  camContainer: { width: "100%", height: "100%" },
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 40,
  },
  buttons: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-end",
    padding: 10,
    marginTop: 50,
  },
});
