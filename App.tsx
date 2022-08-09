import tw from "twrnc";
import { StatusBar } from "expo-status-bar";
import { View, Text, SafeAreaView } from "react-native";
import Login from "./components/Login";
import { UserContext } from "./contexts/UserContext";
import { useState } from "react";

export default function App() {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{}}>
      <SafeAreaView>
        <View style={tw`pt-6 bg-green-100`}>
          <Login />

          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    </UserContext.Provider>
  );
}
