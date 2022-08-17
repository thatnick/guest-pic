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
    <View style={styles.card}>
      <View style={styles.alignLeft}>

      <Image
        style={styles.image}

        source={{ uri: user.avatarUrl }}
        />
      <Text style={styles.textFont}>{user.name}</Text>
      <TouchableOpacity style={styles.back}>
<IonIcon
          style={{paddingLeft:12}}
          name={"exit-outline"}
          size={35}
          color="white"
          onPress={() => {
            setUser({user:"",password:""})
            resetStack(navigation, "LoginForm")
          }
        }

>

</IonIcon>
        <Text style={{color:'white', fontFamily:'Rockwell',}}>Log out</Text>
        
      </TouchableOpacity>
        </View>
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
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 10,
    marginBottom: 10,
  },
  alignLeft: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "96%",
    padding: 5,
    backgroundColor: "dodgerblue",
    borderRadius: 15,
    margin: 5,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "darkslategray",
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: "#0000",
  },
  switch: {
    backgroundColor:'royalblue',
    borderRadius:15
  },
  textFont: {
    fontFamily:'Rockwell',
    fontSize:20,
    color:'white',
  }
});
