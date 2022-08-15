import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ShadowPropTypesIOS,
} from "react-native";
import React, { useContext } from "react";
import { EventContext } from "../../contexts";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import IonIcon from 'react-native-vector-icons/Ionicons';


export default function EventDetails() {
  const navigation = useNavigation();
  const { event } = useContext(EventContext);

  return (
    <View style={styles.content}>
      {/* <Button title="Close" onPress={() => navigation.goBack()}></Button> */}
      
      <TouchableOpacity style={styles.back} >
        <IonIcon name={"ios-arrow-undo-outline"} size={35} color="blue" onPress={() => navigation.goBack()} />
      </TouchableOpacity>

 <Image
        style={styles.image}
        source={{
          uri: event.bannerUrl,
        }}
      />
      <Text>{event.title}</Text>
      <TouchableOpacity
       style={styles.camera}
      >
        <IonIcon
          name={"camera-outline"}
          size={80}
          color="blue"
          onPress={() => {
            navigation.navigate("EventCamera");
          }}
        />
        <Text> Take a Pic</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex:1,
    flexDirection:'column',
    alignItems:'center'
  },
  image: {
    flex:0.25,
    width: "95%",
    borderRadius: 8,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    padding:40 
  },
  shadowProp: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "grey",
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: "#0000",
  },
  back: {
    padding:20
  }
});
