import React, { useState } from "react";
import { View, Button } from "react-native";

import LoginForm from "../user/LoginForm";
import SignUpForm from "../user/SignUpForm";
import UserHeader from "../user/UserHeader";
import CreateEvent from "./CreateEventForm";
import EventList from "./EventList";

export default function EventScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [addEventForm, setAddEventForm] = useState(false);

  return (
    <View>
      {isLoggedIn ? (
        <View>
          <UserHeader />

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
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
          <SignUpForm setIsLoggedIn={setIsLoggedIn} />
        </View>
      )}
    </View>
  );
}

// const styles = StyleSheet.create({
//   content:{
// },
// });
