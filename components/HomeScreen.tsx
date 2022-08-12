import React, { useState } from "react";
import { View, Button } from "react-native";

import Login from "./login/Login";
import SignUp from "./login/SignUp";
import UserCard from "./user/UserCard";
import CreateEvent from "./events/CreateEvent";
import EventList from "./events/EventList";

export default function HomeScreen() {
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
