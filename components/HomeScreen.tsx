import React, { useState } from "react";
import { View, Button, TouchableOpacity, StyleSheet } from "react-native";

import Login from "./Login/Login";
import SignUp from "./Login/SignUp";
import UserCard from "./User/UserCard";
import CreateEvent from "./Events/CreateEvent";
import EventList from "./Events/EventList";

export default function HomeScreen({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [addEventForm, setAddEventForm] = useState(false);

  return (
    <View>
      {isLoggedIn ? (
        <View>
          <UserCard />

          {addEventForm ? (
            <CreateEvent setAddEventForm={setAddEventForm} />
          ) : (
            <View>
              <EventList />
              <Button
                title="CreateEvent"
                onPress={() => setAddEventForm(true)}
              ></Button>
            </View>
          )}
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

// const styles = StyleSheet.create({
//   content:{
// },
// });
