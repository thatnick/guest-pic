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
import { useNavigation } from "@react-navigation/native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { resetStack } from "./ResetStack";

export default function UserHeader() {
  console.log("USER HEADER");
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);
  const { inProgressEvents, inProgressItems } = useContext(
    InProgressEventsContext
  );

  return (
    <View>
      <Image
        style={{ width: 55, height: 55, borderRadius: 55 }}
        source={{ uri: user.avatarUrl }}
      />
      <Text>{user.name}</Text>
      <TouchableOpacity style={styles.back}>
        <IonIcon
          name={"exit-outline"}
          size={35}
          color="blue"
          onPress={() => {
            setUser({ user: "", password: "" });
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
