import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { SelectedEventContext } from "../../contexts";
import { getGuests, getGuestUsersByEventId } from "../../firebase/db";
import AddGuestForm from "./AddGuestForm";


export default function GuestList() {
  const { selectedEvent } = useContext(SelectedEventContext);
  const [guests, setGuests] = useState([]);
  const navigation = useNavigation();

  
  console.log(selectedEvent.id)

useEffect(()=>{
  getGuestUsersByEventId(selectedEvent.id).then((data)=>{
    setGuests(data)
  })
},[selectedEvent])

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
      
<FlatList
data={guests}
renderItem={({ item }) => <Text>{item.email}</Text>}/>

<TouchableOpacity style={styles.buttons}>
   
   <IonIcon  name={"person-add-outline"} size={35} color="blue" onPress={() => {}}>
   <Text style={{ fontFamily: "Arial", fontSize: 15}} onPress={()=>{navigation.navigate("AddGuestForm")}}>add guest</Text>
 </IonIcon>
     </TouchableOpacity>

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