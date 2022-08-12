import { SafeAreaView, View, Button } from "react-native";
import tw from "twrnc";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UserContext } from "./contexts/UserContext";
import CameraScreen from "./components/CameraScreen";
import HomeScreen from "./components/HomeScreen";
import Login from "./components/Login/Login";
import { LoginContext } from "./contexts/LoginContext";


const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState({});
  const [login, setLogin] = useState(false)

  return (
    <NavigationContainer>
      <UserContext.Provider value={{ user, setUser }}>
        <LoginContext.Provider value={{login, setLogin}}>

        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Login" component={Login} />

        </Stack.Navigator>
        </LoginContext.Provider>
      </UserContext.Provider>
    </NavigationContainer>
  );
};

export default App;
