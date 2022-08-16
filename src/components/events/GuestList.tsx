import React, { useContext } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { SelectedEventContext } from "../../contexts";
import AddGuestForm from "./AddGuestForm";

export default function GuestList() {
  const { selectedEvent } = useContext(SelectedEventContext);

  return (
    <View style={styles.content}>
       <TouchableOpacity style={styles.buttons}>
     

        <IonIcon
          name={"ios-arrow-undo-outline"}
          size={35}
          color="blue"
          onPress={() => navigation.goBack()}
          />
      

      </TouchableOpacity>
      
<FlatList>
  
</FlatList>
   
    </View>
  );
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  
  buttons: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: 'center',
    padding: 20,
  },
});