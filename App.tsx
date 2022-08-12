import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UserContext } from "./contexts/UserContext";
import CameraScreen from "./components/CameraScreen";
import HomeScreen from "./components/HomeScreen";
import Login from "./components/login/Login";
import EventCard from "./components/events/EventCard";
import { LoggedInContext } from "./contexts/LoginContext";

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState({});
  const [login, setLogin] = useState(false);

  return (
    <NavigationContainer>
      <UserContext.Provider value={{ user, setUser }}>
        <LoggedInContext.Provider value={{ login, setLogin }}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="EventCard" component={EventCard} />
          </Stack.Navigator>
        </LoggedInContext.Provider>
      </UserContext.Provider>
    </NavigationContainer>
  );
};

export default App;
