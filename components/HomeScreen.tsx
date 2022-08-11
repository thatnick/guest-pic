import React, { useState } from "react";
import { View, Button, TouchableOpacity, StyleSheet } from "react-native";
import Login from "./Login/Login";
import SignUp from "./Login/SignUp";
import UserCard from "./User/UserCard";
import Icon from 'react-native-vector-icons/FontAwesome'


export default function HomeScreen({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <View>
      {isLoggedIn ? (
        <View>
          {/* <Button
            title="Open Camera"
            onPress={() => navigation.navigate("Camera")}
          /> */}
          <UserCard />
           <TouchableOpacity
   style={styles.content}
  >
   <Icon name={"camera"}  size={50} color="blue" onPress={() => navigation.navigate("Camera")}/>
 </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Login setIsLoggedIn={setIsLoggedIn} />
          <SignUp setIsLoggedIn={setIsLoggedIn} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content:{
},
});
