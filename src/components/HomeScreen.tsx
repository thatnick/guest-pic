import React, { useState } from "react";
import { View, Button } from "react-native";
import Login from "./Login/Login";
import SignUp from "./Login/SignUp";
import UserCard from "./User/UserCard";

export default function HomeScreen({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <View>
      {isLoggedIn ? (
        <View>
          <Button
            title="Open Camera"
            onPress={() => navigation.navigate("Camera")}
          />
          <UserCard />
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
