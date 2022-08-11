import React from "react";
import { SafeAreaView, View, Button } from "react-native";
import { useState } from "react";
import tw from "twrnc";
import { UserContext } from "./contexts/UserContext";

import Login from "./components/Login/Login";
import SignUp from "./components/Login/SignUp";
import UserCard from "./components/User/UserCard";
import CreateEvent from "./components/Events/CreateEvent";
import EventList from "./components/Events/EventList";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [addEventForm, setAddEventForm] = useState(false);
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {/* <CameraFunc /> */}
      <SafeAreaView>
        <View style={tw`pt-6 bg-green-100`}>
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
      </SafeAreaView>
    </UserContext.Provider>
  );
};

export default App;
