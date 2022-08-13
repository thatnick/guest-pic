import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UserContext } from "./components/contexts/UserContext";
import CameraScreen from "./components/camera/CameraScreen";
import EventScreen from "./components/events/EventScreen";
import LoginForm from "./components/user/LoginForm";
import EventCard from "./components/events/EventCard";
import { LoggedInContext } from "./components/contexts/LoginContext";

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState({});
  const [login, setLogin] = useState(false);

  return (
    <NavigationContainer>
      <UserContext.Provider value={{ user, setUser }}>
        <LoggedInContext.Provider value={{ login, setLogin }}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Home" component={EventScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="Login" component={LoginForm} />
            <Stack.Screen name="EventCard" component={EventCard} />
          </Stack.Navigator>
        </LoggedInContext.Provider>
      </UserContext.Provider>
    </NavigationContainer>
  );
};

export default App;
