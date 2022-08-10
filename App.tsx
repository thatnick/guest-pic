import tw from "twrnc";
import { StatusBar } from "expo-status-bar";
import { View, Text, SafeAreaView } from "react-native";
import Login from "./components/Login/Login";
import { UserContext } from "./contexts/UserContext";
import { useState } from "react";
import SignUp from "./components/Login/SignUp";
import UserCard from "./components/User/UserCard";
import EventList from "./components/Events/EventList";

export default function App() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // console.log(user, "<<< User");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <SafeAreaView>
        <View style={tw`pt-6 bg-green-100`}>
          {isLoggedIn ? (
            <UserCard />
          ) : (
            <View>
              <Login setIsLoggedIn={setIsLoggedIn} />
              <SignUp setIsLoggedIn={setIsLoggedIn} />
              <EventList />
            </View>
          )}

          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    </UserContext.Provider>
  );
}
