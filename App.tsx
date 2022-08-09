import tw from "twrnc";
import { StatusBar } from "expo-status-bar";
import { View, Text, SafeAreaView } from "react-native";
import Login from "./components/Login/Login";
import { UserContext } from "./contexts/UserContext";
import { useState } from "react";
import SignUp from "./components/Login/SignUp";

export default function App() {
  const [user, setUser] = useState({});
  console.log(user, '<<< User');
  
  return (
    <UserContext.Provider value={{setUser}}>
      <SafeAreaView>
        <View style={tw`pt-6 bg-green-100`}>
          <Login />
          <SignUp />

          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    </UserContext.Provider>
  );
}
