import { Image, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Switch } from "react-native-gesture-handler";
import { getGuestsByEventId } from "../../firebase/db";
import { SelectedEventContext, UserContext } from "../../contexts";



const GuestCard = ({ item }) => {
  // console.log(item);
  const [isAttending, setIsAttending] = useState<"true" | "false">(false);
  const { selectedEvent } = useContext(SelectedEventContext);
  const { user, setUser } = useContext(UserContext);
  
  getGuestsByEventId(selectedEvent.id).then((data)=>{console.log(data)})

  const attendingSwitch = useCallback(() => {
      setIsAttending(()=>{
        getGuestsByEventId(selectedEvent.id).then((data)=>{
         setIsAttending(data[0].attending) 
        })

      })
    }, []);
    

  return (
    <View style={styles.card}>
      <View style={styles.alignLeft}>
        <Image
          style={styles.image}
          source={{
            uri: item.avatarUrl,
          }}
        />
        <Text>{item.name}</Text>
      {/* </View>
      <View style={styles.switch}> */}
        <Switch value={isAttending} onValueChange={attendingSwitch} disabled={user.email === item.email || item.isHost === true}/>
      </View>
    </View>
  );
};

export default GuestCard;

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 10,
    marginBottom: 10,
  },
  alignLeft: {
    display: "flex",
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:'96%',
    padding:5,
    backgroundColor:'dodgerblue',
    borderRadius: 15,
    margin:5,
    
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
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
